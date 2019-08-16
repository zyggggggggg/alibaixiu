// 获取随机推荐内容
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(response) {
        // console.log(response)
        var randomTpl = `
            {{each data}}
                <li>
                    <a href="detail.html?id={{$value._id}}">
                    <p class="title">{{$value.title}}</p>
                    <p class="reading">{{$value.meta.views}}</p>
                    <div class="pic">
                        <img src="{{$value.thumbnail}}" alt="">
                    </div>
                    </a>
                </li>
            {{/each}}
        `
        var html = template.render(randomTpl, {data: response})
        $('#randomBox').html(html)
    }
})

// 获取文章分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // console.log(response)
        var navTpl = `
            {{each data}}
                <li><a href="list.html?id={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
            {{/each}}
        `
        var html = template.render(navTpl, {data: response})
        $('#navBox').html(html)
        $('#topNavBox').html(html)
    }
})

// 获取地址栏中的id
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

// 给搜索按钮添加提交事件
$('.search form').on('submit', function() {
    var keys = $(this).find('.keys').val()
    location.href = 'search.html?key=' + keys
    return false
})