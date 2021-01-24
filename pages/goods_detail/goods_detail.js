import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    isCollected: false
  },

  //全局变量
  goodInfo: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let curPages =  getCurrentPages();
    let goods_id = curPages[curPages.length-1].options.goods_id; 
    this.getGoodsDetailData(goods_id); 
  },

  //获取商品详情数据
  async getGoodsDetailData(goods_id) {
    const res = await request({url:"/goods/detail",data: {goods_id}})
    this.goodInfo = res.data.message;
    //缓存中获取收藏商品数组
    const collect = wx.getStorageSync("collect")||[];
    let isCollected = collect.some(item => item.goods_id === this.goodInfo.goods_id)
    let goods = {};
    goods["goods_id"] = res.data.message.goods_id;
    goods["pics"] = res.data.message.pics;
    goods["goods_name"] = res.data.message.goods_name;
    goods["goods_price"] = res.data.message.goods_price;
    goods["goods_introduce"] = res.data.message.goods_introduce;
    this.setData({
      goods,
      isCollected
    })
  },

  //点击跳转购物车页面
  handleGoCart() {
    wx.switchTab({
      url: '../cart/cart'
    })
  },

  //加入购物车，将数据存入
  handleAddCart() {
    //将数据存入缓存
    let cart = wx.getStorageSync("cart")||[]
    let index = cart.findIndex(item => item.goods_id === this.goodInfo.goods_id)
    if(index === -1) {
      this.goodInfo.num = 1;
      this.goodInfo.checked = true;
      cart.push(this.goodInfo)
    }else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart)
    wx.showToast({title: "添加购物车成功！"})
  },

  //点击轮播图，预览图片
  handlePreviewImage(e) {
    let { url } = e.currentTarget.dataset;
    let urls = this.data.goods.pics.map(item => item.pics_mid)
    wx.previewImage({
      current: url,
      urls: urls,
      success: (result)=>{
        console.log(result);
      }
    });
  },

  //监听点击收藏
  handleCollect() {
    let isCollected = false;
    //判断缓存中是否有收藏商品数组
    const collect = wx.getStorageSync("collect")||[];
    let index = collect.findIndex(item => item.goods_id === this.goodInfo.goods_id)
    if(index!= -1) {
      collect.splice(index,1);
      isCollected = false;
      this.setData({
        isCollected
      })
      wx.setStorageSync("collect", collect);
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        mask: false
      });
    } else {
      collect.push(this.goodInfo);
      isCollected = true;
      this.setData({
        isCollected
      })
      wx.setStorageSync("collect", collect);
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: false
      });
    }
  }
})