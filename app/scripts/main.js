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
            
            if(GetQueryString('code')){
              let code = GetQueryString('code')
              $ajax('/oauth/getAccessToken', {code}, function(res){
                if(res.errorCode){

                }else{
                  sessionStorage.setItem('accessinfo', JSON.stringify(res))
                }
              }, function(res){
                // throw new Error('error main')
                layer.open({
                    content: '服务器异常'
                    ,skin: 'msg'
                    ,time: 2
                  });
              })
            }else{
              window.location.href = `https://activities.sanqimei.com/get-weixin-code.html?appid=${data.appId}&redirect_uri=${encodeURIComponent('http://192.168.88.203:9000')}&scope=snsapi_userinfo&connect_redirect=1`
            }

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
