'use strict';


const reply = async (message, ctx) => {
    console.log('-----', message, ctx.request);
    //关注
    if (message.Event == 'subscribe') {
        return '你关注了梁同桌公众号\n博客: liangtongzhuo.com\n知乎、bilibili、微博、github，id 都为「梁同桌」\n这个公众号会搞一些有意思的事，也可能万年不更新！😳😳😳';
    }
    // 文本
    if (message.MsgType == 'text') {
        if (message.Content == '1') {
            const arr = ['四川饭庄', '兰州拉面', '饺子馆', '烩面'];
            const i = parseInt(Math.random() * arr.length );//获取随机
            return arr[i];
        }

        return '不听不听，回复 “1” ，选择餐馆'
    }

    return '莫名其妙，啦啦啦啦啦！';
}







module.exports = reply;
