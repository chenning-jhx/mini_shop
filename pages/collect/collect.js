// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "商品收藏",
        isActived: true
      },
      {
        id: 1,
        value: "品牌收藏",
        isActived: false
      },
      {
        id: 2,
        value: "店铺收藏",
        isActived: false
      },
      {
        id: 3,
        value: "浏览足迹",
        isActived: false
      }
    ],
    selectVal: [
      {
        id: 0,
        value: "全部",
        isActived: true
      },
      {
        id: 1,
        value: "正在热卖",
        isActived: false
      },
      {
        id: 2,
        value: "即将上线",
        isActived: false
      }
    ],
    collectGoods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectGoodsData()
  },

  //获取收藏商品列表
  getCollectGoodsData() {
    const collectGoods = wx.getStorageSync("collect");
    this.setData({
      collectGoods
    })
  },

  //tabs点击事件
  handleTab(e) {
    const { index } = e.detail;
    const { tabs } = this.data;
    tabs.forEach((item,i) => {
      i === index ? item.isActived = true : item.isActived = false
    })
    this.setData({
      tabs
    })
  },

  //点击商品，跳转商品详情页面
  handleCollectGoods(e) {
    const { goods_id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../goods_detail/goods_detail?goods_id='+goods_id
    });
  }
})