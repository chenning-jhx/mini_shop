// pages/login/login.js
Page({

  //监听登陆按钮点击事件
  handleGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    //将用户信息存入缓存
    wx.setStorageSync("userInfo", userInfo);
    //返回到个人中心
    wx.navigateBack({
      delta: 1
    });
  }
})