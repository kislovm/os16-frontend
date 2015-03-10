module.exports = Backbone.View.extend({

    _template: JST['message'],

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this._template(this.model.toJSON()));
    }
});
