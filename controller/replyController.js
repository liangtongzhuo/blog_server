'use strict';
const rp = require('request-promise');
const AV = require('leanengine');
const WeChatReply = AV.Object.extend('WeChatReply');
let weChatReplys;
(async function() {
  const query = new AV.Query(WeChatReply);
  try {
    weChatReplys = await query.find();
  } catch (e) {
    console.log('query weChatReplys', e);
  }
})();

const reply = async (message, ctx) => {
  console.log('-----', message, ctx.request);
  //关注
  if (message.Event == 'subscribe') {
    return '哇塞！你关注了梁同桌公众号，他的其它社交媒体有\n博客: liangtongzhuo.com\n知乎、bilibili、微博、GitHub，ID 都为「梁同桌」\n这个公众号会搞一些有意思的事，也可能万年不更新！我也帮助梁同桌选择午饭，回复「吃饭」，也可你陪你聊天啦，回复 [任意文字]';
  }
  // 文本
  if (message.MsgType == 'text') {
    const replyMessage = getMessage(message.Content);
    if (replyMessage) return replyMessage;

    // 请求智能返回语句
    return await postRequest(message.FromUserName, message.Content);
  }
  return '不听不听\n回复「吃饭」，选择餐馆 :)';
};

// 发送post请求
async function postRequest(userId, content) {
  const options = {
    method: 'POST',
    uri: 'http://openapi.tuling123.com/openapi/api/v2',
    body: {
      reqType: 0,
      perception: {
        inputText: {
          text: content,
        },
      },
      userInfo: {
        apiKey: process.env.tuling_key,
        // 做一下兼容，api 不支持 userId 带下划线。
        userId: userId.split('_')[1],
      },
    },
    maxAge: 1000,
    json: true,
  };
  try {
    const result = await rp(options);
    return result.results[0].values.text;
  } catch (error) {
    return '梁同桌今天可能累，去睡觉觉了';
  }
}

// 根据文本返回回复文本
function getMessage(message) {
  let replyMessage = '';
  weChatReplys.forEach(weChatReply => {
    weChatReply
      .get('key')
      .split(',')
      .forEach(keySub => {
        // 匹配到了则回复
        if (keySub.indexOf(message) !== -1) {
          const values = weChatReply.get('value').split(',');
          if (values.length === 1) {
            replyMessage = values[0];
          } else {
            // 文本用逗号分开，随机分配一个。
            const random = parseInt(Math.random() * values.length);
            replyMessage = values[random];
          }
        }
      });
  });
  return replyMessage;
}

module.exports.reply = reply;
module.exports.postRequest = postRequest;
