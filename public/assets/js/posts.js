// 页面一刷新就把文章列表渲染到页面中
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        var html = template('postsTpl', {data: response.records})
        $('#postsBody').html(html)
        var pageHtml = template('pageTpl', response)
        $('#page').html(pageHtml)
    }
})
// 渲染文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('cateTpl', {data: response})
        $('#postCate').html(html)
    }
})
// 处理日期时间格式
function formateDate(date) {
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
// 切换页码方法
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data:{
            page: page
        },
        success: function(response) {
            var html = template('postsTpl', {data: response.records})
            $('#postsBody').html(html)
            var pageHtml = template('pageTpl', response)
            $('#page').html(pageHtml)
        }
    })
}

// 文章列表筛选功能
$('#filterForm').on('submit', function() {
    var formData = $(this).serialize()
    console.log(formData)
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(response) {
            console.log(response)
            var html = template('postsTpl', {data: response.records})
            $('#postsBody').html(html)
            var pageHtml = template('pageTpl', response)
            $('#page').html(pageHtml)
        }
    })
    return false
})
// 删除文章功能
$('#postsBody').on('click', '.delete', function() {
    var id = $(this).attr('data-id')
    if(confirm('确认要删除该文章吗？'))
    $.ajax({
        type: 'delete',
        url: '/posts/' + id,
        success: function(response) {
            console.log(response)
            location.reload()
        }
    })
})
