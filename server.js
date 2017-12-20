import { setInterval } from 'timers';

var AV = require('leanengine')
var request = require('request')

// 环境变量中获取, 并初始化.
AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
})

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey()

var app = require('./app')

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000)

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT)

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function (err) {
    console.error("Caught exception:", err.stack)
  });
  process.on('unhandledRejection', function (reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack)
  });

  // 定时获取微信 AccessToken
  setInterval(() => {
    timeUpData()
  }, 1000 * 60 * 60 * 1.5)
    timeUpData()
})

function timeUpData() {
  updateAccessToken()
    .then(data => {
      console.log('AccessToken', data)
      global.access_token = data.access_token //复制为全局
    })
    .catch(err => {
      console.log('验证 AccessToken 错误：', err)
    })
}

// 票据更新
function updateAccessToken() {
  var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + process.env.wechat_appid + '&secret=' + process.env.wechat_appSecret
  return new Promise(function (resolve, reject) {
    // 发起一个get请求
    request(url, (err, response) => {
      if (err) return reject(err)
      resolve(response.body)
    })
  })
}