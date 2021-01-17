// pages/goods_list/goods_list.js
import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperData()
    this.getNavData()
    this.getFloorData()
  },

  //获取轮播图数据
  getSwiperData() {
    request({url: '/home/swiperdata'}).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },

  //获取首页导航数据
  getNavData() {
    request({url: '/home/catitems'}).then(result => {
      this.setData({
        navList: result.data.message
      })
    })
  },

  //获取楼层区域数据
  getFloorData() {
    request({url: '/home/floordata'}).then(result => {
      this.setData({
        floorList: result.data.message
      })
    })
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