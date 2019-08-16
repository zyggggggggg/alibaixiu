
// 选择图标时触发的事件
$('#logo').on('change', function() {
    var files = this.files[0]
    var formData = new FormData()
    formData.append('logo', files)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response)
            $('#logoImg').prop('src', response[0].logo)
            $('#site_logo').val(response[0].logo)
        }
    })
})
$('#comment_status').on('change', function() {
    var check = $(this).prop('checked')
    $(this).val(check)
})
$('#comment_reviewed').on('change', function() {
    var check = $(this).prop('checked')
    $(this).val(check)
})
// 添加网站配置事件
$('#addSettings').on('submit', function() {
    var formData = $(this).serialize()
    console.log(formData)
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(response) {
            location.reload()
        }
    })
    return false
})

// 显示网站设置数据
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        $('#logoImg').prop('src', response.logo)
        $('#hiddenLogo').val(response.logo)
        $('#site_name').val(response.title)
        $('#comment_status').prop('checked', response.comment)
        $('#comment_reviewed').prop('checked', response.review)
    }
})