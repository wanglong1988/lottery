"use strict";function $ajax(e,t,n,i){e=config.host+e,alert(e);var o=arguments[2]?arguments[2]:function(){},a=arguments[3]?arguments[3]:function(){};$.ajax({url:e,type:"POST",dataType:"json",data:t,success:function(e){o(e)},error:function(e){a(e)}})}function wxShareConfig(e,t,n,i){wx.config({debug:!1,appId:e,timestamp:t,nonceStr:n,signature:i,jsApiList:["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone","hideMenuItems"]}),wx.error(function(e){})}function wxShareReady(e,t,n,i){wx.ready(function(){wx.hideMenuItems({}),wx.onMenuShareTimeline({title:t,link:e,imgUrl:i,success:function(){alert("已分享到朋友圈")},cancel:function(){alert("已取消分享到朋友圈")}}),wx.onMenuShareAppMessage({title:t,desc:n,link:e,imgUrl:i,type:"link",dataUrl:"",success:function(){alert("分享到朋友"),alert(sessionStorage.getItem("accessinfo"))},cancel:function(){alert("已取消分享到朋友")}}),wx.onMenuShareQQ({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}}),wx.onMenuShareQZone({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}}),wx.onMenuShareWeibo({title:t,desc:n,link:e,imgUrl:i,success:function(){},cancel:function(){}})})}function GetQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t),i="";return null!=n&&(i=n[2]),t=null,n=null,null==i||""==i||"undefined"==i?"":i}var config={host:"http://activity-server.dev.sanqimei.com",redirectUri:"http://activities.dev.sanqimei.com/lottery/dist/index.html",timeout:5e3,shareLogo:"http://static.sanqimei.com/web/webapp/icon/show.png",shareTitle:"双重福利免费领",shareContent:"凤凰机器人联合37美放大招！双重福利免费领！"};FastClick.attach(document.body);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){var t=document,n="getElementsByClassName",i=function(e){return t.querySelectorAll(e)},o={type:0,shade:!0,shadeClose:!0,fixed:!0,anim:"scale"},a={extend:function(e){var t=JSON.parse(JSON.stringify(o));for(var n in e)t[n]=e[n];return t},timer:{},end:{}};a.touch=function(e,t){e.addEventListener("click",function(e){t.call(this,e)},!1)};var s=0,r=["layui-m-layer"],l=function(e){var t=this;t.config=a.extend(e),t.view()};l.prototype.view=function(){var e=this,o=e.config,a=t.createElement("div");e.id=a.id=r[0]+s,a.setAttribute("class",r[0]+" "+r[0]+(o.type||0)),a.setAttribute("index",s);var l=function(){var e="object"===_typeof(o.title);return o.title?'<h3 style="'+(e?o.title[1]:"")+'">'+(e?o.title[0]:o.title)+"</h3>":""}(),c=function(){"string"==typeof o.btn&&(o.btn=[o.btn]);var e,t=(o.btn||[]).length;return 0!==t&&o.btn?(e='<span yes type="1">'+o.btn[0]+"</span>",2===t&&(e='<span no type="0">'+o.btn[1]+"</span>"+e),'<div class="layui-m-layerbtn">'+e+"</div>"):""}();if(o.fixed||(o.top=o.hasOwnProperty("top")?o.top:100,o.style=o.style||"",o.style+=" top:"+(t.body.scrollTop+o.top)+"px"),2===o.type&&(o.content='<i></i><i class="layui-m-layerload"></i><i></i><p>'+(o.content||"")+"</p>"),o.skin&&(o.anim="up"),"msg"===o.skin&&(o.shade=!1),a.innerHTML=(o.shade?"<div "+("string"==typeof o.shade?'style="'+o.shade+'"':"")+' class="layui-m-layershade"></div>':"")+'<div class="layui-m-layermain" '+(o.fixed?"":'style="position:static;"')+'><div class="layui-m-layersection"><div class="layui-m-layerchild '+(o.skin?"layui-m-layer-"+o.skin+" ":"")+(o.className?o.className:"")+" "+(o.anim?"layui-m-anim-"+o.anim:"")+'" '+(o.style?'style="'+o.style+'"':"")+">"+l+'<div class="layui-m-layercont">'+o.content+"</div>"+c+"</div></div></div>",!o.type||2===o.type){var u=t[n](r[0]+o.type);u.length>=1&&layer.close(u[0].getAttribute("index"))}document.body.appendChild(a);var d=e.elem=i("#"+e.id)[0];o.success&&o.success(d),e.index=s++,e.action(o,d)},l.prototype.action=function(e,t){var i=this;e.time&&(a.timer[i.index]=setTimeout(function(){layer.close(i.index)},1e3*e.time));var o=function(){0==this.getAttribute("type")?(e.no&&e.no(),layer.close(i.index)):e.yes?e.yes(i.index):layer.close(i.index)};if(e.btn)for(var s=t[n]("layui-m-layerbtn")[0].children,r=s.length,l=0;l<r;l++)a.touch(s[l],o);if(e.shade&&e.shadeClose){var c=t[n]("layui-m-layershade")[0];a.touch(c,function(){layer.close(i.index,e.end)})}e.end&&(a.end[i.index]=e.end)},e.layer={v:"2.0",index:s,open:function(e){return new l(e||{}).index},close:function(e){var n=i("#"+r[0]+e)[0];n&&(n.innerHTML="",t.body.removeChild(n),clearTimeout(a.timer[e]),delete a.timer[e],"function"==typeof a.end[e]&&a.end[e](),delete a.end[e])},closeAll:function(){for(var e=t[n](r[0]),i=0,o=e.length;i<o;i++)layer.close(0|e[0].getAttribute("index"))}},"function"==typeof define?define(function(){return layer}):function(){var e=document.scripts,t=e[e.length-1],n=t.src;n.substring(0,n.lastIndexOf("/")+1);t.getAttribute("merge")}()}(window);var loading1=null,str="",mapObj={};$(function(){FastClick.attach(document.body),$ajax("/lottery/getLotteryByOpenId",{type:1},function(e){if(e.result.length>0){$("#prize .price-empty").hide(),$("#prize .price-yes").show();var t=e.result.map(function(e){return"<li><img src="+e.picUrl+" alt="+e.title+' width="100%"></li>'});$("#prizeUl").html(t),layer.close(layer.open({type:2}))}else $("#prize .price-empty").show(),$("#prize .price-yes").hide()},function(e){layer.open({content:e.message,skin:"msg",time:2})})});