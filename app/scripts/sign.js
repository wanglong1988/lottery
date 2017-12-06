
var loading1 = null;
var str = '';
var mapObj = {};
var areaArr = [];
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

function getAjaxPromise(option){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: option.url,
            type: 'post',
            data: option.data || '',
            success: function(data){
                resolve(data);
            },
            error: function(error){
                reject(error);
            }
        });
    });
};

// function init(){
//     var errorMsg = '';
//
//     var prosPromise = getAjaxPromise({
//         url: config.host+'/free/listFreeProduct'
//     });
//     prosPromise.then(function(pros){
//         if (pros.status === '1') {
//             if (pros.result.length > 0) {
//                 pros.result.forEach(function (item, index) {
//                     mapObj[item.productId] = item
//                 });
//             }else{
//                 errorMsg = '数据异常';
//             }
//         } else {
//             errorMsg = res.errorMsg;
//         }
//         // return getAjaxPromise({
//         //     url: config.host+'/free/getRegion'
//         // });
//     })
//     .then(function(){
//         layer.close(loading1)
//         if(errorMsg !==''){
//             layer.open({
//                 content: errorMsg
//                 ,skin: 'msg'
//                 ,time: 2
//             });
//         }
//     })
//     .catch(function(e){
//         console.log(e)
//         layer.close(loading1)
//         layer.open({
//             content: e.message
//             ,skin: 'msg'
//             ,time: 2
//         });
//     });
//
// }

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
function repTel(){
    var rep =/^1[3|4|5|7|8][0-9]\d{8}$/;
    var telStr = $('#tel').val();
    if(telStr ===''){
        layer.open({
            content: '手机号不能为空'
            ,skin: 'msg'
            ,time: 2
        });
        return false
    }else{
        if(!rep.test(telStr)){
            layer.open({
                content: '手机号错误'
                ,skin: 'msg'
                ,time: 2
            });
        }
        return rep.test(telStr)
    }
}
function addZero(num){
    return num<10 ? '0'+num : num
}
function count(){
    var str = $('#getcode').text();
    var num = parseInt(str);
    var Timer = setInterval(function(){
        if(num<=0){
            clearInterval(Timer);
            $('#getcode').removeAttr('disabled').text('验证码').removeClass('get')
            return
        }
        num--;
        $('#getcode').text(addZero(num)+'s').addClass('get')
    },1000)
}


function prefix(){
    var styles = getCompStyle(document.documentElement),
        pre = (Array.prototype.slice.call(styles).join('')
            .match(/-(moz|webkit|ms)-/) || ['', 'o']
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
    };
}
function  getCompStyle(elem,classes){
    return (window.getComputedStyle?window.getComputedStyle(elem,classes||null):elem.currentStyle) || null;
}
function handler() {
    event.preventDefault();
    event.stopPropagation();
}

function hidden(Ele,cb){
    Ele.removeClass('fadeInUp fadeOutDown').addClass('fadeOutDown');
    var animEndEventNames = {
        'webkit' : 'webkitAnimationEnd',
        'o' : 'oAnimationEnd',
        'ms' : 'MSAnimationEnd',
        'animation' : 'animationend'
    },
    animEndEventName = animEndEventNames[prefix().lowercase]||animEndEventNames['animation'];
    animEndEventName  && Ele[0].addEventListener(animEndEventName, function handle() {
        cb && cb(animEndEventName,handle);
    });
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
    var fromUrl = GetQueryString('fromUrl');
    var refUrl = document.referrer;
    var lineLink = refUrl?refUrl:fromUrl;
    console.log(lineLink)
    getWxConfig(url,lineLink);
    // var userId = GetQueryString('userId');
    // var spuId = GetQueryString('spuId');

    // if(userId === ''||spuId === ''){
    //     layer.open({
    //         content: '传参异常'
    //         ,skin: 'msg'
    //         ,time: 2
    //     });
    //     return false
    // }
    // loading1 = layer.open({type: 2});
    // init();

    $('#getcode').on('click', function(){
        if(repTel()){
            $ajax('/free/getSmsCode',{phone:$('#tel').val(),type:3},function(res){
                if(res.status === '1'){
                    $('#getcode').attr('disabled','true').text('30s').addClass('get')
                    count();
                    layer.open({
                        content: '验证码已发送，请注意查收'
                        ,skin: 'msg'
                        ,time: 2
                    });
                }else{
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
        }
    })

    $('.m-popup-wrapper').on('click',function(){
        if(event.target==this){
            hidden($('.res-suc'),function(animEndEventName,handle){
                $('.m-popup-wrapper').hide();
                $('.res-suc').removeClass('fadeOutDown fadeInUp')
                $('.res-suc')[0].removeEventListener(animEndEventName, handle, false);
                document.body.removeEventListener('touchmove',handler,false);
                document.body.removeEventListener('wheel',handler,false);
            })
         }
    })



    $('#sub').on('click',function(){

        if(!repTel()){
            return false;
         }
         var code = $('#code').val();
         var repCode = /^\d{4}$/;
         if(code === ''){
             layer.open({
                 content: '验证码不能为空'
                 ,skin: 'msg'
                 ,time: 2
             });
             return false
         }else{
             if(!repCode.test(code)){
                 layer.open({
                     content: '验证码错误'
                     ,skin: 'msg'
                     ,time: 2
                 });
                 return false
             }
         }
        $ajax('/statistics/getActivityFhNum',{type:3},function(res){
          if(res.status === '1'){
            $ajax('/free/saveFree',{smsCode:code,phone:$('#tel').val(),spuId:100,shareUserId:0,areaId:320104,type:3},function(res){
              if(res.status === '1'){
                console.log(res.result)
                $('#suc-pic').attr('src',res.result.picUrl)
                $('#suc-tit').text(res.result.title)
                // $('#suc-sml-tit').text(res.result.productName)
                // $('#suc-use').attr('href','https://www.baidu.com/')
                $('#suc-use').attr('href',res.result.appUrl)
                $('.m-popup-wrapper').show();
                $('.m-popup').removeClass('fadeOutDown fadeInUp').addClass('fadeInUp');
                document.body.addEventListener('touchmove',handler,false);
                document.body.addEventListener('wheel',handler,false);
              }else{
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

    })
})
