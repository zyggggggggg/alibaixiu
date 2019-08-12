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
$('#modifyBox').on('change', '#avatar', function() {
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
// 从数据库中查询数据渲染到页面中
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        var html = template('userTpl', {data: response})
        $('#userTbody').html(html)
    }
})
// 为编辑按钮添加点击事件
$('#userTbody').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            var html = template('modifyTpl', response)
            $('#modifyBox').html(html)
        }
    })
})
// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            location.reload()
        },
        error: function() {
            alert('用户修改错误')
        }
    })
})
// 删除用户功能
$('#userTbody').on('click', '.delete', function() {
    if(confirm('确认要删除吗？')){
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function(response) {
                console.log(response)
                location.reload()
            }
        })
    }
})
// 批量删除功能
// 获取全选按钮
var selectAll = $('#selectAll')
// 获取批量删除按钮
var batch = $('#batch')
// 当全选按钮的状态改变时
selectAll.on('change', function() {
    // 获取全选按钮当前的状态
    var status = $(this).prop('checked')
    if(status) {
        // 显示批量删除按钮
        batch.show()
    }else {
        // 隐藏批量删除按钮
        batch.hide()
    }
    // 获取所有的用户并且给他们设置选中的状态
    $('#userTbody').find('input').prop('checked', status)
})
// 当用户前面的复选框状态发生改变时
$('#userTbody').on('change', '#select', function() {
    var inputs = $('#userTbody').find('input')
    if(inputs.filter(':checked').length == 0) {
        batch.hide()
    }else {
        batch.show()
    }
    // 当选中状态的input数量等于全部input的数量时，让全选的状态选中
    if(inputs.length == inputs.filter(':checked').length){
        selectAll.prop('checked', true)
    }else {
        selectAll.prop('checked', false)
    }
})
// 为批量删除按钮添加点击事件
batch.on('click', function() {
    var ids = []
    // 获取到所有被选中的用户
    var checked = $('#userTbody').find('input').filter(':checked')
    // 把被选中的用户的id添加到数组里面
    checked.each(function(index, item) {
        ids.push($(item).attr('data-id'))
    })
    if(confirm('确认要删除用户吗？')){
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function(response) {
                console.log(response)
                location.reload()
            }
        })
    }
})