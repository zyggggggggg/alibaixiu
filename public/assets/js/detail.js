var id = getUrlParams('id')

$.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function(response) {
        var html = template('detailTpl', response)
        $('#articleBox').html(html)
    }
})

// 点赞按钮点击事件
$('#articleBox').on('click', '#like', function() {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function(response) {
            alert('点赞成功')
        }
    })
})

// 获取网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        console.log(response)
        if(response.comment) {
            // 管理员开启了评论功能
            var html = template('commentTpl')
            $('#comment').html(html);
        }
    }
})

// 提交评论
$('#comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val()
    console.log(content)
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            author: userId,
            content: content,
            post: id
        },
        success: function() {
            alert('添加成功')
        },
        error: function() {
            alert('添加失败')
        }
    })
    return false
})