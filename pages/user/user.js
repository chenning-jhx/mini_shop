// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserInfo()
    const collect = wx.getStorageSync("collect")||[];
    this.setData({
      collectNum: collect.length
    })
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

  //查询缓存中是否存在token
  isSureToken() {
    //查询下缓存中是否有token值
    const token = wx.getStorageSync("token");
    // 如果没有跳转登录页面
    if (!token) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
  },

  //点击跳转收藏页面
  handleCollect() {
    this.isSureToken();
    wx.navigateTo({
      url: '../collect/collect'
    });
  },

  //监听订单点击事件
  handleUserOrder(e) {
    this.isSureToken();
    const { type } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../order/order?type=' + type
    });
  },

  //点击跳转反馈意见页面
  handleFeedBack() {
    this.isSureToken();
    wx.navigateTo({
      url: '../feedback/feedback'
    });
  }
})