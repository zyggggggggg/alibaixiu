// 给表单添加提交事件
$('#userForm').on('submit', function() {
    var formData = $(this).serialize()
    // 发送请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        // 添加成功之后刷新页面
        success: function() {
            location.reload()
        },
        error: function() {
            alert('用户添加失败')
        }
    })
    // 阻止默认事件
    return false
})
// 上传头像的事件
$('#avatar').on('change', function() {
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉ajax不要解析请求参数
        processData: false,
        // 告诉ajax不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            console.log(response[0].avatar)
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        },
        error: function() {
            console.log('上传头像失败')
        }
    })
})