$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('cateTpl', {data: response})
        $('#category').html(html)
        // console.log(response)
    }
})