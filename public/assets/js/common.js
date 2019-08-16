// 给退出按钮添加点击事件
$('#logout').on('click', function() {
    if( confirm('确定要退出吗？') ){
      $.ajax({
        url: '/logout',
        type: 'post',
        success: function(data) {
          location.href = 'login.html'
        },
        error: function(){
          alert('退出失败')
        }
      })
    }
  })

  // 向服务器发送请求，查询当前用户的的登录信息
  $.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
      console.log(response)
      $('.avatar').prop('src', response.avatar)
      $('.name').html(response.nickName)
    }
  })