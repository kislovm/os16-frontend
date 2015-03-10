module.exports = Backbone.Collection.extend({
    initialize: function(data, options) {
        this.url = '/order/' + options.orderId + '/messages/';
    }
});
