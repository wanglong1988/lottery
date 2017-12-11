function circ() {

  if(GetQueryString('state') == '1'){

  let infos = [],
    isScrolling = false,
    codeTimer, // 验证码计时器
    initNum = 8,
    keyMaps = {
      '100': 225, //谢谢惠顾 多加一圈
      '1': 360, //宝力豪健身月卡
      '2': 270, //小黄车ofo免费月卡
      '3': 90, //凤凰机器人免费课程
      '4': 45, //美丽心情蛋糕优惠券
      '5': 180, //面膜
      '6': 135, // 醒眼spa 加90度
      '7': 315 //清洁泡泡
    };




  currentLottery()
  bindCircleScroll()
  
  // 获取当前活动信息 是否过期
  function currentLottery() {
    let url = '/lottery/getRedisLotteryId'
    $ajax(url, {lotteryId: 1}, function (res) {
      if (res.status == '1') {
        // let cur = new Date();
        // new Date(res.result.startTime) < cur && cur < new Date(res.result.endTime)
        if (res.result.useful) {
          setRewardList(setRewardScroll)
        } else {
          $('#weikaishi').css({
            display: 'block'
          })
        }
      } 
    }, function (res) {
      layer.open({
        content: '获取活动信息异常',
        skin: 'msg',
        time: 2
      });
    })
  }

  // 获取中奖名单
  function setRewardList(cb) {
    $ajax('/lottery/getluckyUser', {lotteryId: 1}, function (res) {
      if (res.status == '1') {
        infos = res.result

        let docf = document.createDocumentFragment()
        for (let lii of infos) {
          var li = document.createElement('li')
          li.textContent = lii.title
          $(docf).append(li)
        }
        infos[0] && $(docf).append('<li>' + infos[0].title + '</li>')

        $('.info-ul').append(docf)

        cb()

      } else {
        layer.open({
          content: res.errorMsg,
          skin: 'msg',
          time: 2
        });
      }
    })
  }

  //设置名单滚动
  function setRewardScroll() {
    let ulr = $('.info-ul'),
      timer,
      reward_index = 0;
    document.getElementsByClassName('info-ul')[0].addEventListener('transitionend', function () {
      if (reward_index >= infos.length) {
        reward_index = 0
        ulr.css({
          transition: 'none',
          transform: 'translate3d(0,0,0)'
        })
      }
    })
    timer = setInterval(function () {
      reward_index += 1
      ulr.css({
        transition: 'transform .8s',
        transform: `translate3d(0,-${reward_index * 14}px,0)`
      })
    }, 3000)
  }

  function bindCircleScroll(cb) {
    $('.circle-but').on('click', function () {
      if(!isScrolling){
        circleScroll()
      }
    })
  }

  function alertError(res) {
    layer.open({
      content: res.errorMsg,
      skin: 'msg',
      time: 2
    });
  }

  function timeoutBlock(id, isDelay = true) {
    if (isDelay) {
      setTimeout(function () {
        $('#' + id).css({
          display: 'block'
        })
        isScrolling = false
      }, 5000)
    } else {
      $('#' + id).css({
        display: 'block'
      })
    }
  }

  // 开始抽奖 转盘
  function circleScroll() {
    isScrolling = true
    let url = '/lottery/luckyGo'

    if ($('#zp').css('transition') != 'none') {
      $('#zp').css({
        transition: 'none',
        transform: 'rotate(0deg)'
      })
    }

    let {
      access_token,
      openid
    } = JSON.parse(sessionStorage.getItem('accessinfo'))

    let layIndex = layer.open({type: 2})

    $ajax(url, {
      openid,
      wxToken: access_token,
      lotteryId: 1
    }, function (res) {
      if (res.status == '1') {
        layer.close(layIndex)
        $('#zp').css({
          transition: 'transform 5s',
          transform: `rotate(${initNum*360 + Number(keyMaps[res.result.code])}deg)`
          // transform: `rotate(${Number(keyMaps[res.result.code])}deg)`
        })
        if (res.result.code == '100') {
          timeoutBlock('weichouzhong')
        } else {
          setTimeout(function () {

            if(res.result.autoPhone == 'true'){
              setTimeout(function (){
                getSuccess(res)
              }, 500)
            }else{
              circleSuccess(res)
            }
            isScrolling = false
          }, 5000)
        }
      } else {
        isScrolling = false
        layer.close(layIndex)
        switch(res.errorCode){
          case '4444':
            timeoutBlock('chouyici', false);
            break;
          case '2222':
            timeoutBlock('chousanci', false);
            break;
          case '1111':
            timeoutBlock('weikaishi', false);
            break;
          case '8888':
            timeoutBlock('weikaishi', false);
            break;
          case '9999':
            timeoutBlock('weikaishi', false);
            break;
          default:
            alertError(res)
        }
        // if (res.errorCode == '4444') {
        //   timeoutBlock('chouyici', false)
        // } else if(res.errorCode == '2222'){
        //   timeoutBlock('chousanci', false)
        // } else{
        //   alertError(res)
        // }
      }

    }, function(){
      layer.open({
        content: '服务器异常',
        skin: 'msg',
        time: 2
      });
    })
  }

  // 领取成功
  function getSuccess(res){
    $('#cgimg').attr('src', res.result.picUrl)
    $('#lingqucg').css({
      display: 'block'
    })
    $('#lingqucg').on('click', function () {
      $('#lingqucg').css({display: 'none'});
    })
  }
  // 抽中
  function circleSuccess(result) {
    let src = 'images/ofo.png'
    result.result.picUrl && (src = result.result.picUrl)
    $('body').append(`  <div class="m-modal" id="zhongj" ><div class="m-modal-container m-modal-container-bkg"><h3 class="s-header">恭喜您抽中</h3><div class="s-img"><img src=${src}> </div><div class="s-groups"><div class="s-groups-l s-g-base"><span>手机号</span><input id="phone" type="number" placeholder="填写手机号码" /></div><div class="s-groups-r s-g-base"><span>验证码</span><input id="code" type="number" placeholder="填写验证码" /><a id="getcode">验证码</a></div></div><div class="s-but"><button id="submit-get" class="but-base">立即领取</button></div><div id="zhongjclose" class="m-close"></div></div></div>`)

    $('#phone').focus()

    $('#getcode').on('click', function () {
      if (repTel()) {
        $ajax('/lottery/sendMessage', {
          phone: $('#phone').val(),
          lotteryToken: result.result.userToken
        }, function (res) {
          if (res.status === '1') {
            $('#getcode').attr('disabled', 'true').text('30s').addClass('get')
            count();
            layer.open({
              content: '验证码已发送，请注意查收',
              skin: 'msg',
              time: 2
            });
          } else {
            layer.open({
              content: res.errorMsg,
              skin: 'msg',
              time: 2
            });
          }
        }, function (e) {
          layer.open({
            content: '发送验证码异常',
            skin: 'msg',
            time: 2
          });
        })
      }
    })

    $('#submit-get').on('click', function () {
      let url = '/lottery/updatelottery'

      let phone = $('#phone').val(),
        code = $('#code').val(),
        userToken = result.result.userToken

      if (!phone || !/^\d{11}$/.test(phone)) {
        return layer.open({
          content: '请输入正确手机号',
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
      }

      if (!code || !/^\d+$/.test(code)) {
        return layer.open({
          content: '请输入有效验证码',
          skin: 'msg',
          time: 2 //2秒后自动关闭
        });
      }

      $ajax(url, {
        smsCode: code,
        phone,
        lotteryToken: userToken
      }, function (res) {
        console.log(res)
        if (res.status == '1') {
          $('#zhongj').remove()
          $('#cgimg').attr('src', src)
          $('#lingqucg').css({
            display: 'block'
          })
          $('#lingqucg').on('click', function () {
            $('#lingqucg').css({display: 'none'});
            clearInterval(codeTimer)
          })
        } else {
          alertError(res)
        }
      })

    })

    $('#zhongjclose').on('click', function () {
      $('#zhongj').remove()
      clearInterval(codeTimer)
    })
  }


  function repTel() {
    var rep = /^1[3|4|5|7|8][0-9]\d{8}$/;
    var telStr = $('#phone').val();
    if (telStr === '') {
      layer.open({
        content: '手机号不能为空',
        skin: 'msg',
        time: 2
      });
      return false
    } else {
      if (!rep.test(telStr)) {
        layer.open({
          content: '手机号错误',
          skin: 'msg',
          time: 2
        });
      }
      return rep.test(telStr)
    }
  }

  function addZero(num) {
    return num < 10 ? '0' + num : num
  }

  function count() {
    console.log('count')
    var str = $('#getcode').text();
    var num = parseInt(str);
    codeTimer = setInterval(function () {
      if (num <= 0) {
        clearInterval(codeTimer);
        $('#getcode').removeAttr('disabled').text('验证码').removeClass('get')
        return
      }
      num--;
      $('#getcode').text(addZero(num) + 's').addClass('get')
    }, 1000)
  }
}

}
