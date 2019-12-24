module.exports = options => {
    // 普通页面
    let string = `
Page({
    $route: 'pages/${options.name}/${options.name}',
    /**
     * 页面的初始数据
     */
    data: {
        title: '${options.name}'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
    `

    // 预加载页面
    if(options.preJs) {
        string = `
const fetch = async (options) => {
    try {
    return await Promise.resolve({code: 0})
    } catch (err) {
    return {}
    }
}

Page({
    $route: 'pages/${options.name}/${options.name}',
    /**
     * 页面的初始数据
     */
    data: {
        title: '${options.name}'
    },
    onPreLoad: fetch,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function(options) {
        this.$wLoading.show()
        const result = await this.$getPreload(fetch, options)
        console.log(result)
        this.$wLoading.hide()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
        `
    }

    // 功能组件 | 业务组件
    if(options.type == 'components' || options.type == 'module') {
        string = `
Component({
    behaviors: [],
    properties: {},
    data: {},
    lifetimes: {
        attached: function () { },
        moved: function () { },
        detached: function () { },
    },
    attached: function () { },
    ready: function() { },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
    methods: {}
})
        `
    }
    return string
}