'use strict';
const AV = require ('leanengine');
const WeChatReply = AV.Object.extend ('WeChatReply');
let weChatReplys;
(async function () {
  const query = new AV.Query (WeChatReply);
  try {
    weChatReplys = await query.find ();
  } catch (e) {
    console.log ('query weChatReplys', e);
  }
}) ();

// 根据文本返回回复文本
function getMessage (message) {
  let replyMessage;
  weChatReplys.forEach (weChatReply => {
    weChatReply.get ('key').split (',').forEach (keySub => {
      // 匹配到了则回复
      if (keySub.indexOf (message) !== -1) {
        const values = weChatReply.get ('value').split (',');
        if (values.length === 1) {
          replyMessage = values[0];
        } else {
          // 文本用逗号分开，随机分配一个。
          const random = parseInt (Math.random () * values.length);
          replyMessage = values[random];
        }
      }
    });
  });
  return replyMessage;
}

module.exports.getMessage = getMessage;