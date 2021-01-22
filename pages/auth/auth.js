// pages/auth/auth.js
Page({

  // 监听授权点击事件
  handleGetUserInfo(e) {
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
    wx.setStorageSync("token", token);
    //返还上一页,支付页面
    wx.navigateBack({
      delta: 1
    });
  }
})