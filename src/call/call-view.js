var MessageView = require('../message/message-view.js');

module.exports = MessageView.extend({
    model: Backbone.Model,

    _template: JST['call']
});
