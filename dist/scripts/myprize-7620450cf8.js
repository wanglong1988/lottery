"use strict";function $ajax(e,t,n,i){e=config.host+e;var s=arguments[2]?arguments[2]:function(){},a=arguments[3]?arguments[3]:function(){};$.ajax({url:e,type:"POST",dataType:"json",data:t,success:function(e){s(e)},error:function(e){a(e)}})}function wxShareConfig(e,t,n,i){wx.config({debug:!1,appId:e,timestamp:t,nonceStr:n,signature:i,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone","hideMenuItems"]}),wx.error(function(e){})}function updateShareTimes(){var e=JSON.parse(sessionStorage.getItem("accessinfo")).openid;alert(sessionStorage.getItem("accessinfo")+"-----"),$ajax("/share/updateShareCount",{openid:e},function(e){"1"==e.status||layer.open({content:e.errorMsg,skin:"msg",time:2})},function(){alert("分享失败")})}function wxShareReady(e,t,n,i){wx.ready(function(){wx.hideMenuItems({}),wx.onMenuShareTimeline({title:t,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}}),wx.onMenuShareAppMessage({title:t,desc:n,link:e,imgUrl:i,type:"link",dataUrl:"",success:function(e){updateShareTimes()},cancel:function(){}}),wx.onMenuShareQQ({title:t,desc:n,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:n,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}}),wx.onMenuShareWeibo({title:t,desc:n,link:e,imgUrl:i,success:function(){updateShareTimes()},cancel:function(){}})})}function GetQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t),i="";return null!=n&&(i=n[2]),t=null,n=null,null==i||""==i||"undefined"==i?"":i}var config={host:"http://activity-server.sanqimei.com",redirectUri:"http://activities.sanqimei.com/lottery/dist/index.html",timeout:5e3,shareLogo:"http://devstatic.sanqimei.com/images/products/7249538791512724953.jpg",shareTitle:"幸运双12，福利免费领",shareContent:"幸运双12，福利免费领！"},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){var t=document,n="getElementsByClassName",i=function(e){return t.querySelectorAll(e)},s={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},a={extend:function(e){var t=JSON.parse(JSON.stringify(s));for(var n in e)t[n]=e[n];return t},timer:{},end:{}};a.touch=function(e,t){e.addEventListener("click",function(e){t.call(this,e)},!1)};var o=0,r=["layui-m-layer"],c=function(e){var t=this;t.config=a.extend(e),t.view()};c.prototype.view=function(){var e=this,s=e.config,a=t.createElement("div");e.id=a.id=r[0]+o,a.setAttribute("class",r[0]+" "+r[0]+(s.type||0)),a.setAttribute("index",o);var c=function(){var e="object"===_typeof(s.title);return s.title?'<h3 style="'+(e?s.title[1]:"")+'">'+(e?s.title[0]:s.title)+"</h3>":""}(),l=function(){"string"==typeof s.btn&&(s.btn=[s.btn]);var e,t=(s.btn||[]).length;return 0!==t&&s.btn?(e='<span yes type="1">'+s.btn[0]+"</span>",2===t&&(e='<span no type="0">'+s.btn[1]+"</span>"+e),'<div class="layui-m-layerbtn">'+e+"</div>"):""}();if(s.fixed||(s.top=s.hasOwnProperty("top")?s.top:100,s.style=s.style||"",s.style+=" top:"+(t.body.scrollTop+s.top)+"px"),2===s.type&&(s.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(s.content||"")+"</p>"),s.skin&&(s.anim="up"),"msg"===s.skin&&(s.shade=!1),a.innerHTML=(s.shade?"<div "+("string"==typeof s.shade?'style="'+s.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(s.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(s.skin?"layui-m-layer-"+s.skin+" ":"")+(s.className?s.className:"")+" "+(s.anim?"layui-m-anim-"+s.anim:"")+'" '+(s.style?'style="'+s.style+'"':"")+">"+c+'<div class="layui-m-layercont">'+s.content+"</div>"+l+"</div></div></div>",!s.type||2===s.type){var u=t[n](r[0]+s.type);u.length>=1&&layer.close(u[0].getAttribute("index"))}document.body.appendChild(a);var d=e.elem=i("#"+e.id)[0];s.success&&s.success(d),e.index=o++,e.action(s,d)},c.prototype.action=function(e,t){var i=this;e.time&&(a.timer[i.index]=setTimeout(function(){layer.close(i.index)},1e3*e.time));var s=function(){0==this.getAttribute("type")?(e.no&&e.no(),layer.close(i.index)):e.yes?e.yes(i.index):layer.close(i.index)};if(e.btn)for(var o=t[n]("layui-m-layerbtn")[0].children,r=o.length,c=0;c<r;c++)a.touch(o[c],s);if(e.shade&&e.shadeClose){var l=t[n]("layui-m-layershade")[0];a.touch(l,function(){layer.close(i.index,e.end)})}e.end&&(a.end[i.index]=e.end)},e.layer={v:"2.0",index:o,open:function(e){return new c(e||{}).index},close:function(e){var n=i("#"+r[0]+e)[0];n&&(n.innerHTML="",t.body.removeChild(n),clearTimeout(a.timer[e]),delete a.timer[e],"function"==typeof a.end[e]&&a.end[e](),delete a.end[e])},closeAll:function(){for(var e=t[n](r[0]),i=0,s=e.length;i<s;i++)layer.close(0|e[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var e=document.scripts,t=e[e.length-1],n=t.src;n.substring(0,n.lastIndexOf("/")+1);t.getAttribute("merge")}()}(window);var loading1=null,str="",mapObj={};$(function(){FastClick.attach(document.body),$ajax("/lottery/getLotteryByOpenId",{type:1},function(e){if(e.result.length>0){$("#prize .price-empty").hide(),$("#prize .price-yes").show();var t=e.result.map(function(e){return"<li><img src="+e.picUrl+" alt="+e.title+' width="100%"></li>'});$("#prizeUl").html(t),layer.close(layer.open({type:2}))}else $("#prize .price-empty").show(),$("#prize .price-yes").hide()},function(e){layer.open({content:e.message,skin:"msg",time:2})})});