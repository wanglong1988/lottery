var config = {
    // host:'http://192.168.88.207:80',
    host:'http://activity-server.dev.sanqimei.com',
    // redirectUri: 'http://192.168.88.203:9000',
    redirectUri: 'http://activities.dev.sanqimei.com/lottery/dist/index.html',
    timeout:5000,
    shareLogo:'http://static.sanqimei.com/web/webapp/icon/show.png',
    shareTitle:'双重福利免费领',
    shareContent:'凤凰机器人联合37美放大招！双重福利免费领！',

}

// var fromUrl = GetQueryString('fromUrl');test
/**yi
 * 初始化微信分享配置
 * @param appId
 * @param timestamp
 * @param nonceStr
 * @param signature
 */
function wxShareConfig(appId, timestamp, nonceStr, signature) {
    wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone',
            'hideMenuItems'
        ]
    });
    wx.error(function (res) {
        console.log(res.errMsg);
    });
}


/**
 * 分享准备
 * @param lineLink
 * @param shareTitle
 * @param shareContent
 * @param shareLogo
 */
function wxShareReady(lineLink, shareTitle, shareContent, shareLogo) {
    wx.ready(function () {

        wx.hideMenuItems({
            
                // menuList: ['menuItem:share:qq'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            
            });
        
        //获取“分享到朋友圈”
        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: lineLink, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('已分享到朋友圈');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert('已取消分享到朋友圈');
            }
        });

        //获取“分享给朋友”
        wx.onMenuShareAppMessage({
            title: shareTitle, // 分享标题
            desc: shareContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: shareLogo, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('已分享到朋友');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
              alert('已取消分享到朋友');
            }
        });

        //获取“分享到QQ”
        wx.onMenuShareQQ({
            title: shareTitle, // 分享标题
            desc: shareContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function () {
               // 用户确认分享后执行的回调函数
            },
            cancel: function () {
               // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到QQ空间”
        wx.onMenuShareQZone({
            title: shareTitle, // 分享标题
            desc: shareContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function () {
               // 用户确认分享后执行的回调函数
            },
            cancel: function () {
               // 用户取消分享后执行的回调函数
            }
        });

        //获取“分享到腾讯微博”
        wx.onMenuShareWeibo({
            title: shareTitle, // 分享标题
            desc: shareContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function () {
               // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}

function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = '';
    if (r != null)
         context = r[2];
    reg = null;
    r = null;
    return context == null || context == '' || context == 'undefined' ? '' : context;
}
