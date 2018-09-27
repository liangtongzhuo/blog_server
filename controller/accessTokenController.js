'use strict';
const request = require('request');
// 定时获取微信 AccessToken
setInterval(() => {
  timeUpData();
}, 1000 * 60 * 60 * 1.5);
timeUpData();

function timeUpData() {
  updateAccessToken()
    .then(data => {
      console.log('AccessToken', data);
      global.access_token = data.access_token; //复制为全局
    })
    .catch(err => {
      console.log('验证 AccessToken 错误：', err);
    });
}

// 票据更新
function updateAccessToken() {
  var url =
    'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
    process.env.wechat_appid +
    '&secret=' +
    process.env.wechat_appSecret;
  return new Promise(function(resolve, reject) {
    // 发起一个get请求
    request(url, (err, response) => {
      if (err) return reject(err);
      resolve(response.body);
    });
  });
}
