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


  //点击轮播图跳转
  handleGoodsDetail(e) {
    let {navigator_url} = e.currentTarget.dataset;
    let url = navigator_url.replace(/main/,"goods_detail")
    wx.navigateTo({
      url
    });
  }
})