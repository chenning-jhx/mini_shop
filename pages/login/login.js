// pages/login/login.js
Page({
  //监听登陆按钮点击事件
  handleGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    //将用户信息存入缓存
    wx.setStorageSync("userInfo", userInfo);
    wx.setStorageSync("token",token);
    //返回到个人中心
    wx.navigateBack({
      delta: 1
    });
  }
})