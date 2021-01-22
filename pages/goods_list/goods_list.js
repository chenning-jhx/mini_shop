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

  //总页数
  totalPage: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryData.cid = options.cat_id;
    this.getGoodsListData();
  },

  //获取商品列表数据
  async getGoodsListData() {
    const res = await request({ url: "/goods/search", data: this.queryData })
    const goodsList = res.data.message.goods;

    //获取总页数
    const total = res.data.message.total;
    this.totalPage = Math.ceil(total / this.queryData.pagesize);

    //第一次请求数组和下拉请求的数组拼接
    this.setData({
      goodsList: [...this.data.goodsList,...res.data.message.goods]
    })

    //关闭下拉刷新
    wx.stopPullDownRefresh()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //判断页数有没有到最后一页
    if(this.queryData.pagenum >= this.totalPage) {
      wx.showToast({title:"没有更多商品！"});
    }else {
      this.queryData.pagenum++;
      this.getGoodsListData();
    }
  },

    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      goodsList: []
    });
    this.queryData.pagenum = 1;
    this.getGoodsListData();
  },

  //点击调整商品详情页面
  handleGoodDetail(e) {
    const {goods_id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../goods_detail/goods_detail?goods_id='+ goods_id
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})