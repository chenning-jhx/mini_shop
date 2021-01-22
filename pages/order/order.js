import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        value: "全部",
        id: 0,
        isActived: true
      },
      {
        value: "待付款",
        id: 1,
        isActived: false
      },
      {
        value: "待发货",
        id: 2,
        isActived: false
      },
      {
        value: "退款/退货",
        id: 3,
        isActived: false
      }
    ],
    orderData: []
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
  onShow: function () {
    this.getOrderData()  
  },

  //获取订单数据
  async getOrderData() {
    //查询下缓存中是否有token值
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '../auth/auth'
      });
    }

    //获取用户传递过来的type参数
    const { options } =  getCurrentPages()[0];
    const res = await request({url:"/my/orders/all",data:options})
    const orderData = res.data.message.orders
    this.setData({
      orderData
    })
  },

  //监听tabs点击事件
  handeleTap(e) {
    const { index } = e.detail;
    const { tabs } = this.data;
    tabs.forEach((item, i) => {
      i === index ? item.isActived = true : item.isActived = false
    })
    this.setData({
      tabs
    })
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