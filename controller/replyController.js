'use strict';
const rp = require('request-promise');

const reply = async (message, ctx) => {
  console.log('-----', message, ctx.request);
  //关注
  if (message.Event == 'subscribe') {
    return '你关注了梁同桌公众号\n博客: liangtongzhuo.com\n知乎、bilibili、微博、github，id 都为「梁同桌」\n这个公众号会搞一些有意思的事，也可能万年不更新！我也帮助梁同桌选择午饭，也可你陪你聊天啦。';
  }
  // 文本
  if (message.MsgType == 'text') {
    if (message.Content == '吃饭' || message.Content == '换一家') {
      const arr = [
        '西边盖浇饭',
        '西边茄汁面',
        '北边盖浇饭',
        '东边麻辣豆腐',
        '东边臊子面',
        '东边热干面',
        '东边胡辣汤',
        '东边清真饭店',
        '北边会面',
      ];
      const random = parseInt(Math.random() * arr.length);
      return arr[random] + '，不想吃回复“换一家” :)';
    }

    if (message.Content == '喜欢你' || message.Content == '我喜欢你') {
      return '我不会告诉梁同桌的，但是我会记到数据库离 :)，梁同桌那傻子是不会看的 :(';
    }

    if (message.Content == '不喜欢你' || message.Content == '我不喜欢你') {
      return '哼！讨厌 :(';
    }

    if (message.Content == '你喜欢谁' || message.Content == '你喜欢谁？') {
      return '讨厌，正在和我聊天的人。 害羞.jpg';
    }

    // 请求智能返回语句
    return await postRequest(message.FromUserName, message.Content);
  }
  return '不听不听\n回复 “吃饭”，选择餐馆 :)';
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

module.exports.reply = reply;
module.exports.postRequest = postRequest;
