import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWxAddress.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartGoods: [],
    isAllChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getAddress()
    const cartGoods = wx.getStorageSync("cart")||[];
    this.editCartGoods(cartGoods)
  },

  //从缓存中获取地址信息
  getAddress() {
    const address = wx.getStorageSync("address");
    this.setData({
      address
    })
  },


  //监听点击添加地址按钮
  async handleAddAddress() {
    try {
      //获取scope.address的值true还是false
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];

      // 判断scope.address是否为false
      if( scopeAddress === false ) {
        // 让用户打开获取地址权限
        await openSetting();
      }
      //scope.address为true或者underfind,获取地址
      const address = await chooseAddress();
      //将地址存入缓存
      wx.setStorageSync("address", address)
      this.onShow()
    } catch (error) {
        console.log(error);
      }
  },

  //监听商品复选框按钮点击事件
  goodsCheckedChange(e) {
    const {goods_id} = e.currentTarget.dataset;
    const {cartGoods} = this.data;
    cartGoods.forEach(item => {
      if(item.goods_id === goods_id) {
        item.checked = !item.checked
      }
    })
    this.editCartGoods(cartGoods)
  },

  //监听全选按钮点击事件
  allCheckedChange() {
    let {isAllChecked} = this.data;
    let {cartGoods} = this.data;
    isAllChecked = !isAllChecked;
    cartGoods.forEach(item => {
      item.checked = isAllChecked
    })
    this.editCartGoods(cartGoods)
  },

  //监听改变商品数量事件
  async compluteNum(e) {
    const { goods_id, opt } = e.currentTarget.dataset;
    const { cartGoods } = this.data;

    const index = cartGoods.findIndex(item => item.goods_id === goods_id)
    if(cartGoods[index].num === 1 && opt === "-1") {
      const res = await showModal("确定删除改商品？")
        if (res.confirm) {
          cartGoods.splice(index, 1)
        } else if (res.cancel) {
          cartGoods[index].num = 1
        }
    }else {
      cartGoods[index].num += (opt-0)
    }
    this.editCartGoods(cartGoods)
  },

  //修改购物车商品数据
  editCartGoods(cartGoods) {
    let isAllChecked = true;
    let totalNum = 0;
    let totalPrice = 0;
    cartGoods.forEach(item => {
      if(item.checked) {
        totalNum += item.num;
        totalPrice += item.num * item.goods_price
      }else {
        isAllChecked = false
      }
    })
    isAllChecked = isAllChecked ? cartGoods.findIndex(item => item.checked) !== -1 :false
    this.setData({
      cartGoods,
      totalNum,
      totalPrice,
      isAllChecked
    })
    wx.setStorageSync("cart",cartGoods)
  },

  //监听点击结算事件
  async handleComplute() {
    if(!this.data.address) {
      await showToast("请您选择收货地址")
      return;
    }
    if(this.data.cartGoods.length === 0) {
      await showToast("请您选择商品")
      return;
    }
    //因为没有企业AppId，传入一个token到缓存
    // const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
    // wx.setStorageSync("token", token);
    wx.navigateTo({
      url: "../pay/pay"
    })
  }
})