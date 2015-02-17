$(function() {
    var form =  $('.login-form');

    form.submit(function(e) {
        e.preventDefault();

        $.post('/auth/', form.serialize())
            .success(function(data) {
                +JSON.parse(data).result ?
                    window.location.reload():
                    alert('Неверный логин или пароль');
            })
    });

    $('.logout').click(function() {
        window.location = '/logout/';
    })
});
