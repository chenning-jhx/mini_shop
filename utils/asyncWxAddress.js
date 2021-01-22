/**
 * promise 形式 getSetting
 */

export const getSetting = () => {
    return new Promise ((reslove, reject) => {
        wx.getSetting({
            success: (result) => {
                reslove(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

/**
 * promise 形式 chooseAddress
 */

export const chooseAddress = () => {
    return new Promise ((reslove, reject) => {
        wx.chooseAddress({
            success: (result) => {
                reslove(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

/**
 * promise 形式 openSetting
 */

export const openSetting = () => {
    return new Promise ((reslove, reject) => {
        wx.openSetting({
            success: (result) => {
                reslove(result)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

/**
 *  promise 形式 showModal
 * @param {object} content 
 */

export const showModal = (content) => {
    return new Promise ((reslove, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
                reslove(result)
            },
            fail: (err) => {
                reject(err)
            }
          })
    })
}

/**
 * promise 形式 showToast
 * @param {*} title 
 */
export const showToast = (title) => {
    return new Promise ((reslove, reject) => {
        wx.showToast({
            title: title,
            icon: "error",
            success: (result) => {
                reslove(result)
            },
            fail: (err) => {
                reject(err)
            }
          })
    })
}

/**
 * promise 形式 requestPayment
 * @param {*} pay 
 */
export const requestPayment = (pay) => {
    return new Promise ((reslove, reject) => {
        wx.requestPayment({
            ...pay,
            success: (result)=>{
                reslove(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}