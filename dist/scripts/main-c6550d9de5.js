"use strict";function wxShareConfig(e,t,n,i){wx.config({debug:!1,appId:e,timestamp:t,nonceStr:n,signature:i,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone","hideMenuItems"]}),wx.error(function(e){})}function wxShareReady(e,t,n,i){wx.ready(function(){wx.hideMenuItems({}),wx.onMenuShareTimeline({title:t,link:e,imgUrl:i,success:function(){alert("已分享到朋友圈")},cancel:function(){alert("已取消分享到朋友圈")}}),wx.onMenuShareAppMessage({title:t,desc:n,link:e,imgUrl:i,type:"link",dataUrl:"",success:function(){alert("已分享到朋友")},cancel:function(){alert("已取消分享到朋友")}}),wx.onMenuShareQQ({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}}),wx.onMenuShareWeibo({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}})})}function GetQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t),i="";return null!=n&&(i=n[2]),t=null,n=null,null==i||""==i||"undefined"==i?"":i}function $ajax(e,t,n,i){e=config.host+e;var o=arguments[2]?arguments[2]:function(){},s=arguments[3]?arguments[3]:function(){};$.ajax({url:e,type:"POST",dataType:"json",data:t,success:function(e){o(e)},error:function(e){s(e)}})}function getWxConfig(e,t){$ajax("/free/getWeChatInfo",{url:e},function(e){if("1"===e.status){var n=e.result;if(GetQueryString("code")){$ajax("/oauth/getAccessToken",{code:GetQueryString("code")},function(e){e.errorCode||sessionStorage.setItem("accessinfo",JSON.stringify(e))},function(e){layer.open({content:"服务器异常",skin:"msg",time:2})})}else window.location.href="https://activities.sanqimei.com/get-weixin-code.html?appid="+n.appId+"&redirect_uri="+encodeURIComponent(config.redirectUri)+"&scope=snsapi_userinfo&connect_redirect=1";wxShareConfig(n.appId,n.timestamp,n.nonceStr,n.signature),wxShareReady(t,config.shareTitle,config.shareContent,config.shareLogo)}})}var config={host:"http://activity-server.dev.sanqimei.com",redirectUri:"http://activity.dev.sanqimei.com/lottery12/index.html",timeout:5e3,shareLogo:"http://static.sanqimei.com/web/webapp/icon/show.png",shareTitle:"双重福利免费领",shareContent:"凤凰机器人联合37美放大招！双重福利免费领！"},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){var t=document,n="getElementsByClassName",i=function(e){return t.querySelectorAll(e)},o={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},s={extend:function(e){var t=JSON.parse(JSON.stringify(o));for(var n in e)t[n]=e[n];return t},timer:{},end:{}};s.touch=function(e,t){e.addEventListener("click",function(e){t.call(this,e)},!1)};var r=0,a=["layui-m-layer"],c=function(e){var t=this;t.config=s.extend(e),t.view()};c.prototype.view=function(){var e=this,o=e.config,s=t.createElement("div");e.id=s.id=a[0]+r,s.setAttribute("class",a[0]+" "+a[0]+(o.type||0)),s.setAttribute("index",r);var c=function(){var e="object"===_typeof(o.title);return o.title?'<h3 style="'+(e?o.title[1]:"")+'">'+(e?o.title[0]:o.title)+"</h3>":""}(),l=function(){"string"==typeof o.btn&&(o.btn=[o.btn]);var e,t=(o.btn||[]).length;return 0!==t&&o.btn?(e='<span yes type="1">'+o.btn[0]+"</span>",2===t&&(e='<span no type="0">'+o.btn[1]+"</span>"+e),'<div class="layui-m-layerbtn">'+e+"</div>"):""}();if(o.fixed||(o.top=o.hasOwnProperty("top")?o.top:100,o.style=o.style||"",o.style+=" top:"+(t.body.scrollTop+o.top)+"px"),2===o.type&&(o.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(o.content||"")+"</p>"),o.skin&&(o.anim="up"),"msg"===o.skin&&(o.shade=!1),s.innerHTML=(o.shade?"<div "+("string"==typeof o.shade?'style="'+o.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(o.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(o.skin?"layui-m-layer-"+o.skin+" ":"")+(o.className?o.className:"")+" "+(o.anim?"layui-m-anim-"+o.anim:"")+'" '+(o.style?'style="'+o.style+'"':"")+">"+c+'<div class="layui-m-layercont">'+o.content+"</div>"+l+"</div></div></div>",!o.type||2===o.type){var u=t[n](a[0]+o.type);u.length>=1&&layer.close(u[0].getAttribute("index"))}document.body.appendChild(s);var d=e.elem=i("#"+e.id)[0];o.success&&o.success(d),e.index=r++,e.action(o,d)},c.prototype.action=function(e,t){var i=this;e.time&&(s.timer[i.index]=setTimeout(function(){layer.close(i.index)},1e3*e.time));var o=function(){0==this.getAttribute("type")?(e.no&&e.no(),layer.close(i.index)):e.yes?e.yes(i.index):layer.close(i.index)};if(e.btn)for(var r=t[n]("layui-m-layerbtn")[0].children,a=r.length,c=0;c<a;c++)s.touch(r[c],o);if(e.shade&&e.shadeClose){var l=t[n]("layui-m-layershade")[0];s.touch(l,function(){layer.close(i.index,e.end)})}e.end&&(s.end[i.index]=e.end)},e.layer={v:"2.0",index:r,open:function(e){return new c(e||{}).index},close:function(e){var n=i("#"+a[0]+e)[0];n&&(n.innerHTML="",t.body.removeChild(n),clearTimeout(s.timer[e]),delete s.timer[e],"function"==typeof s.end[e]&&s.end[e](),delete s.end[e])},closeAll:function(){for(var e=t[n](a[0]),i=0,o=e.length;i<o;i++)layer.close(0|e[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var e=document.scripts,t=e[e.length-1],n=t.src;n.substring(0,n.lastIndexOf("/")+1);t.getAttribute("merge")}()}(window);var loading1=null,str="",mapObj={};$(function(){FastClick.attach(document.body);var e=window.location.href;getWxConfig(e,e),$ajax("/free/listFreeProduct",{type:1},function(e){if(e.result.length>0){$("#prize .price-empty").hide(),$("#prize .price-yes").show();var t=e.result.map(function(e){return"<li><img src="+e.picUrl+" alt="+e.title+' width="100%"></li>'});$("#prizeUl").html(t),layer.close(layer.open({type:2}))}else $("#prize .price-empty").show(),$("#prize .price-yes").hide()},function(e){layer.open({content:e.message,skin:"msg",time:2})})}),function(){function e(){$ajax("/lottery/getRedisLotteryId",{},function(e){if("1"==e.status){var i=new Date;new Date(e.result.startTime)<i<new Date(e.result.endTime)?t(n):$("#weikaishi").css({display:"block"})}},function(){layer.open({content:"服务器异常",skin:"msg",time:2})})}function t(e){$ajax("/lottery/getluckyUser",{},function(t){if("1"==t.status){d=t.result;var n=document.createDocumentFragment(),i=!0,o=!1,s=void 0;try{for(var r,a=d[Symbol.iterator]();!(i=(r=a.next()).done);i=!0){var c=r.value,l=document.createElement("li");l.textContent=c.info,$(n).append(l)}}catch(e){o=!0,s=e}finally{try{!i&&a.return&&a.return()}finally{if(o)throw s}}d[0]&&$(n).append("<li>"+d[0].info+"</li>"),$(".info-ul").append(n),e()}else layer.open({content:t.errorMsg,skin:"msg",time:2})})}function n(){var e=$(".info-ul"),t=0;document.getElementsByClassName("info-ul")[0].addEventListener("transitionend",function(){t>=d.length&&(t=0,e.css({transition:"none",transform:"translate3d(0,0,0)"}))}),setInterval(function(){t+=1,e.css({transition:"transform .8s",transform:"translate3d(0,-"+14*t+"px,0)"})},3e3)}function i(e){$(".circle-but").on("click",function(){r()})}function o(e){layer.open({content:e.errorMsg,skin:"msg",time:2})}function s(e){arguments.length>1&&void 0!==arguments[1]&&!arguments[1]?$("#"+e).css({display:"block"}):setTimeout(function(){$("#"+e).css({display:"block"})},5e3)}function r(){"none"!=$("#zp").css("transition")&&$("#zp").css({transition:"none",transform:"rotate(0deg)"});var e=JSON.parse(sessionStorage.getItem("accessinfo")),t=e.access_token;$ajax("/lottery/luckyGo",{openid:e.openid,wxToken:t,lotteryId:1},function(e){"1"==e.status?($("#zp").css({transition:"transform 5s",transform:"rotate("+(360*f+Number(p[e.result.code]))+"deg)"}),"100"==e.result.code?s("weichouzhong"):setTimeout(function(){a(e)},5e3)):"4444"==e.errorCode?s("chouyici",!1):o(e)})}function a(e){var t="images/ofo.png";e.result.picUrl&&(t=e.result.picUrl),$("body").append('  <div class="m-modal" id="zhongj" ><div class="m-modal-container"><h3 class="s-header">恭喜您抽中</h3><div class="s-img"><img src='+t+'> </div><div class="s-groups"><div class="s-groups-l s-g-base"><span>手机号</span><input id="phone" type="number" placeholder="填写手机号码" /></div><div class="s-groups-r s-g-base"><span>验证码</span><input id="code" type="number" placeholder="填写验证码" /><a id="getcode">验证码</a></div></div><div class="s-but"><button id="submit-get" class="but-base">立即领取</button></div><div id="zhongjclose" class="m-close"></div></div></div>'),$("#getcode").on("click",function(){c()&&$ajax("/lottery/sendMessage",{phone:$("#phone").val(),lotteryToken:e.result.userToken},function(e){"1"===e.status?($("#getcode").attr("disabled","true").text("30s").addClass("get"),u(),layer.open({content:"验证码已发送，请注意查收",skin:"msg",time:2})):layer.open({content:"asdf",skin:"msg",time:2})},function(e){layer.open({content:"服务器异常",skin:"msg",time:2})})}),$("#submit-get").on("click",function(){var n=$("#phone").val(),i=$("#code").val(),s=e.result.userToken;return n&&/^\d{11}$/.test(n)?i&&/^\d+$/.test(i)?void $ajax("/lottery/updatelottery",{smsCode:i,phone:n,loteryToken:s},function(e){"1"==e.status?($("#zhongj").remove(),$("#cgimg").attr("src",t),$("#lingqucg").css({display:"block"})):o(e)}):layer.open({content:"请输入有效验证码",skin:"msg",time:2}):layer.open({content:"请输入正确手机号",skin:"msg",time:2})}),$("#zhongjclose").on("click",function(){$("#zhongj").remove()})}function c(){var e=/^1[3|4|5|7|8][0-9]\d{8}$/,t=$("#phone").val();return""===t?(layer.open({content:"手机号不能为空",skin:"msg",time:2}),!1):(e.test(t)||layer.open({content:"手机号错误",skin:"msg",time:2}),e.test(t))}function l(e){return e<10?"0"+e:e}function u(){var e=$("#getcode").text(),t=parseInt(e),n=setInterval(function(){if(t<=0)return clearInterval(n),void $("#getcode").removeAttr("disabled").text("验证码").removeClass("get");t--,$("#getcode").text(l(t)+"s").addClass("get")},1e3)}var d=[],f=8,p={100:360,1:135,2:45,3:225,4:180,5:315,6:270,7:90};!function(){e(),i()}()}();