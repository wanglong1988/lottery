var loading1 = null;
var str = '';
var mapObj={};


function getWxConfig(url,lineLink){
    $ajax('/free/getWeChatInfo',{url:url},function(res){
        if(res.status === '1'){
            var data = res.result
              if(GetQueryString('state') == '1'){
                let code = GetQueryString('code')
                $ajax('/oauth/getAccessToken', {code}, function(res){
                  if(res.errcode){

                  }else{
                    sessionStorage.setItem('accessinfo', JSON.stringify(res))
                  }
                }, function(res){
                  // throw new Error('error main')
                  layer.open({
                      content: '获取微信信息异常'
                      ,skin: 'msg'
                      ,time: 2
                    });
                })
              }else{
              // location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${data.appId}&redirect_uri=http%3a%2f%2factivities.sanqimei.com%2flottery%2fdist%2findex.html&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
              location.href = `https://activities.sanqimei.com/get-weixin-code.html?appid=${data.appId}&redirect_uri=http%3a%2f%2f192.168.88.203%3a9000&scope=snsapi_userinfo&connect_redirect=1&state=1`
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

    // 分享链接干净无污染

    lineLink = lineLink.split('?')[0]

    getWxConfig(url,lineLink);

})
