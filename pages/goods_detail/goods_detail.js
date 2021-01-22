import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {}
  },

  //全局变量
  goodInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options;
    this.getGoodsDetailData(goods_id);
  },

  //获取商品详情数据
  async getGoodsDetailData(goods_id) {
    const res = await request({url:"/goods/detail",data: goods_id})
    this.goodInfo = res.data.message;
    let goods = {};
    goods["goods_id"] = res.data.message.goods_id;
    goods["pics"] = res.data.message.pics;
    goods["goods_name"] = res.data.message.goods_name;
    goods["goods_price"] = res.data.message.goods_price;
    goods["goods_introduce"] = res.data.message.goods_introduce;
    this.setData({
      goods
    })
  },

  //点击跳转购物车页面
  handleGoCart() {
    wx.switchTab({
      url: '../cart/cart'
    })
  },

  //加入购物车，将数据存入
  handleAddCart() {
    //将数据存入缓存
    let cart = wx.getStorageSync("cart")||[]
    let index = cart.findIndex(item => item.goods_id === this.goodInfo.goods_id)
    if(index === -1) {
      this.goodInfo.num = 1;
      this.goodInfo.checked = true;
      cart.push(this.goodInfo)
    }else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart)
    wx.showToast({title: "添加购物车成功！"})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})