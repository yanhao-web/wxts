// pages/details/details.js
const db = wx.cloud.database({ env:"web-test-01-fw178"});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    obj:{},
    xf:"",
    ps:[],
    fileIDs:[]
  },
  onxf:function(e){
    this.setData({xf:e.detail});
  },
  go:function(){
    wx.showLoading({
      title: '动态正在发表中...',
    })
    var arr=[];
    for(var i=0;i<this.data.ps.length;i++){
      var f=this.data.ps[i];
      var n=f.lastIndexOf(".");
      var c=f.slice(n);
      var c1=new Date().getTime()+""+Math.floor(Math.random()*9999)+c;
      arr.push(new Promise((resolve,reject)=>{
        wx.cloud.uploadFile({
          cloudPath:c1,
          filePath:f,
          success: (res) => {
            this.data.fileIDs.push(res.fileID);
            resolve();
          }
        });
      }));
    }
    Promise.all(arr).then(res => {
      db.collection("ts").add({
        data: {
          title: this.data.obj.title,
          image: this.data.obj.image,
          xf: this.data.xf,
          id:this.data.id,
          fileIDs: this.data.fileIDs
        }
      }).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: '动态发表成功',
        })
      }).catch(err => {
        console.log(err);
      });
    }).catch(err=>{
      console.log(err);
    });
  },
  add:function(){
    wx.chooseImage({
      count:9,
      sizeType:["original","compressed"],
      sourceType:["album","camera"],
      success: (res)=> {
        this.setData({ps:res.tempFilePaths});
      },
    })
  },
  load:function(){
    wx.cloud.callFunction({
      name:"cb",
      data:{
        id:this.data.id
      }
    }).then(res=>{
      var o=JSON.parse(res.result);
      this.setData({obj:o});
      console.log(this.data.obj);
    }).catch(err=>{
      console.log(err);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id});
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