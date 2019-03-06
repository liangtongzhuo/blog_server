'use strict';
const rp = require ('request-promise');
// 发送post请求
async function postRequest (userId, content) {
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
        userId: userId.split ('_')[1],
      },
    },
    maxAge: 1000,
    json: true,
  };
  try {
    const result = await rp (options);
    return result.results[0].values.text;
  } catch (error) {
    return '梁同桌今天可能累，去睡觉觉了';
  }
}

module.exports.postRequest = postRequest;