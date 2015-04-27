var ChatModel = require('./chat-view-model.js');

var MessagesView = require('../messages-view/messages-view.js');
var MessagesCollection = require('../messages-view/messages-view-collection.js');

var CallsView = require('../calls/calls-view.js');
var CallsCollection = require('../calls/calls-collection.js');

module.exports = Backbone.View.extend({

    _template: require('./chat.jade'),

    events: {
        'submit .chat__replyform': '_onMessageSend',
        'click .chat__send-message': '_onMessageSend',
        'click .chat__back-btn': '_onBack',
        'keypress .chat__replyform > textarea': '_onKeyPress'
    },

    _onBack: function() {
        Backbone.history.history.back()
    },

    _onKeyPress: function(e) {
        e.keyCode == 13 && this._onMessageSend(e);
    },

    _onMessageSend: function(e) {
        if (this._sendingNow) return;
        e.preventDefault();

        var that = this;

        this.textarea.prop('disabled', 'yes');
        this._sendingNow = true;

        this.form.ajaxSubmit({
            data: {text: that.textarea.val()}, success: function() {
                that.messagesView.collection.fetch();
                that.textarea.val('').prop('disabled', '');
                that._sendingNow = false;
            }, error: function() {
                that.messagesView.collection.fetch();
                that.textarea.prop('disabled', '');
                that._sendingNow = false;
                alert('Отправка сообщения не удалась. Пожалуйста, попробуйте еще раз.')
            }
        });
    },

    model: new ChatModel,

    initialize: function(options) {
        var _this = this;
        this.model.set('orderId', options.orderId);

        $.get('/order/' + this.model.get('orderId'), function(data) {
            _this.$el.find('.chat__header').text('Обсуждение по заказу от: ' + data.date);
        }, 'json');
        orderId = this.model.get('orderId');
        this.render();
    },

    render: function() {
        this.$el.html(this._template(this.model.toJSON()));

        this.form = this.$el.find('.chat__replyform');
        this.textarea = this.$el.find('textarea');

        this.messagesView = new MessagesView({
                el: this.$el.find('.chat__window'),
                collection: new MessagesCollection([], {orderId: this.model.get('orderId')})
            });

        this.callsView = new CallsView({
                el: this.$el.find('.chat__calls'),
                collection: new CallsCollection([], {orderId: this.model.get('orderId')})
            });
    }

});
