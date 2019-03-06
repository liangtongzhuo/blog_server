'use strict';
const {Wechaty, Friendship} = require ('wechaty');

async function iniWechat () {
  return new Promise (function (resolve, reject) {
    const bot = new Wechaty ();
    // 二维码网页生成
    function onScan (qrcode, status) {
      const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent (qrcode),
      ].join ('');
      console.log (qrcodeImageUrl);
      resolve (qrcodeImageUrl);
    }
    // 登录
    function onLogin (user) {
      console.log (`${user}登录了`);
    }
    //登出
    function onLogout (user) {
      console.log (`${user} 登出`);
    }
    bot.on ('scan', onScan);
    bot.on ('login', onLogin);
    bot.on ('logout', onLogout);
    // bot.on ('message', onMessage);
    // bot.on ('friendship', onFriendShip);
    bot.start ().then (() => console.log ('开始登陆微信')).catch (e => reject (e));
  });
}

module.exports.iniWechat = iniWechat;
