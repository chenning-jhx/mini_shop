// components/searchInput/searchInput.js
Page({

  //点击搜索，跳转搜索页面
  handleSearch() {
    wx.navigateTo({
      url: '../../pages/search/search'
    });
  }
})