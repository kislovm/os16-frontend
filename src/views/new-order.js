var UploadFileView = require('./new-order-upload-file/new-order-upload-file.js'),
    NewOrderModel = require('./new-order-model.js');

module.exports = Backbone.View.extend({

    _template: require('../../jade/new-order.jade'),

    initialize: function() {
        this.model = new NewOrderModel();
        this.render();
    },

    render: function() {
        this.$el.html(this._template());

        this._uploadFileView = new UploadFileView({ el: this.$el.find('.new-order__upload-file'), model: this.model });

    }

});

