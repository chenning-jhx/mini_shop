import { request } from '../../request/index'
import regeneratorRuntime, { async } from '../../lib/runtime/runtime'
import { formatDate } from '../../utils/formateDate.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        value: "全部",
        id: 0,
        isActived: true
      },
      {
        value: "待付款",
        id: 1,
        isActived: false
      },
      {
        value: "待发货",
        id: 2,
        isActived: false
      },
      {
        value: "退款/退货",
        id: 3,
        isActived: false
      }
    ],
    orderData: []
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderData()  
  },

  //获取订单数据
  getOrderData() {
    //获取用户传递过来的type参数
    const currentpages =  getCurrentPages();
    const type = currentpages[currentpages.length-1].options.type;
    this.requestData(type);
    const {tabs} = this.data;
    tabs.forEach((item, index) => {
      index === type-1 ? item.isActived = true : item.isActived = false
    })
    this.setData({
      tabs
    })
  },

  //监听tabs点击事件
  handeleTap(e) {
    const {index} = e.detail;
    const {tabs} = this.data;
    let type = index + 1;
    this.requestData(type);
    tabs.forEach((item, i) => {
      i === index ? item.isActived = true : item.isActived = false
    })

    //重新发起请求
    this.requestData(type)
    this.setData({
      tabs
    })
  },

  //发起网络请求数据
  async requestData(type) {
    const res = await request({url:"/my/orders/all",data:{type}})
    const orderData = res.data.message.orders
    orderData.forEach(item => {
      let date = new Date(item.create_time*1000)
      item.create_time = formatDate(date, "yyyy-MM-dd hh:mm:ss")
    })
    this.setData({
      orderData
    })
  }
})