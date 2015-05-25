module.exports = Backbone.View.extend({

    model: new Backbone.Model,

    initialize: function() {
        this.render();
        this.model.on('change', this.render, this);
    },

    render: function() {
        this.$el.html(this._template(this.model.toJSON()));
    }

});