// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const rp = require("request-promise");
// 云函数入口函数
exports.main = async (event, context) => {
  var url = `https://douban.uieee.com/v2/book/search?q=`;
  url += `${event.q}`;
  //解码q
  console.log(event.q);
  console.log(encodeURI(event.q));
  console.log(`${encodeURI(event.q)}`);
  console.log(url);
  return rp(url).then(res => {
    return res;
  }).catch(err => {
    console.log(err);
  });
}