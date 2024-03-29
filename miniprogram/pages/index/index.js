// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    q:"",
    obj:{},
    list:[],
    id:""
  },
  jumpD:function(e){
    wx.navigateTo({
      url: '/pages/details/details?id='+e.target.dataset.id,
    })
  },
  onSearch:function(e){
    this.setData({q:e.detail});
    wx.cloud.callFunction({
      name:"ts04",
      data:{
        q:this.data.q
      }
    }).then(res=>{
      var o=JSON.parse(res.result);
      this.setData({obj:o});
    }).catch(err=>{
      console.log(err);
    });
  },
  onCancel:function(e){
    console.log(e.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

