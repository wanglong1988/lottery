"use strict";function $ajax(e,t,n,i){e=config.host+e,alert(e);var o=arguments[2]?arguments[2]:function(){},a=arguments[3]?arguments[3]:function(){};$.ajax({url:e,type:"POST",dataType:"json",data:t,success:function(e){o(e)},error:function(e){a(e)}})}function wxShareConfig(e,t,n,i){wx.config({debug:!1,appId:e,timestamp:t,nonceStr:n,signature:i,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone","hideMenuItems"]}),wx.error(function(e){})}function updateShareTimes(){var e=JSON.parse(sessionStorage.getItem("accessinfo")).openid;$ajax("/share/updateShareCount",{openid:e},function(e){"1"==e.status||layer.open({content:e.errorMsg,skin:"msg",time:2})},function(){alert("分享失败")})}function wxShareReady(e,t,n,i){wx.ready(function(){wx.hideMenuItems({}),wx.onMenuShareTimeline({title:t,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:n,link:e,imgUrl:i,type:"link",dataUrl:"",success:function(e){updateShareTimes()},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:n,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:n,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}}),wx.onMenuShareWeibo({title:t,desc:n,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}})})}function GetQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t),i="";return null!=n&&(i=n[2]),t=null,n=null,null==i||""==i||"undefined"==i?"":i}function $ajax(e,t,n,i){e=config.host+e;var o=arguments[2]?arguments[2]:function(){},a=arguments[3]?arguments[3]:function(){};$.ajax({url:e,type:"POST",dataType:"json",data:t,success:function(e){o(e)},error:function(e){a(e)}})}function getAjaxPromise(e){return new Promise(function(t,n){$.ajax({url:e.url,type:"post",data:e.data||"",success:function(e){t(e)},error:function(e){n(e)}})})}function GetQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t),i="";return null!=n&&(i=n[2]),t=null,n=null,null==i||""==i||"undefined"==i?"":i}function repTel(){var e=/^1[3|4|5|7|8][0-9]\d{8}$/,t=$("#tel").val();return""===t?(layer.open({content:"手机号不能为空",skin:"msg",time:2}),!1):(e.test(t)||layer.open({content:"手机号错误",skin:"msg",time:2}),e.test(t))}function addZero(e){return e<10?"0"+e:e}function count(){var e=$("#getcode").text(),t=parseInt(e),n=setInterval(function(){if(t<=0)return clearInterval(n),void $("#getcode").removeAttr("disabled").text("验证码").removeClass("get");t--,$("#getcode").text(addZero(t)+"s").addClass("get")},1e3)}function prefix(){var e=getCompStyle(document.documentElement),t=(Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/)||["","o"])[1];return{dom:"WebKit|Moz|MS|O".match(new RegExp("("+t+")","i"))[1],lowercase:t,css:"-"+t+"-",js:t[0].toUpperCase()+t.substr(1)}}function getCompStyle(e,t){return(window.getComputedStyle?window.getComputedStyle(e,t||null):e.currentStyle)||null}function handler(){event.preventDefault(),event.stopPropagation()}function hidden(e,t){e.removeClass("fadeInUp fadeOutDown").addClass("fadeOutDown");var n={webkit:"webkitAnimationEnd",o:"oAnimationEnd",ms:"MSAnimationEnd",animation:"animationend"},i=n[prefix().lowercase]||n.animation;i&&e[0].addEventListener(i,function e(){t&&t(i,e)})}function getWxConfig(e,t){$ajax("/free/getWeChatInfo",{url:e},function(e){if("1"===e.status){var n=e.result;wxShareConfig(n.appId,n.timestamp,n.nonceStr,n.signature),wxShareReady(t,config.shareTitle,config.shareContent,config.shareLogo)}})}var config={host:"http://activity-server.dev.sanqimei.com",redirectUri:"http://activities.dev.sanqimei.com/lottery/dist/index.html",timeout:5e3,shareLogo:"http://static.sanqimei.com/web/webapp/icon/show.png",shareTitle:"幸运双12，福利免费领",shareContent:"双12放大招！福利免费领！"},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){var t=document,n="getElementsByClassName",i=function(e){return t.querySelectorAll(e)},o={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},a={extend:function(e){var t=JSON.parse(JSON.stringify(o));for(var n in e)t[n]=e[n];return t},timer:{},end:{}};a.touch=function(e,t){e.addEventListener("click",function(e){t.call(this,e)},!1)};var r=0,s=["layui-m-layer"],c=function(e){var t=this;t.config=a.extend(e),t.view()};c.prototype.view=function(){var e=this,o=e.config,a=t.createElement("div");e.id=a.id=s[0]+r,a.setAttribute("class",s[0]+" "+s[0]+(o.type||0)),a.setAttribute("index",r);var c=function(){var e="object"===_typeof(o.title);return o.title?'<h3 style="'+(e?o.title[1]:"")+'">'+(e?o.title[0]:o.title)+"</h3>":""}(),l=function(){"string"==typeof o.btn&&(o.btn=[o.btn]);var e,t=(o.btn||[]).length;return 0!==t&&o.btn?(e='<span yes type="1">'+o.btn[0]+"</span>",2===t&&(e='<span no type="0">'+o.btn[1]+"</span>"+e),'<div class="layui-m-layerbtn">'+e+"</div>"):""}();if(o.fixed||(o.top=o.hasOwnProperty("top")?o.top:100,o.style=o.style||"",o.style+=" top:"+(t.body.scrollTop+o.top)+"px"),2===o.type&&(o.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(o.content||"")+"</p>"),o.skin&&(o.anim="up"),"msg"===o.skin&&(o.shade=!1),a.innerHTML=(o.shade?"<div "+("string"==typeof o.shade?'style="'+o.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(o.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(o.skin?"layui-m-layer-"+o.skin+" ":"")+(o.className?o.className:"")+" "+(o.anim?"layui-m-anim-"+o.anim:"")+'" '+(o.style?'style="'+o.style+'"':"")+">"+c+'<div class="layui-m-layercont">'+o.content+"</div>"+l+"</div></div></div>",!o.type||2===o.type){var u=t[n](s[0]+o.type);u.length>=1&&layer.close(u[0].getAttribute("index"))}document.body.appendChild(a);var d=e.elem=i("#"+e.id)[0];o.success&&o.success(d),e.index=r++,e.action(o,d)},c.prototype.action=function(e,t){var i=this;e.time&&(a.timer[i.index]=setTimeout(function(){layer.close(i.index)},1e3*e.time));var o=function(){0==this.getAttribute("type")?(e.no&&e.no(),layer.close(i.index)):e.yes?e.yes(i.index):layer.close(i.index)};if(e.btn)for(var r=t[n]("layui-m-layerbtn")[0].children,s=r.length,c=0;c<s;c++)a.touch(r[c],o);if(e.shade&&e.shadeClose){var l=t[n]("layui-m-layershade")[0];a.touch(l,function(){layer.close(i.index,e.end)})}e.end&&(a.end[i.index]=e.end)},e.layer={v:"2.0",index:r,open:function(e){return new c(e||{}).index},close:function(e){var n=i("#"+s[0]+e)[0];n&&(n.innerHTML="",t.body.removeChild(n),clearTimeout(a.timer[e]),delete a.timer[e],"function"==typeof a.end[e]&&a.end[e](),delete a.end[e])},closeAll:function(){for(var e=t[n](s[0]),i=0,o=e.length;i<o;i++)layer.close(0|e[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var e=document.scripts,t=e[e.length-1],n=t.src;n.substring(0,n.lastIndexOf("/")+1);t.getAttribute("merge")}()}(window);var loading1=null,str="",mapObj={},areaArr=[];$(function(){FastClick.attach(document.body);var e=window.location.href,t=GetQueryString("fromUrl"),n=document.referrer,i=n||t;getWxConfig(e,i),$("#getcode").on("click",function(){repTel()&&$ajax("/free/getSmsCode",{phone:$("#tel").val(),type:3},function(e){"1"===e.status?($("#getcode").attr("disabled","true").text("30s").addClass("get"),count(),layer.open({content:"验证码已发送，请注意查收",skin:"msg",time:2})):layer.open({content:e.errorMsg,skin:"msg",time:2})},function(e){layer.open({content:e.message,skin:"msg",time:2})})}),$(".m-popup-wrapper").on("click",function(){event.target==this&&hidden($(".res-suc"),function(e,t){$(".m-popup-wrapper").hide(),$(".res-suc").removeClass("fadeOutDown fadeInUp"),$(".res-suc")[0].removeEventListener(e,t,!1),document.body.removeEventListener("touchmove",handler,!1),document.body.removeEventListener("wheel",handler,!1)})}),$("#sub").on("click",function(){if(!repTel())return!1;var e=$("#code").val(),t=/^\d{4}$/;return""===e?(layer.open({content:"验证码不能为空",skin:"msg",time:2}),!1):t.test(e)?void $ajax("/statistics/getActivityFhNum",{type:3},function(t){"1"===t.status?($ajax("/free/saveFree",{smsCode:e,phone:$("#tel").val(),spuId:100,shareUserId:0,areaId:320104,type:3},function(e){"1"===e.status?($("#suc-pic").attr("src",e.result.picUrl),$("#suc-tit").text(e.result.title),$("#suc-use").attr("href",e.result.appUrl),$(".m-popup-wrapper").show(),$(".m-popup").removeClass("fadeOutDown fadeInUp").addClass("fadeInUp"),document.body.addEventListener("touchmove",handler,!1),document.body.addEventListener("wheel",handler,!1)):layer.open({content:e.errorMsg,skin:"msg",time:2})},function(e){layer.open({content:e.message,skin:"msg",time:2})}),layer.close(layer.open({type:2}))):(layer.close(layer.open({type:2})),layer.open({content:t.errorMsg,skin:"msg",time:2}))},function(e){layer.open({content:e.message,skin:"msg",time:2})}):(layer.open({content:"验证码错误",skin:"msg",time:2}),!1)})});