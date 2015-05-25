module.exports = Backbone.View.extend({

    _template: require('./order-item-info.jade'),

    initialize: function() {
        this.render()
    },

    render: function() {
        this.$el.html(this._template(this.model.toJSON()));
    }

});