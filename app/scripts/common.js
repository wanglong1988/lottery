var config = {
    // host:'http://192.168.88.207:80',
    host:'http://activity-server.test.sanqimei.com',
    // host:'http://activity-server.dev.sanqimei.com',
    // redirectUri: 'http://192.168.88.203:9000',
    redirectUri: 'http://activities.sanqimei.com/lottery/dist/index.html',
    timeout:5000,
    shareLogo:'http://static.sanqimei.com/activity/12/two_12.png',
    shareTitle:'幸运双12，福利免费领',
    shareContent:'幸运双12，福利免费领！',

}

function $ajax(url, params, success, error) {
    url = config.host + url;// 拼接请求地址
    var success = arguments[2] ? arguments[2] : function () { };// 成功执行的函数
    var error = arguments[3] ? arguments[3] : function () { };// 失败执行的函数
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: params,//参数
        timeout: 500,
        success: function (res) {
            success(res);
        },
        error: function (e, errType, error) {
            alert(errType+'---');
            // error(e);
        }
    })
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
            'onMenuShareQZone'
        ]
    });
    wx.error(function (res) {
        console.log(res.errMsg);
    });
}

function updateShareTimes(){
    let url = '/share/updateShareCount';
    let openid = JSON.parse(sessionStorage.getItem('accessinfo')).openid;
    alert(sessionStorage.getItem('accessinfo')+'-----info');
    $ajax(url, {openid}, function(res){
        if(res.status == '1'){

        }else{
            layer.open({
                content: res.errorMsg,
                skin: 'msg',
                time: 2
            });
        }
    }, function(){
        alert('分享失败')
    })
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

        //获取“分享到朋友圈”
        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            link: lineLink, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function (res) {
                // 用户确认分享后执行的回调函数
                // updateShareTimes()
                alert('pqcg')
            },
            cancel: function (res) {
                // 用户取消分享后执行的回调函数
                alert('pqsb')
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
            success: function (res) {
                // 用户确认分享后执行的回调函数
                updateShareTimes()
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
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
               updateShareTimes()
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
               updateShareTimes()
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
               updateShareTimes()
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
