function setRewardList(){
    let infos = [{id:1, info:'恭喜15788889999抽中凤凰机器人免费课程'},{id:1, info:'恭喜15788889999抽中ofo小黄车'},{id:1, info:'恭喜15788889999抽中摩拜单车月卡'},
    {id:1, info:'恭喜15788889999抽中凤凰机器人免费课程5'},{id:1, info:'恭喜15788889999抽中ofo小黄车6'},{id:1, info:'恭喜15788889999抽中摩拜单车月卡7'}],
    timer

    let docf = document.createDocumentFragment()
    
    var reward_index = 0;

    for(let lii of infos){
        var li = document.createElement('li')
        li.textContent = lii.info
        $(docf).append(li)
    }
    $(docf).append('<li>'+infos[0].info+'</li>')

    $('.info-ul').append(docf)
}

function setRewardScroll(){
    let ulr = $('.info-ul')

    document.getElementsByClassName('info-ul')[0].addEventListener('transitionend', function(){
        if(reward_index >= infos.length){
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

function bindClick(){
    $('.circle-but').on('click', function(){
        $('body').append('  <div class="m-modal" ><div class="m-modal-container"><h3 class="s-header">恭喜您抽中</h3><div class="s-img"></div><div class="s-groups"><div class="s-groups-l s-g-base"><span>手机号</span><input id="phone" type="text" placeholder="填写手机号码" /></div><div class="s-groups-r s-g-base"><span>验证码</span><input id="code" type="text" placeholder="填写验证码" /><a>验证码</a></div></div><div class="s-but"><button id="submit-get" class="but-base">立即领取</button></div></div><div class="m-close"></div></div>')
        
        $('#submit-get').on('click', function(){

            let phone = $('#phone').val()
            let code = $('#code').val()

            if(!phone || !/^\d{11}$/.test(phone)){
                return layer.open({
                    content: '请输入正确手机号'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                  });
            }

            if(!code || !/^\d+$/.test(code)){
                 return layer.open({
                    content: '请输入有效验证码'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                  });
            }

        })

        $('.m-close').on('click', function(){
            $('.m-modal').remove()
        })
    })
}

bindClick()