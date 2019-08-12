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