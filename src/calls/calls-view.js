var MessagesView = require('../messages-view/messages-view.js');

var CallsCollection = require('./calls-collection.js');

var CallView = require('../call/call-view.js');

module.exports = MessagesView.extend({

    events: {
        'click .calls__show-button': 'toggleCalls'
    },

    toggleCalls: function() {
        this.$el.find('.calls__list').slideToggle();
    },

    collection: CallsCollection,

    onAdd: function(call) {
        var messageHolder = $('<div class="calls__call">');
        this.messageViews = new CallView({ el: messageHolder[0], model: call });
        this.$el.find('.calls__list').prepend(messageHolder);
    }

});
