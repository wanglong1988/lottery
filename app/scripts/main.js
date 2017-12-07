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
            console.log(data)
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
          console.log('success')
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

    //奖品列表
    $ajax('/free/listFreeProduct',{type:1},function(res){
      if(res.result.length >0){
        $('#prize .price-empty').hide();
        $('#prize .price-yes').show();
        console.log(res.result);
        // res.result.forEach(function(item,index) {
        //   str += `<li>
        //               <img src=${item.picUrl} alt=${item.title} width="100%">
        //           </li>`
        // });
        var str=res.result.map(function (item) {
           return `<li><img src=${item.picUrl} alt=${item.title} width="100%"></li>`;
        })

         console.log(str);
        $('#prizeUl').html(str)
        layer.close(layer.open({type: 2}))
      }else{
        $('#prize .price-empty').show();
        $('#prize .price-yes').hide();
      }
    },function(e){
      layer.open({
        content: e.message
        ,skin: 'msg'
        ,time: 2
      });
    })

})
