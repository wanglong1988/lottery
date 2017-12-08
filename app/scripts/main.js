var loading1 = null;
var str = '';
var mapObj={};


$(function(){
    FastClick.attach(document.body);

    //奖品列表
    $ajax('/lottery/getLotteryByOpenId',{type:1},function(res){
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

