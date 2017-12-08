var loading1 = null;
var str = '';
var mapObj={};


function getWxConfig(url,lineLink){
    $ajax('/free/getWeChatInfo',{url:url},function(res){
        if(res.status === '1'){
            var data = res.result
            alert(GetQueryString('code')+'==')
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
              location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${data.appId}&redirect_uri=${encodeURIComponent(config['redirectUri'])}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect `
              // window.location.href = `https://activities.sanqimei.com/get-weixin-code.html?appid=${data.appId}&redirect_uri=${encodeURIComponent(config['redirectUri'])}&scope=snsapi_userinfo&connect_redirect=1`
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

})
