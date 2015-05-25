var BaseView = require('../base-view/base-view.js');
var OrderModel = require('./order-model.js');

var OrderListItemModel = require('../order-list-item/order-list-item-model.js');

var OrderListCollection = Backbone.Collection.extend({
    model: OrderListItemModel
});

var OrderRightpageView = require('../order-rightpage/order-rightpage.js');

var Popup = require('../popup/popup-view.js');
var AddFromXlsView = require('../add-from-xls/add-from-xls.js');

module.exports = BaseView.extend({

    events: {
        'click .order__add-from-xls': '_addFromXls',
        'click .order__save-order': '_save',
        'click .order__reserv-order': '_reserv'
    },

    model: OrderModel,

    _template: require('./order.jade'),

    initialize: function() {

        this.render();

        this.model.on('add reset change', this.render, this);

        this.fetchData();

    },

    fetchData: function() {
        var trobber = this.$el.find('.order__trobber');

        trobber.show();

        this.model.fetch().then((function() {
            trobber.hide();
        }).bind(this))
    },

    render: function() {
        this.$el.html(this._template(this.model.toJSON()));

        this.rightpage = new OrderRightpageView({
            collection: new OrderListCollection(this.model.get('items')),
            model: this.model,
            el: this.$el.find('.order__leftpage')
        });
    },

    _save: function() {
        $.cookie('saved', '1');
        controller.navigate('/', {trigger: true});
        alert('Черновик запроса от ' + this.model.get('date') + ' сохранен');
    },


    _reserv: function() {
        $.post('/order/new/undraft/', { orderId: this.model.get('orderId') }, 'json')
            .success(function() {
                controller.navigate('', { trigger: true });
                alert('Черновик заказа отправлен менеджеру');
            });
    },

    _addFromXls: function() {
        this.xlsPopup = new Popup({
            contentView: AddFromXlsView,
            contentModel: new Backbone.Model({orderId: this.model.get('orderId')})
        });
    }

});