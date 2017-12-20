var AV = require('leanengine');

// 环境变量中获取, 并初始化.
AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./app');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error("Caught exception:", err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
  });
});


https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

// 票据过期或无效是更新
function updateAccessToken() {
  // 请求票据的地址
  var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+ process.env.wechat_appid +'&secret=' + process.env.wechat_appSecret;
  return new Promise(function(resolve, reject) {
    // 发起一个get请求
    request({url: url, json: true}).then(function(response) {
      // 拿到票据信息
      var data = response.body;
      // 往下继续传递数据
      resolve(data);
    });
  });
}