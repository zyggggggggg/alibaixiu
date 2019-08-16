var id = getUrlParams('id');
if(id != -1) {
    // 如果id不为空，则是修改文章页面
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(response) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categories) {
                    console.log(response)
                    response.categories = categories
                    var html = template('editArtTpl', response)
                    $('#articleBox').html(html)
                }
            })
        }
    })
}else {
    // 查询所有的文章分类，并且渲染到页面中
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function(response) {
            var html = template('cateTpl', response)
            $('#category').html(html)
            // console.log(response)
        }
    })
}


// 点击选择文件触发事件
$('#feature').on('change', function() {
    var files = this.files[0]
    var formData = new FormData()
    formData.append('cover', files)
    $.ajax({
        type: 'post',
        url: '/upload',
        // 不要处理参数
        processData: false,
        // 不要设置参数类型
        contentType: false,
        data: formData,
        success: function(response) {
            $('#thumbnail').val(response[0].cover)
        }
    })
})

// 添加文章事件
$('#addForm').on('submit', function() {
    var formData = $(this).serialize()
    console.log(formData)
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(response) {
            location.href = 'posts.html'
        }
    })
    return false
})

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var arr = location.search.substr(1).split('&')
    for(var i = 0; i< arr.length; i++) {
        var params = arr[i].split('=')
        if(name == params[0]) {
            return params[1]
        }
    }
    return -1
}

// 修改文章提交功能
$('#articleBox').on('submit', '#editForm', function() {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    console.log(id)
    console.log(formData)
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function(response) {
            location.href = 'posts.html'
        }
    })
    return false
})