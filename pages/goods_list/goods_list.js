import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActived: true
      },
      {
        id: 1,
        value: '销量',
        isActived: false
      },
      {
        id: 2,
        value: '价格',
        isActived: false
      }
    ],
    goodsList: [],
    lasyImage: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=588478138,900370032&fm=26&gp=0.jpg"
  },

  //请求参数
  queryData: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryData.cid = options.cat_id
    this.getGoodsListData()
  },

  //获取商品列表数据
  async getGoodsListData() {
    const res = await request({ url: "/goods/search", data: this.queryData })
    const goodsList = res.data.message.goods
    this.setData({
      goodsList
    })
  },

  //监听tab栏点击事件
  handleTab(e) {
    const { index } = e.detail;
    const { tabs } = this.data;
    tabs.forEach((v, i) => {
      i === index ? v.isActived = true : v.isActived = false
    })
    this.setData({
      tabs
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