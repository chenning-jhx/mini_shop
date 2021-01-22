import { requestPayment, showToast } from "../../utils/asyncWxAddress.js";
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartGoods: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getAddress()
    const cart = wx.getStorageSync("cart")||[];
    const cartGoods = cart.filter(item => item.checked)
    this.editCartGoods(cartGoods)
  },

  //从缓存中获取地址信息
  getAddress() {
    const address = wx.getStorageSync("address");
    this.setData({
      address
    })
  },

  //修改购物车商品数据
  editCartGoods(cartGoods) {
    let totalNum = 0;
    let totalPrice = 0;
    cartGoods.forEach(item => {
      if(item.checked) {
        totalNum += item.num;
        totalPrice += item.num * item.goods_price
      }
    })
    this.setData({
      cartGoods,
      totalNum,
      totalPrice
    })
  },

  //监听支付点击事件
  async handleOrderPay() {
    try {
      //由于没有企业Appid，直接从缓存取出token
      const token = wx.getStorageSync("token");
      if(!token) {
        wx.navigateTo({
          url: '../auth/auth'
        });
        return;
      }
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      let goods = [];
      const cartGoods = this.data.cartGoods;
      cartGoods.forEach(item => goods.push({
        goods_id: item.goods_id,
        goods_number: item.num,
        goods_price: item.goods_price
      }))
    
      let queryData = {order_price, consignee_addr, goods}
      //发起请求，创建订单
      const res1 = await request({url:'/my/orders/create', data: queryData, method: "POST"})
      const order_number = res1.data.message.order_number

      //获取支付参数
      const res2 = await request({url:'/my/orders/req_unifiedorder', data: {order_number}, method: "POST"})
      const pay = res2.data.message.pay
    
      //微信支付
      await requestPayment(pay)

      //查看订单支付状态
      await request({url:"/my/orders/chkOrder",data:{order_number},method:"POST"})

      //提醒用户支付成功
      await showToast("支付成功")

      //跳转订单页面
      wx.navigateTo({
        url: '../order/order'
      });

      //将购物车购买过的商品清除
      const cart = wx.getStorageSync("cart")||[];
      const newCart = cart.filter(item => !item.checked)
      wx.setStorageSync("cart", newCart);
    } catch (error) {
      //提醒用户支付失败
      await showToast("支付失败")
      console.log(error);
    }
  }

})