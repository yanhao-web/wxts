// pages/dongtai/dongtai.js
const db = wx.cloud.database({ env:"web-test-01-fw178"});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  load:function(){
    db.collection("ts").get().then(res=>{
      this.setData({list:res.data});
    }).catch(err=>{
      console.log(err);
    });
  },
  del:function(e){
    db.collection("ts").doc(e.target.dataset.id).remove().then(res=>{
      this.load();
    }).catch(err=>{
      console.log(err);
    });
  },
  jumpD:function(e){
    wx.cloud.callFunction({
      name:"cb",
      data:{
        id:e.target.dataset.id
      }
    }).then(res=>{
      wx.navigateTo({
        url: '/pages/details/details?id='+e.target.dataset.id,
      })
    }).catch(err=>{
      console.log(err);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load();
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