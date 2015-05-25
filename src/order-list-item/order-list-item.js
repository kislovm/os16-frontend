var BaseView = require('../base-view/base-view.js');
var Popup = require('../popup/popup-view.js');
var OrderItemInfo = require('../order-item-info/order-item-info.js');

module.exports = BaseView.extend({

    _template: require('./order-list-item.jade'),

    tagName: 'tr',

    events: {
        'click .order__amount-control_increase-by-1': 'increaseAmountByOne',
        'click .order__amount-control_decrease-by-1': 'decreaseAmountByOne',
        'click .order__amount-control_increase-by-10': 'increaseAmountByTen',
        'click .order__amount-control_decrease-by-10': 'decreaseAmountByTen',
        'change .order__amount-input': '_setAmountFromInput',
        'click .order__row-delete': '_deleteRow',
        'click .order__row-info': '_showInfo'
    },

    initialize: function() {
        this.render();
        this.model.on('change', this.render, this);
    },

    _onSave: function() {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(this._save.bind(this), 1000);
    },

    _save: function() {
        alert('Позиция сохранена');
        this.model.save();
    },

    _showInfo: function() {
        new Popup({ contentView: OrderItemInfo, contentModel: this.model });
    },

    setAmount: function(amount) {
        if(amount > 0)
            this.model.set('amount', amount);

        this._onSave();
    },

    _setAmountFromInput: function() {
        this.setAmount(this.$el.find('.order__amount-input').val());
    },

    changeAmount: function(val) {
        this.setAmount(parseInt(this.model.get('amount')) + val);
    },

    increaseAmountByOne: function() {
        this.changeAmount(1);
    },

    decreaseAmountByOne: function() {
        this.changeAmount(-1);
    },

    increaseAmountByTen: function() {
        this.changeAmount(10);
    },

    decreaseAmountByTen: function() {
        this.changeAmount(-10);
    },

    _deleteRow: function() {
        if (confirm('Вы точно хотите удалить позицию?')) {
            this.model.destroy();
            this.remove();
            alert('Позиция удалена');
        }
    }

});