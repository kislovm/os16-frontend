var MessageView = require('../message/message-view.js');

module.exports = Backbone.View.extend({

    initialize: function() {
        this.messageViews = [];

        this.collection.on('add', this.onAdd, this);

        this.fetchData();
    },

    fetchData: function() {
        var that = this;

        this.collection.fetch().success(function() {
            setInterval(that.fetchData(), 5000);
            if (that.collection.length === 0) {
                that._onEmpty();
            }
        })
    },

    onAdd: function(message) {
        var messageHolder = $('<div class="chat__message">');
        this.messageViews.push(new MessageView({ el: messageHolder[0], model: message }));
        this.$el.prepend(messageHolder);
    }

});
