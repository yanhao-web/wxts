// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const rp = require("request-promise");
// 云函数入口函数
exports.main = async (event, context) => {
  var url = `https://douban.uieee.com/v2/book/search?q=`;
  var q=event.q;
  var a=encodeURI(q);
  url += `${a}`;
  //解码q
  console.log(url);
  return rp(url).then(res => {
    console.log(res);
    return res;
  }).catch(err => {
    console.log(err);
  });
}