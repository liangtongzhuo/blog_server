'use strict';
const rp = require('request-promise');
// 发送post请求
async function getRequestWechat() {
  const options = {
    method: 'get',
    uri: 'http://119.27.191.55:3000',
  };
  try {
    const url = await rp(options);
    return {
      code: 0,
      url,
    };
  } catch (error) {
    return {
      code: 1,
      error,
    };
  }
}

module.exports.getRequestWechat = getRequestWechat;
