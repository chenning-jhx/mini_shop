

//页面请求的次数
let ajaxTimes = 0;

export const request = (params) => {
    //判断是否有请求头参数
    let header = {...params.header};
    if(params.url.includes("/my/")) {
        header['Authorization'] = wx.getStorageSync("token");
    }

    ajaxTimes++;
    //加载中 图标显示
    wx.showLoading({
        title: '加载中',
        mask: true
     })
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header: header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete:() => {
                ajaxTimes--;
                if(ajaxTimes === 0) {
                    setTimeout(function () {
                        wx.hideLoading()
                      })
                }
            }
        });
    })
}