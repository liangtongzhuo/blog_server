'use strict';

const router = new require('koa-router')();
const wechat = require('co-wechat');

const config = {
  token: process.env.wechat_token,
  appid: process.env.wechat_appid,
  encodingAESKey: process.env.wechat_encodingAESKey
};

router.use('/wechat',wechat(config).middleware(async (message, ctx) => {
  return reply(message);
}))
  
function reply (message){
    console.log('-----',message);
      // 微信输入信息就是这个 message
  if (message.Content === 'diaosi') {
    // 回复屌丝(普通回复)
    return 'hehe';
  } else if (message.Content === 'text') {
    //你也可以这样回复text类型的信息
    return {
      content: 'text object',
      type: 'text'
    };
  } else if (message.Content === 'hehe') {
    // 回复一段音乐
    return {
      type: "music",
      content: {
        title: "来段音乐吧",
        description: "一无所有",
        musicUrl: "http://mp3.com/xx.mp3",
        hqMusicUrl: "http://mp3.com/xx.mp3"
      }
    };
  } else if (message.Content === 'kf') {
    // 转发到客服接口
    return {
      type: "customerService",
      kfAccount: "test1@test"
    };
  } else {
    // 回复高富帅(图文回复)
    return [
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ];
  }
}


module.exports = router;