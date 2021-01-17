import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContentList: [],
    currentIndex: 0,
    scrolltop: 0
  },

  //定义全局变量接收接口数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //将分类数据插入缓存中
    const Cates = wx.getStorageSync("cates")
    //不存在 发送请求获取数据
    if (!Cates) {
      this.getCatesData()
    } else {
      // 有旧的数据，定义过期时间 5分钟
      if (Date.now() - Cates.time > 5000) {
        //重新发起请求
        this.getCatesData()
      } else {
        //没有过期，使用旧数据   
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(item => item.cat_name)
        let rightContentList = this.Cates[0].children

        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }
  },

  //发起网络请求，获得分类数据
  async getCatesData() {
    const res = await request({ url: '/categories' })
    this.Cates = res.data.message

    //将获取的数据存入缓存中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })
    //获取左边导航栏数据
    let leftMenuList = this.Cates.map(item => item.cat_name)
    let rightContentList = this.Cates[0].children

    this.setData({
      leftMenuList,
      rightContentList
    })
  },

  //左侧导航栏点击事件
  handleLeftMenu(e) {
    let currentIndex = e.currentTarget.dataset.index
    let rightContentList = this.Cates[currentIndex].children
    this.setData({
      currentIndex,
      rightContentList,
      scrollTop: 0
    })
  },

  //点击导航跳转商品列表页面
  handleGoodsList(e) {
    const {cat_id} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../goods_list/goods_list?cat_id='+ cat_id
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