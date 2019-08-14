// 页面加载时把数据库的数据渲染到页面上
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response){
        var html = template('categoryTpl', {data: response})
        $('#categpryBody').html(html)
    }
})

// 给添加分类的表单添加提交事件
$('#addCategory').on('submit', function() {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(response) {
            location.reload()
        }
    })
    return false
})

// 给编辑按钮添加点击事件
$('#categpryBody').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            var html = template('editTpl', response)
            $('#editInfo').html(html)
        }
    })
})

// 编辑按钮提交事件
$('#editInfo').on('submit', '#editForm', function() {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    console.log(formData)
    console.log(id)
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(response) {
            location.reload()
        }
    })
    return false
})

// 给删除按钮添加点击事件
$('#categpryBody').on('click', '.delete', function() {
    var id = $(this).attr('data-id')
    if(confirm('确认要删除吗？')){
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function(response) {
               location.reload()
            }
        })
    }
})

// 全选框状态发生改变事件
$('#cateCheck').on('change', function() {
    var checked = $(this).prop('checked')
    var inputs = $('#categpryBody').find('input')
    inputs.each(function(index, item) {
        $(item).prop('checked', checked)
    })
})

// 给表格里面的复选框添加改变事件
$('#categpryBody').on('change', 'input', function() {
    var inputs = $('#categpryBody').find('input')
    var checks = inputs.filter(':checked')
    if(inputs.length == checks.length) {
        $('#cateCheck').prop('checked', true)
    }else {
        $('#cateCheck').prop('checked', false)
    }
})