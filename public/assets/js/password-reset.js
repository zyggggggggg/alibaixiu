// 当修改密码表单发生提交行为的时候
$('#modifyPwdForm').on('submit', function() {
    var formData = $(this).serialize()
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function(response) {
           setTimeout(function() {
                location.href = 'login.html'
           },1000)
        }
    })
    return false
})