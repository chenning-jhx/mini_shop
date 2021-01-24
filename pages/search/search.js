import { request } from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult: []
  },

  //定义全局变量 timeD
  timeD:-1,

  //监听输入框内容改变
  handleInput(e) {
    const {value} = e.detail;
    //判断值补位空
    if(!value.trim()) {
      wx.showToast({
        title: '输入的值不能为空',
        icon: 'none',
        mask: true
      });
      return;
    }

    //防抖函数，设置定时器
    // 清楚定时器
    clearTimeout(this.timeD)
    //设置定时器
    this.timeD = setTimeout(() => {
      this.getSearchData(value)
    },1000)
  },
  
  //发起网络请求，查询数据
  async getSearchData(query) {
    const res = await request({url:"/goods/qsearch?query="+query});
    const searchResult = res.data.message;
    this.setData({
      searchResult
    })
  },

  handleGoodsDetail(e) {
    const {goods_id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../goods_detail/goods_detail?goods_id='+goods_id
    });
  }
})