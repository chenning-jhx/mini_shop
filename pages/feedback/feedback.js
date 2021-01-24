// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActived: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActived: false
      },
    ],
    cateData: [
      {
        id: 0,
        value: '功能建议',
        isActived: false
      },
      {
        id: 1,
        value: '购买遇到问题',
        isActived: false
      },
      {
        id: 2,
        value: '性能问题',
        isActived: false
      },
      {
        id: 3,
        value: '其他',
        isActived: false
      }
    ],
    upImageList: []
  },

  //点击添加图片
  handleAddImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        const upImageList = [...this.data.upImageList, ...result.tempFilePaths];
        this.setData({
          upImageList
        })
      }
    });
  },

  //点击删除图片
  handleRemoveImg(e) {
    const {index} = e.currentTarget.dataset;
    const {upImageList} = this.data;
    upImageList.splice(index, 1);
    this.setData({
      upImageList
    })
  }
})