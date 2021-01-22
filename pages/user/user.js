// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
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
    this.getUserInfo()
  },

  //获取用户信息
  getUserInfo() {
    const userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })
  },

  //点击跳转登陆页面
  handleLogin() {
    wx.navigateTo({
      url: '../login/login'
    })
  },

  //监听订单点击事件
  handleUserOrder(e) {
    const {type} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../order/order?type='+ type
    });
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