var ProductNamingCollection = Backbone.Collection.extend({
    url: '/new-order/'
});

module.exports = Backbone.View.extend({

    _template: require('./new-order-product-naming.jade'),

    events: {
        'click .new-order__back': '_back',
        'click .new-order__save-naming': '_save'
    },

    initialize: function() {
        this.model.on('change', this._toggleDisabled, this);
        this.collection = new (Backbone.Collection.extend({

        }));
        this.render();
    },

    _toggleDisabled: function() {
        var content = this.$el.find('.new-order__content'),
            disabled = this._isDisabled();

        disabled ?
            content.slideUp() :
            content.slideDown();

        this.$el.toggleClass('disabled', disabled);
    },

    _isDisabled: function() {
        return !(this.model.get('uploaded') && !this.model.get('named'))
    },

    _back: function(e) {
        e.preventDefault();
        this.model.set('uploaded', false);
    },

    _save: function() {
        var _this = this;

        $.post('/new-order/', { data: this.collection.toJSON() }, 'json')
            .success(function() {
                _this.model.set('named', true);
            })
            .fail(function() {
                alert('Что-то пошло не так. Попробуйте сохранить позиции еще раз.')
            });
    },

    render: function() {
        this.$el.html(this._template());
    }

});
