var categoryid = getUrlParams('id')

// 根据分类查询文章列表
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryid,
    success: function(response) {
        console.log(response)
        var html = template('listTpl', {data: response})
        $('#listBox').html(html)
    }
})

// 根据id查询分类名称
$.ajax({
    type: 'get',
    url: '/categories/' + categoryid,
    success: function(response) {
        $('#categoryTitle').html(response.title)
    }
})

