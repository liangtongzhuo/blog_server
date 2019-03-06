'use strict';
const { postRequest } = require('./AIController')
const { getMessage } = require('./leanController')

const reply = async (message, ctx) => {
  console.log ('----消息', message);
  //关注
  if (message.Event == 'subscribe') {
    return '哇塞！你关注了梁同桌公众号，他的其它社交媒体有:\n个人博客:http://www.liangtongzhuo.com\n\nbilibili 同人音声:https://space.bilibili.com/3591966\n\n微博私人账单:https://www.weibo.com/tongrenyinsheng\n\nGitHub 技术开源:https://github.com/liangtongzhuo\n\n知乎价值观:https://www.zhihu.com/people/liangtongzhuo\n\n多人在线打飞机游戏:http://planes.liangtongzhuo.com\n\n这个公众号会搞一些有意思的事，也可能万年不更新！\n\n你也帮助梁同桌选择午饭，回复「吃饭」。\n梁同桌也可你陪你聊天，回复「任意文字」';
  }
  // 文本
  if (message.MsgType == 'text') {
    // 先从自己数据库查询有没有自定义文本
    const replyMessage = getMessage (message.Content);
    if (replyMessage) return replyMessage;
    // 调用其其它服务器进行微信登录
    else if (message.Content == '微信登录') {
      return '开发中';
    } else
      // 请求第三方 AI 语句
      return await postRequest (message.FromUserName, message.Content);
  }
  return '不听不听\n回复「吃饭」，选择餐馆 :)';
};


module.exports.reply = reply;
