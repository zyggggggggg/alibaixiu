
// 查询所有的轮播图，并渲染到页面中
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        // console.log(response)
        var html = template('slideTpl', {data: response})
        $('#slidesBox').html(html)
        //
        var swiper = Swipe(document.querySelector('.swipe'), {
        auto: 3000,
        transitionEnd: function (index) {
          // index++;
  
          $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
        }
      });
  
      // 上/下一张
      $('.swipe .arrow').on('click', function () {
        var _this = $(this);
  
        if(_this.is('.prev')) {
          swiper.prev();
        } else if(_this.is('.next')) {
          swiper.next();
        }
      })
    }
})

$.ajax({
    type: 'get',
    url: '/posts/lasted',
    success: function(response) {
        // console.log(response)
        var html = template('newTpl', { data: response})
        $('#newBox').html(html)
    }
})

