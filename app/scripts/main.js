var loading1 = null;
var str = '';
var mapObj={};

function $ajax(url, params, success, error) {
    url = config.host + url;// 拼接请求地址
    var success = arguments[2] ? arguments[2] : function () { };// 成功执行的函数
    var error = arguments[3] ? arguments[3] : function () { };// 失败执行的函数
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: params,//参数
        success: function (res) {
            success(res);
        },
        error: function (e) {
            error(e);
        }
    })
}

function getWxConfig(url,lineLink){
    $ajax('/free/getWeChatInfo',{url:url},function(res){
        if(res.status === '1'){
            var data = res.result
            //初始化微信配置
            wxShareConfig(data.appId, data.timestamp, data.nonceStr, data.signature);
            //分享准备
            wxShareReady(lineLink, config.shareTitle, config.shareContent, config.shareLogo);
        }
    })
}

$(function(){
    FastClick.attach(document.body);
    var url = window.location.href;
    var lineLink = url;
    getWxConfig(url,lineLink);

    $ajax('/statistics/saveStatistics',{type:1});

    $('#m-list').on('click','#group',function(){
      $ajax('/statistics/saveStatistics',{type:2},function(){
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5429f96d1f04975b&redirect_uri=https%3A%2F%2Fwx.m.shangjiadao.cn%2Fsjd_9458485%3Factivity%3D147873%26type%3D39%26joiner%3D9458485&response_type=code&scope=snsapi_userinfo&state=shangjiadao.cn&connect_redirect=1#wechat_redirect'

        layer.close(layer.open({type: 2}))
      },function(e){
        layer.open({
          content: e.message
          ,skin: 'msg'
          ,time: 2
        });
      })

    });

    $('#m-list').on('click','#receive',function(){
        $ajax('/statistics/saveStatistics',{type:3});
        $ajax('/statistics/getActivityFhNum',{type:3},function(res){
          if(res.status === '1'){
              window.location.href = `./sign.html?fromUrl=${url}`
              layer.close(layer.open({type: 2}))
          }else{
            layer.close(layer.open({type: 2}));
            layer.open({
              content: res.errorMsg
              ,skin: 'msg'
              ,time: 2
            });
          }
        },function(e){
          layer.open({
            content: e.message
            ,skin: 'msg'
            ,time: 2
          });
        })

    });

})


