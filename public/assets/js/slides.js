// 获取轮播图列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(response) {
        var html = template('slidesTpl', {data: response})
        $('#slidesBody').html(html)
    }
})

// 选择文件的事件
$('#image').on('change', function() {
    var files = this.files[0]
    var formData = new FormData()
    formData.append('image', files)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#uploadImg').val( response[0].image)
        }
    })
})
// 添加轮播图事件
$('#sildeAddForm').on('submit', function() {
    var formData = $(this).serialize()
    console.log(formData)
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(response) {
            location.reload()
        }
    })
    return false
})

// 删除轮播图事件
$('#slidesBody').on('click', '.delete', function() {
    var id = $(this).attr('data-id')
    if(confirm('您确定要删除吗？')){
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function(response) {
                location.reload()
            }
        })
    }
})