'use strict';


function reply(message, ctx) {
    console.log('-----', message);
    
    //关注
    if (message.Event == 'subscribe') {
        return '你关注了梁同桌\n博客: liangtongzhuo.com\n知乎、bilibili微博、github，都为梁同桌\n这个公众号会有一些有意思的事！😳😳😳';
    }
    // 文本
    if (message.MsgType == 'text') {
        if (message.Content == '1') {
            const arr = ['四川饭庄', '兰州拉面', '饺子馆'];
            let i = parseInt(Math.random() * 100) % 3;
            return arr[i];
        }

        return '不听不听，回复 “1” ，选择餐馆'
    }

    return '莫名其妙，啦啦啦啦啦！';
}








module.exports = reply;
