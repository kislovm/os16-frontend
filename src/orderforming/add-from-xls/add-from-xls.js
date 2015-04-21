module.exports = Backbone.View.extend({

    _template: require('./add-from-xls.jade'),

    className: 'add-from-xls',

    model: new Backbone.Model,

    events: {
        'submit .add-from-xls__file-upload-form': '_onSubmit'
    },

    _onSubmit: function(e) {
        e.preventDefault();

        this.$el.find('form').ajaxSubmit({
            success: function(data) {
                if(data.error) alert('Позиции не были добавлены');

                alert('Позиции успешно добавлены');

                GLOBAL.trigger('closePopups');
            },
            dataType: 'json'
        });
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.addClass(this.className);
        this.$el.html(this._template(this.model.toJSON()));
    }

});