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
  appid: 'THE APPID',
  encodingAESKey: 'QdJrC9S52so7T4bol9bIziVskK332nAwve5qJI1KfIY'
};



// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

const app = new Koa();

// 设置模版引擎
app.use(views(path.join(__dirname, 'views')));

// 设置静态资源目录
app.use(statics(path.join(__dirname, 'public')));

app.use(wechat(config).middleware(async (message, ctx) => {

}))


const router = new Router();
app.use(router.routes());

// 加载云引擎中间件
app.use(AV.koa());

app.use(bodyParser());

router.get('/', async function (ctx) {
  ctx.state.currentTime = new Date();
  await ctx.render('./index.ejs');
});

// 可以将一类的路由单独保存在一个文件中
app.use(require('./routes/todos').routes());

module.exports = app;





// 下面用于验证微信 token
/*
var http = require("http");
var url = require("url");
var crypto = require("crypto");

function sha1(str){
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

function validateToken(req,res){
  var query = url.parse(req.url,true).query;
  var signature = query.signature;
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;
  var oriArray = new Array();
  oriArray[0] = nonce;
  oriArray[1] = timestamp;
  oriArray[2] = "liangtongzhuo";//这里是你在微信开发者中心页面里填的 token，而不是****
  oriArray.sort();
  var original = oriArray.join('');
  console.log("Original str : " + original);
  console.log("Signature : " + signature );
  var scyptoString = sha1(original);
  if(signature == scyptoString){
    res.end(echostr);
    console.log("Confirm and send echo back");
  }else {
    res.end("false");
    console.log("Failed!");
  }
}


var webSvr = http.createServer(validateToken);
webSvr.listen(function(){
  console.log("Start validate");
});

module.exports = webSvr;
*/