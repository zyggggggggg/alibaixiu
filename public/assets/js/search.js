var key = getUrlParams('key')

// 根据关键字查询文章
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function(response) {
        console.log(response)
        var html = template('listTpl', {data: response})
        $('#listBox').html(html)
    }
})