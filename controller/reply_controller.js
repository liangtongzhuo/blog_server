'use strict';

const router = new require('koa-router')();
const wechat = require('co-wechat');

const config = {
  token: process.env.wechat_token,
  appid: process.env.wechat_appid,
  encodingAESKey: process.env.wechat_encodingAESKey
};


// router.all(wechat(config).middleware(async (message, ctx) => {
//   return message.toString();
// }))

function reply (message){
    console.log('-----',message);
      // 微信输入信息就是这个 message

}


module.exports = router;
