var CallModel = require('../call/call-model.js');

module.exports = Backbone.Collection.extend({
    model: CallModel,

    initialize: function(data, options) {
        this.url = '/call/log/' + options.orderId + '/';
    }
});
