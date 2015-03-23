var ProductNamingCollection = Backbone.Collection.extend({
    url: '/new-order/'
});

var Popup = require('../../popup/popup-view.js');
var SelectPositionView = require('../../select-position/select-position-view.js');
var SelectPositionModel = require('../../select-position/select-position-model.js');

module.exports = Backbone.View.extend({

    _template: require('./new-order-product-naming.jade'),

    events: {
        'click .new-order__back': '_back',
        'click .new-order__save-naming': '_save',
        'click .new-order__naming-edit': '_edit'
    },

    initialize: function() {
        this.model.on('change', this._toggleDisabled, this);
        this.model.on('change:products', this._changeProducts, this);
        this.collection = new ProductNamingCollection;

        this.collection.on('change add', this.render, this);
        this.render();
    },

    _edit: function(e) {
        var el = $(e.currentTarget);

        this._selectedToChange = el.parent();

        this._popup =
            new Popup({
                contentView: SelectPositionView,
                contentModel: new SelectPositionModel,
                contentParams: { itemModel: this.collection.get(el.data('model-id')) }
            });
    },

    _changeProducts: function() {
        this.collection.set(this.model.get('products'));
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
        return !(this.model.get('uploaded') && !this.model.get('named'));
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
        this.$el.html(this._template({ products: this.collection.toJSON() }));
    }

});
