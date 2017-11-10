'use strict';

const path = require('path');

const AV = require('leanengine');
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const statics = require('koa-static');
const bodyParser = require('koa-bodyparser');
const wechat = require('co-wechat');

const config = {
  token: 'liangtongzhuo',
  appid: 'wxddeea05ac16ca936',
  encodingAESKey: 'QdJrC9S52so7T4bol9bIziVskK332nAwve5qJI1KfIY'
};



// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

const app = new Koa();

// 设置模版引擎
app.use(views(path.join(__dirname, 'views')));

// 设置静态资源目录
app.use(statics(path.join(__dirname, 'public')));

const router = new Router();
app.use(router.routes());

// // 加载云引擎中间件
app.use(AV.koa());

app.use(bodyParser());

router.get('/', async function (ctx) {
  ctx.state.currentTime = new Date();
  await ctx.render('./index.ejs');
});

// 可以将一类的路由单独保存在一个文件中
app.use(require('./routes/todos').routes());

app.use(wechat(config).middleware(async (message, ctx) => {
  console.log('-----',message);
  // 微信输入信息就是这个 message
  if (message.Content === 'diaosi') {
    // 回复屌丝(普通回复)
    return 'hehe';
  } else if (message.FromUserName === 'text') {
    //你也可以这样回复text类型的信息
    return {
      content: 'text object',
      type: 'text'
    };
  } else if (message.FromUserName === 'hehe') {
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
  } else if (message.FromUserName === 'kf') {
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
}));

module.exports = app;






