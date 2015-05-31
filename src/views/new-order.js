var UploadFileView = require('./new-order-upload-file/new-order-upload-file.js'),
    ProductNamingView = require('./new-order-product-naming/new-order-product-naming.js'),
    NewOrderModel = require('./new-order-model.js');

module.exports = Backbone.View.extend({

    _template: require('../../jade/new-order.jade'),

    initialize: function() {
        this.model = new NewOrderModel();
        this.model.on('change:uploaded', this._onUploadedChange, this);
        this.model.on('change:named', this._onNamedChange, this);
        this.render();
    },

    _onUploadedChange: function() {
        if(this.model.get('uploaded')) {
            if(this.model.get('products') && this.model.get('products').length > 0)
                alert('Файл был успешно загружен и распознан. Вы можете перейти ко второму шагу.');
            else {
                alert('Файл был успешно загружен и распознан. Все продукты найдены в базе, второй шаг не требуется. Сейчас будет создан заказ.');
                this._createOrder()
            }
        }
    },

    _onNamedChange: function() {
        if(this.model.get('named')) {
            alert('Соответствия успешно установлены. Сейчас будет создан заказ.');
            this._createOrder()
        }
    },

    _createOrder: function() {
        this.$el.addClass('new-order__creating');

        $.get('/new-order/' + this.model.get('sequence') + '/', 'json')
           .success(function() {
               controller.navigate('new-order/edit', { trigger: 'true' });
           });
    },

    render: function() {
        this.$el.html(this._template());

        this._uploadFileView = new UploadFileView({ el: this.$el.find('.new-order__upload-file'), model: this.model });
        this._productNamingView = new ProductNamingView({ el: this.$el.find('.new-order__product-naming'), model: this.model });

    }

});

