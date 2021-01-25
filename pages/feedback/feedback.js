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
    upImageList: [],
    textVal: '',
    loadImageUrlList: []
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
  },

  //文本域输入事件
  handleTextarea(e) {
    const{value} = e.detail
    this.setData({
      textVal: value
    })
  },

  //点击提交
  handleSubmit() {
    //获取文本域的值
    const {textVal} = this.data;
     //判断文本域的值是否为空
    if(!textVal.trim()) {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        mask: true
      });
      return;
    }
    
    wx.showLoading({
      title: "上传图片中",
      mask: true
    });
    //获取上传图片数组
    const {upImageList, loadImageUrlList} = this.data;
    //有选择上传图片
    if(upImageList.length > 0) {
    //上传图片到图片服务器
    upImageList.forEach((item, index) => {
      wx.uploadFile({
        url: '',//图片服务器地址
        filePath: item,
        name: 'image',
        formData: {},
        success: (result)=>{
          const url = JSON.parse(result.data).url
          loadImageUrlList.push(url)
          this.setData({
            loadImageUrlList
          })
          wx.hideLoading();
          //接口原因，无法上传,打印一下
          wx.showToast({
            title: '"已提交到后台"',
            icon: 'none',
            mask: true
          });
          wx.navigateBack({
            delta: 1
          });
        }
      });
    })
    }else {
      wx.hideLoading();
      //没有选择上传图片，只有文字
      wx.showToast({
        title: '"已提交到后台"',
        icon: 'none',
        mask: true
      });
      wx.navigateBack({
        delta: 1
      });
    }
  }
})