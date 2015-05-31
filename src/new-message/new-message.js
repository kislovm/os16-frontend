module.exports = Backbone.View.extend({

    _template: require('./new-message.jade'),

    _checkMessages: function() {
        var _this = this;

        $.get('/new-messages/')
            .success(function(data) {
                data = JSON.parse(data);
                if(!!data.received) {
                    GLOBAL.trigger('new-message');
                    _this.render(data.received);
                    _this._show()
                }
            })
            .then(setTimeout(function() {
                _this._checkMessages()
            }, 5000));
    },

    _show: function() {
        var $el = this.$el.find('div');

        $el.fadeIn();

        setTimeout(function() { $el.fadeOut() }, 10000);
    },

    initialize: function() {
        this._checkMessages();
    },

    render: function(orderId) {
        this.$el.html(this._template({ 'href': '/#order/' + orderId + '/chat' }));
    }

});