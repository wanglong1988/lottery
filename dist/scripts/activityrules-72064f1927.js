"use strict";function $ajax(e,t,n,i){e=config.host+e;var a=arguments[2]?arguments[2]:function(){};arguments[3]&&arguments[3];$.ajax({url:e,type:"POST",dataType:"json",data:t,timeout:500,success:function(e){a(e)},error:function(e,t,n){alert(t+"---")}})}function wxShareConfig(e,t,n,i){wx.config({debug:!1,appId:e,timestamp:t,nonceStr:n,signature:i,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone"]}),wx.error(function(e){})}function updateShareTimes(){var e=JSON.parse(sessionStorage.getItem("accessinfo")).openid;alert(sessionStorage.getItem("accessinfo")+"-----info"),$ajax("/share/updateShareCount",{openid:e},function(e){"1"==e.status||layer.open({content:e.errorMsg,skin:"msg",time:2})},function(){alert("分享失败")})}function wxShareReady(e,t,n,i){wx.ready(function(){wx.onMenuShareTimeline({title:t,link:e,imgUrl:i,success:function(e){alert("pqcg")},cancel:function(e){alert("pqsb")}}),wx.onMenuShareAppMessage({title:t,desc:n,link:e,imgUrl:i,type:"link",dataUrl:"",success:function(e){alert("fengxiangpengyou")},cancel:function(){alert("shibai")}}),wx.onMenuShareQQ({title:t,desc:n,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:n,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}}),wx.onMenuShareWeibo({title:t,desc:n,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}})})}function GetQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t),i="";return null!=n&&(i=n[2]),t=null,n=null,null==i||""==i||"undefined"==i?"":i}var config={host:"http://activity-server.test.sanqimei.com",redirectUri:"http://activities.sanqimei.com/lottery/dist/index.html",timeout:5e3,shareLogo:"http://static.sanqimei.com/activity/12/two_12.png",shareTitle:"幸运双12，福利免费领",shareContent:"幸运双12，福利免费领！"},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){var t=document,n="getElementsByClassName",i=function(e){return t.querySelectorAll(e)},a={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},o={extend:function(e){var t=JSON.parse(JSON.stringify(a));for(var n in e)t[n]=e[n];return t},timer:{},end:{}};o.touch=function(e,t){e.addEventListener("click",function(e){t.call(this,e)},!1)};var s=0,r=["layui-m-layer"],c=function(e){var t=this;t.config=o.extend(e),t.view()};c.prototype.view=function(){var e=this,a=e.config,o=t.createElement("div");e.id=o.id=r[0]+s,o.setAttribute("class",r[0]+" "+r[0]+(a.type||0)),o.setAttribute("index",s);var c=function(){var e="object"===_typeof(a.title);return a.title?'<h3 style="'+(e?a.title[1]:"")+'">'+(e?a.title[0]:a.title)+"</h3>":""}(),l=function(){"string"==typeof a.btn&&(a.btn=[a.btn]);var e,t=(a.btn||[]).length;return 0!==t&&a.btn?(e='<span yes type="1">'+a.btn[0]+"</span>",2===t&&(e='<span no type="0">'+a.btn[1]+"</span>"+e),'<div class="layui-m-layerbtn">'+e+"</div>"):""}();if(a.fixed||(a.top=a.hasOwnProperty("top")?a.top:100,a.style=a.style||"",a.style+=" top:"+(t.body.scrollTop+a.top)+"px"),2===a.type&&(a.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(a.content||"")+"</p>"),a.skin&&(a.anim="up"),"msg"===a.skin&&(a.shade=!1),o.innerHTML=(a.shade?"<div "+("string"==typeof a.shade?'style="'+a.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(a.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(a.skin?"layui-m-layer-"+a.skin+" ":"")+(a.className?a.className:"")+" "+(a.anim?"layui-m-anim-"+a.anim:"")+'" '+(a.style?'style="'+a.style+'"':"")+">"+c+'<div class="layui-m-layercont">'+a.content+"</div>"+l+"</div></div></div>",!a.type||2===a.type){var u=t[n](r[0]+a.type);u.length>=1&&layer.close(u[0].getAttribute("index"))}document.body.appendChild(o);var d=e.elem=i("#"+e.id)[0];a.success&&a.success(d),e.index=s++,e.action(a,d)},c.prototype.action=function(e,t){var i=this;e.time&&(o.timer[i.index]=setTimeout(function(){layer.close(i.index)},1e3*e.time));var a=function(){0==this.getAttribute("type")?(e.no&&e.no(),layer.close(i.index)):e.yes?e.yes(i.index):layer.close(i.index)};if(e.btn)for(var s=t[n]("layui-m-layerbtn")[0].children,r=s.length,c=0;c<r;c++)o.touch(s[c],a);if(e.shade&&e.shadeClose){var l=t[n]("layui-m-layershade")[0];o.touch(l,function(){layer.close(i.index,e.end)})}e.end&&(o.end[i.index]=e.end)},e.layer={v:"2.0",index:s,open:function(e){return new c(e||{}).index},close:function(e){var n=i("#"+r[0]+e)[0];n&&(n.innerHTML="",t.body.removeChild(n),clearTimeout(o.timer[e]),delete o.timer[e],"function"==typeof o.end[e]&&o.end[e](),delete o.end[e])},closeAll:function(){for(var e=t[n](r[0]),i=0,a=e.length;i<a;i++)layer.close(0|e[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var e=document.scripts,t=e[e.length-1],n=t.src;n.substring(0,n.lastIndexOf("/")+1);t.getAttribute("merge")}()}(window);