//try {

    AN = function() {

        function notImplemented(e) {
            e.preventDefault();
            alert('Функция находится в разработке');
        }

        Backbone.View.prototype.close = function() {
            if (this.onClose) {
                this.onClose();
            }
            this.remove();
            this.unbind();
        };

        Date.prototype.getFullMonth = function() {
            var month = (this.getMonth() + 1).toString();
            return month.length > 1 ? month : "0" + month;
        };

        Date.prototype.getFullDate = function() {
            return [this.getDate(), this.getFullMonth(), this.getFullYear()].join('.');
        };

        GLOBAL = new Backbone.Model();

        var loadjscssfile = function(filename, filetype) {
            if (filetype == "js") { //if filename is a external JavaScript file
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", filename)
            } else if (filetype == "css") { //if filename is an external CSS file
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", filename)
            }
            if (typeof fileref != "undefined") document.getElementsByTagName("head")[0].appendChild(fileref)
        };

        var removejscssfile = function(filename, filetype) {
            var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
            var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
            var allsuspects = document.getElementsByTagName(targetelement)
            for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
                if (allsuspects[i] &&
                    allsuspects[i].getAttribute(targetattr) !=
                    null &&
                    allsuspects[i].getAttribute(targetattr).indexOf(filename) !=
                    -1) allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
            }
        };

        var element = "div#main";

        var Controller = Backbone.Router.extend({ //Это аналог Controller в MVC модели
            routes: { //Список возможных путей
                "": "start",
                "new_order": "new_order",
                "new_order/edit": "new_order_edit",
                "backorder": "backorder",
                "order/:order_id": "order",
                "order/:order_id/payments": "payments",
                "order/:order_id/chat": "chat",
                "clients": "clients",
                "call": "call",
                "settings": "settings",
                "account": "account",
                "archive": "archive",
                "new-order": "new-order"
            },

            "new-order": function() {
                GLOBAL.trigger('closePopups');
                $('#ruller-separator').remove();
                $('#payment-ruller-fon').remove();
                removejscssfile("/static/css/orderforming.css", "css");
                removejscssfile("/static/css/ls.css", "css");
                loadjscssfile("/static/css/order.css", "css");

                this.newOrderView = new NewOrderView({ el: element });
            },

            initialize: function() { // Вызывается при его инициализации.
                this.bind('all', function(trigger) {
                    var routeData = trigger.split(":");
                    if (routeData[0] === "route") {}
                })
            },


            //Дальше идут методы, которые описывают что делать при смене пути. При смене пути создается соответсвующее view, вызывается его рендер
            start: function() {
                GLOBAL.trigger('closePopups');
                $('#ruller-separator').remove();
                $('#payment-ruller-fon').remove();
                removejscssfile("/static/css/orderforming.css", "css");
                removejscssfile("/static/css/ls.css", "css");
                loadjscssfile("/static/css/order.css", "css");
                if (!this.ordersView) this.ordersView = new OrdersView({
                    collection: new Orders, el: element, model: new Counter()
                });

                this.ordersView.render();
                this.ordersView.collection.fetch();

            },

            settings: function() {
                GLOBAL.trigger('closePopups');
                $('#ruller-separator').remove();
                $('#payment-ruller-fon').remove();
                removejscssfile("/static/css/orderforming.css", "css");
                removejscssfile("/static/css/ls.css", "css");
                removejscssfile("/static/css/order.css", "css");

                if (!this.settingsView) this.settingsView = new SettingsView({
                    el: element
                });

                this.settingsView.render();

            },

            archive: function() {
                GLOBAL.trigger('closePopups');
                $('#ruller-separator').remove();
                $('#payment-ruller-fon').remove();
                removejscssfile("/static/css/orderforming.css", "css");
                removejscssfile("/static/css/ls.css", "css");
                loadjscssfile("/static/css/order.css", "css");
                this.orders = new Orders([], {url: '/archive/'});
                this.orders.fetch();
                this.archiveView = new OrdersView({
                    collection: this.orders, el: element, model: new Counter()
                });

            },

            account: function() {
                GLOBAL.trigger('closePopups');
                $('#ruller-separator').remove();
                $('#payment-ruller-fon').remove();
                removejscssfile("/static/css/orderforming.css", "css");
                removejscssfile("/static/css/order.css", "css");
                loadjscssfile("/static/css/ls.css", "css");
                this.panel = new Panel();
                this.panel.fetch({reset: true});

                new PanelView({
                    collection: this.panel, el: element
                });
                if (this.timeline == undefined) this.timeline = new TimelineView();
                else this.timeline.render();
            },

            order: function(orderId) {

                try {
                    GLOBAL.trigger('Close');
                    this.orderforming.el = undefined;
                    ;
                } catch (e) {
                    console.log(e);
                }

                $('#ruller-separator').remove();
                $('#payment-ruller-fon').remove()
                removejscssfile("/static/css/order.css", "css");
                removejscssfile("/static/css/ls.css", "css");
                loadjscssfile("/static/css/orderforming.css", "css");

                if (!this.orderformingViews) this.orderformingViews = {};

                this.orderformingViews[orderId] ?
                    this.orderformingViews[orderId].render() :
                    this.orderformingViews[orderId] = new OrderformingView({
                        el: element, model: new OrderformingModel({
                            orderId: orderId
                        })
                    });
            },

            payments: function(orderId) {

                try {
                    GLOBAL.trigger('Close');
                    this.orderforming.el = undefined;
                } catch (e) {
                    console.log(e);
                }

                $('#ruller-separator').remove();
                $('#payment-ruller-fon').remove();
                removejscssfile("/static/css/order.css", "css");
                removejscssfile("/static/css/ls.css", "css");
                loadjscssfile("/static/css/orderforming.css", "css");

                this.paymentsView = new PaymentsView({
                    el: element, model: new (Backbone.Model.extend({
                        url: '/order/' + orderId + '/payments/', defaults: {
                            items: [], orderId: 0
                        }
                    }))({orderId: orderId})
                });

                this.paymentsView.render();

            },

            backorder: function() {

                try {
                    GLOBAL.trigger('Close');
                    this.orderforming.el = undefined;


                } catch (e) {
                    console.log(e);
                }
                $('#ruller-separator').remove();
                $('#payment-ruller-fon').remove();
                removejscssfile("/static/css/order.css", "css");
                removejscssfile("/static/css/ls.css", "css");
                loadjscssfile("/static/css/orderforming.css", "css");

                new BackorderView({
                    el: element, model: new BackorderModel(), _template: JST['backorder/main']
                });
            },

            chat: function(orderId) {

                try {
                    GLOBAL.trigger('Close');
                    this.orderforming.el = undefined;

                    $('#ruller-separator').remove();
                    $('#payment-ruller-fon').remove();
                } catch (e) {
                    console.log(e);
                }

                removejscssfile("/static/css/order.css", "css");
                removejscssfile("/static/css/ls.css", "css");
                removejscssfile("/static/css/orderforming.css", "css");

                new ChatView({
                    el: element,
                    orderId: orderId
                });

            },

            new_order: function() {
                var that = this;

                GLOBAL.trigger('closePopups');

                $.post('/order/new/', function(data) {
                    var orderId = data.result, confirm;

                    if (!orderId) {
                        that.navigate('new-order', {trigger: true});
                        return;
                    } else {
                        confirm = $.cookie('saved') == '1' ? new OrderSavedConfirm : new OrderAutomaticalySavedConfirm;
                        confirm.render();
                    }
                }, 'json');

            },

            new_order_edit: function() {

                var that = this;

                GLOBAL.trigger('closePopups');

                removejscssfile("/static/css/order.css", "css");
                removejscssfile("/static/css/ls.css", "css");
                loadjscssfile("/static/css/orderforming.css", "css");
                try {
                    //this.orderforming.close();
                    $('#ruller-separator').remove();
                    $('#payment-ruller-fon').remove();
                } catch (e) {
                    console.log(e);
                }

                $.cookie('saved', 0);

                $(element).html(''); //хак чтобы не моргало

                $.post('/order/new/', function(data) {
                    var orderId = data.result;

                    if (!orderId) that.navigate('new-order', {trigger: true});

                    $.cookie('saved', 0);

                    that.ordeforming = new OrderformingView({
                        el: element, model: new OrderformingModel({orderId: orderId})
                    });

                }, 'json');
            }

        });

        var Menu = Backbone.View.extend({
            el: '.left-menu',

            events: {
                'click li': 'click'
            },

            click: function(e) {
                var el = $(e.currentTarget);
                el.siblings().removeClass('active');
                el.addClass('active');
            }
        });

        var ANView = Backbone.View.extend({
            fallback: function() {
                alert("Произошла ошибка"); //must do something more complicated
            },

            selectItem: function(event) {
                this.selectedItem = $(event.target).data('id');
                $(event.currentTarget).siblings().removeClass('selected').blur();
                $(event.currentTarget).addClass('selected').attr("tabindex", -1).focus();
            }
        });

        var ANCollectionView = ANView.extend({ //Общее view для всех view которые отображают коллекции
            initialize: function() { //Вызывается при инициализации
                this.buildCollection();
                this.render();
            },

            buildCollection: function() { //Создает массив со view для каждого элемента коллекции
                var that = this;
                this._collectionViews = [];
                this.collection.bind('add', this.add, this);
                this.collection.bind('reset', this.initialize, this);

                this.collection.each(function(item) {
                    that._collectionViews.push(new that.view({
                        model: item
                    }));
                });
            },

            add: function(item) { //Добавляет новый view в массив view коллекции, если добавлен новый элемент в коллекцию
                var cv = new this.view({
                    model: item
                });

                this.count();

                this._orderViews.push(cv);

                this.render();
            }

        });

        var ProductNamingCollection = Backbone.Collection.extend({
            url: '/settings/prodnames/'
        });


        var ProductNamingView = Backbone.View.extend({

            _template: JST['productNaming'],

            collection: new ProductNamingCollection,

            events: {
                'click .product-naming__edit': '_edit',
                'click .product-naming__save': '_save',
                'click .product-naming__add-row': '_addRow',
                'click .product-naming__remove-row': '_removeRow',
                'click .product-naming__clear-row': '_clearTable',
                'click .product-naming__upload-file': '_uploadFile',
                'click .product-naming__select-position': '_selectPosition'
            },


            initialize: function() {
                GLOBAL.on('select-product', function(data) {
                    alert('Вы выбрали ' + data.text);
                    this._selectedToChange.html(data.text);
                    this._popup.remove();
                    $('.paranja').hide();
                }, this);

                this.render();

                this.collection.on('add', this.render, this);

                this.collection.on('remove', this.render, this);

                this.collection.on('change', this.render, this);

                this.collection.on('change', this._load, this);

                this._fetchData();
            },

            _load: function() {
                $.post('/settings/prodnames/load/',
                    { products: JSON.stringify(this.collection.toJSON()) },
                    function(data) { console.log(data); },
                    'json');
            },


            _fetchData: function() {
                var loading = this.$el.find('.product-naming__loading').show();
                this.collection.fetch().done(function() {
                    loading.hide();
                });
            },

            _clearTable: function() {
                var _this = this;
                $.get('/settings/prodnames/clear/', function() {
                    _this._fetchData();
                });
            },

            render: function() {
                this.$el.html(this._template({
                    products: this.collection.toJSON()
                }));

            },

            /**
             * Переводит таблицу в состояние редактируемой
             */
            _edit: function() {
                var _this = this;

                if (confirm('Внимание! После начала редактирования списка, создание новых заказов будет заблокировано, ' +
                        'Отменить действия будет нельзя!' +
                        'до утверждения отредактированого списка менедежером! Вы уверены, что хотите отредактировать список?')) {
                    var $el = this.$el;

                    $.get('/settings/prodnames/clear/', function(data) {
                        if (data.success) {
                            $el.find('.product-naming__state').text('Создание новых заказов было заблокировано. ' +
                            'Для того, чтобы создать новый заказ, отредактируйте таблицу и сохраните изменения. ' +
                            'После этого дождитесь подтверждения правок со стороны менедежра.');

                            $el.find('.product-naming__controls').html('</br>' +
                                '<input class="product-naming__add-row" type="button" value="Добавить строку"/>' +
                                '<form class="product-naming__xls-form" method="POST" enctype="multipart/form-data" action="/settings/prodnames/xls/">' +
                                '<input type="file" name="file"/>' +
                                '<input class="product-naming__upload-file" type="button" value="Загрузить XLS"/>' +
                                '</form>' +
                                '</br>Редактирование разблокировано ' +
                                '<input class="product-naming__save" type="button" value="Сохранить"/>');

                            _this.collection.fetch();
                        } else alert('Что-то пошло не так.')
                    }, 'json');
                }

            },

            _uploadFile: function() {
                var _this = this;

                this.$el.find('.product-naming__xls-form').ajaxSubmit({
                    success: function(data) {
                        if (data.error) alert(data.error); else _this.collection.set(data);
                    },
                    dataType: 'json'
                });
            },

            /**
             * Переводит таблицу в состояние сохраненной
             */
            _save: function() {
                if (confirm('Внимание! Редактирование будет заблокировано, а таблица отправлена на утверждение менеджеру. ' +
                    'Внесение изменений в таблицу или отмена действия будет невозможна. ' +
                    'Вы уверены, что хотите сохранить таблицу?')) {

                    var $el = this.$el;

                    $.post('/settings/prodnames/load/',
                        {products: JSON.stringify(this.collection.toJSON())},
                        function(data) {
                            console.log(data);
                        },
                        'json');

                    $el.find('table input').each(function(i, el) {
                        el = $(el);
                        var val = el.val() || '&nbsp;';

                        el.parent().html(val);
                    });

                    //                $el.find('.product-naming__state').text('Таблица была отправлена на утверждение менеджеру. После утверждения таблицы менеджером вы сможете создавать новые заказы.');
                    //
                    //                $el.find('.product-naming__controls').html('');

                }
            },

            _selectPosition: function(e) {
                var el = $(e.currentTarget);

                this._selectedToChange = el.parent();

                this._popup =
                    new Popup({
                        contentView: SelectPositionView,
                        contentModel: new SelectPositionModel(),
                        contentParams: {itemModel: this.collection.get(el.data('model-id'))}
                    });
            },

            /**
             * Добавляет новую строку в таблицу
             * @private
             */
            _addRow: function(customerName, anName, cantDelete) {
                this.$el.find('table').append('<tr>' +
                    '<td>' +
                    customerName +
                    '</td>' +
                    (anName ?
                    '<td>' +
                    anName +
                    '</td>' :
                        '<td><span class="product-naming__select-position">Выбрать</span></td>') +
                    (cantDelete &&
                    '<td class="product-naming__remove-cell"><span class="product-naming__remove-row">Удалить</span></td>') +
                    '</tr>')
            },

            /**
             * Удаляет строку из таблицы
             * @param {jQuery.event} e
             * @private
             */
            _removeRow: function(e) {
                var id = $(e.currentTarget).data('model-id'), _this = this;

                $.get('/settings/prodnames/delete/' + id + '/', function(data) { _this.collection.fetch() }, 'json')

            }

        });

        SelectPositionModel = Backbone.Model.extend({
            url: 'http://django.os16.net/categorys/'
        });

        SelectPositionView = Backbone.View.extend({

            events: {
                'change .category-select': '_onCategoryChange',
                'change .group-select': '_onGroupChange',
                'click .select': '_onSelect'
            },


            _template: JST['select-position'],

            _onCategoryChange: function() {
                var category = this.$el.find('.category-select').val();
                this.model.set('category', category);
                this.groupModel.url = '/groups/' + category + '/';
                this.groupModel.fetch();
            },

            _onGroupChange: function() {
                var group = this.$el.find('.group-select').val();
                this.model.set('group', group);
                this.itemsModel.url = '/group/' + group + '/';
                this.itemsModel.fetch();
            },

            _onSelect: function() {
                this.itemModel.set({
                    'product_name': this.$el.find('.item-select option:selected').text(),
                    'product_id': this.$el.find('.item-select').val()
                });

                GLOBAL.trigger('closePopups');
                $('.paranja').hide();
            },

            initialize: function(data) {

                this.groupModel = new Backbone.Model();
                this.itemsModel = new Backbone.Model();
                this.itemModel = data.params.itemModel;
                this.orderId = data.params.orderId;
                this.model.fetch();
                this.model.on('change', this.render, this);
                this.groupModel.on('change', this.render, this);
                this.itemsModel.on('change', this.render, this);
            },

            render: function() {
                this.$el.html(this._template({
                    groups: this.model.toJSON().groups || [],
                    group: this.groupModel.toJSON().groups || [],
                    items: this.itemsModel.toJSON().groups || []
                }));

                this.model.get('category') && this.$el.find('.category-select').val(this.model.get('category'));
                this.model.get('group') && this.$el.find('.group-select').val(this.model.get('group'));
            }
        });

        var SettingsView = Backbone.View.extend({

            _template: JST['settings'],

            _settings: [
                {
                    name: 'Соответствие наименований товаров', classname: 'productNaming', view: ProductNamingView
                }
            ],

            render: function() {
                var $el = this.$el;

                $el.html(this._template({settings: this._settings}));
                this._settings.forEach(function(setting) {
                    new setting.view({
                        el: $el.find('.settings__' + setting.classname)
                    });
                });

            }

        });

        var ChatView = require('./src/chat-view/chat-view.js');

        var Order = Backbone.Model.extend({ //Модель. Все что у неё есть это список стандартных параметров.
            defaults: {
                problem: false
            }
        });

        var OrderView = ANView.extend({ //View элемента коллекции.
            _template: JST['orders/order'], //Его template в файле jst.js
            render: function() { //Render элемента
                this.html = this._template(this.model.toJSON());
                return this;
            }
        });

        var Orders = Backbone.Collection.extend({ //Коллекция, которая содержит модели view, описанного выше
            model: Order, url: '/orders/', initialize: function(models, options) {
                if (options && options.url) this.url = options.url;
            }
        });

        var Counter = Backbone.Model.extend({
            defaults: {
                col1: 0, col2: 0, col3: 0
            }
        });


        var OrdersView = ANView.extend({
            _template: JST['orders/head'],

            initialize: function() { //Инициализация view
                var that = this;
                this._orderViews = [];
                this.collection.bind('add', this.add, this);
                this.collection.bind('reset', this.initialize, this);

                this.collection.each(function(order) {
                    that._orderViews.push(new OrderView({
                        model: order
                    }));
                });
                this.count();
                this.render();
            },


            count: function() {
                this.model.set({
                    col1: this.collection.filter(function(order) {
                        return order.get('col') == 1
                    }).length, col2: this.collection.filter(function(order) {
                        return order.get('col') == 2
                    }).length, col3: this.collection.filter(function(order) {
                        return order.get('col') == 3
                    }).length
                    //not good
                });
            },

            add: function(order) {
                var ov = new OrderView({
                    model: order
                });

                this.count();

                this._orderViews.push(ov);

                this.render();
            },

            render: function() { //Вызывается его рендер, в элемент вставляется рендер всех элементов коллекции и рендер модели этого view
                $(this.el).html(this._template(this.model.toJSON()));
                _(this._orderViews).each(function(order) {
                    this.$el.append(order.render().html);
                }, this);
                return this;
            }

        });

        /*

         Все объекты далее работают по тому же самому принципу.

         */


        var Indicator = Backbone.Model.extend({});

        var Panel = Backbone.Collection.extend({
            url: '/ls/', model: Indicator
        });

        var IndicatorView = ANView.extend({
            _template: JST['ls/panel'], model: Indicator, render: function() {
                this.html = this._template(this.model.toJSON());
                return this;
            }
        });

        var PanelView = ANView.extend({


            initialize: function() {
                var that = this;
                this._panelView = [];
                this.collection.bind('add', this.add, this);
                this.collection.bind('reset', this.reset, this);
                this.collection.each(function(panel) {
                    that._panelView.push(new IndicatorView({
                        model: panel
                    }));
                });
                this.render();
            },

            reset: function() {
                var that = this;
                this.collection.each(function(panel) {
                    that._panelView.push(new IndicatorView({
                        model: panel
                    }));
                });
                this.render();
            },

            add: function(panel) {
                var pv = new IndicatorView({
                    model: panel
                });

                this.count();

                this._panelView.push(pv);

                this.render();
            },

            render: function() {
                var that = this;
                var counter = 0;
                $(that.el).html('');
                that.col = $('<div class="kolonka"></div>');
                _(this._panelView).each(function(panel) {

                    that.col.append(panel.render().html);
                    counter++;
                    if ((counter % 3) == 0 || (counter) == that._panelView.length) {
                        $(that.el).append(that.col);
                        that.col = $('<div class="kolonka"></div>');
                    }


                });
                return this;
            }


        });

        var TimelineModel = Backbone.Model.extend({
            defaults: {
                date: "", price: 0, state: ""
            }
        });

        var Timeline = Backbone.Collection.extend({
            model: TimelineModel, url: '/timeline/'
        })

        var TimelineView = ANView.extend({
            collection: new Timeline,

            _template: JST['ls/timeline'],

            initialize: function() {
                this.collection.bind('reset', this.render, this);
                this.collection.fetch({reset: true});
            },

            render: function() {
                $('#ruller-separator').remove();
                $('#payment-ruller-fon').remove();
                var html = this._template({
                    timeline: this.collection.toJSON()
                });
                $('div#total').append(html);
            }
        });

        var OrderformingModel = Backbone.Model.extend({
            url: function() { return '/order/' + this.get('orderId') + '/' },

            defaults: {
                date: new Date().getFullDate(),
                head: 'Запрос',
                title_name: 'Заказ',
                status_name: '',
                weight: 0,
                link: '/',
                rate: 0,
                price: 0,
                price_rub: 0,
                items: [],
                orderId: 0,
                web_discount: 0
            }
        });

        var BackorderModel = OrderformingModel.extend({
            url: '/backbone/'
        });

        var PaymentsView = ANView.extend({
            _template: JST['payments/main'],

            initialize: function() {
                this.model.on('add', this.render, this);
                this.model.on('reset', this.render, this);
                this.model.fetch();
            },

            render: function() {
                this.$el.html(this._template(this.model.toJSON()));
            }

        });

        var OrderformingView = ANView.extend({

            model: new OrderformingModel,

            _template: JST['orderforming/main'],

            events: {
                "click .add ": "addViewOpen", //"click #orderlistcontent tr:not(.add)": "selectItem",
                "change .amount": "changeAmount",
                "click .delete": "deleteItem",
                "click .info": "itemInfo",
                "click .rezerv": "rezerv",
                "click .save": "save",
                "click .plus": "increaseAmount",
                "click .minus": "decreaseAmount",
                "click .plus-ten": "increaseAmountByTen",
                "click .minus-ten": "decreaseAmountByTen",
                "click .backorder": "backorder",
                "click .header_sorting_yes": "changeSorting"
            },

            onRoute: function(route, arg) {
                if (route != 'order' || arg[0] != this.model.get('orderId')) this.onClose();
            },

            changeSorting: function(e) {
                e.preventDefault();
                $('.header_sorting_yes').removeClass('active');

                var el = $(e.currentTarget);
                this.sortRule = el.data('sorting');
                el.addClass('active');
                this.render();
            },

            addViewOpen: function() {
                this.item = new Backbone.Model();
                try {
                    this.addView_.close();
                } catch (e) {}
                this.addView_ = new OrderformingAddView___({
                    item: this.item, model: new CategoryListModel({
                        searchString: "Поиск категории товаров"
                    })

                });
                $('#leftpage', $(this.el)).append($(this.addView_.el));
                this.item.bind('change', this.changeAddView, this);
            },

            changeAddView: function() {
                var amount;
                if (amount = this.item.get('amount')) {
                    var that = this;
                    $.post('/order/' +
                        this.model.get('orderId') +
                        '/add/' +
                        this.item.get('itemId') +
                        '/',
                        {amount: amount},
                        function(data) {
                            if (data.error) {
                                alert(data.error.text);
                                return;
                            }

                            if (that.model.get('orderId') == 0 &&
                                    data.orderId != undefined && that.model.get('orderId') != data.orderId)
                                window.location.hash = '#order/' + data.orderId;

                            else
                                that.model.fetch() &&
                                    alert('Товар добавлен');
                        },
                        'json');
                } else if (this.item.get('itemId') != undefined) {
                    this.addView_ = new OrderformingAddView__({
                        item: this.item, model: new ItemHistoryModel({
                            itemId: this.item.get('itemId'), orderId: this.model.get('orderId')
                        })
                    });
                    $('#leftpage', $(this.el)).append($(this.addView_.el));
                } else if (this.item.get('group') != undefined) {
                    this.addView_ = new OrderformingAddView_({
                        item: this.item, model: new ItemListModel({
                            group: this.item.get('group'), searchString: "Поиск по названию",
                            orderId: this.model.get('orderId')
                        })
                    });
                    $('#leftpage', $(this.el)).append($(this.addView_.el));
                } else if (this.item.get('category') !== undefined) {
                    this.addView_ = new OrderformingAddView({
                        item: this.item,
                        model: new GroupListModel({
                            searchString: "Поиск группы товаров",
                            categoryId: this.item.get('category')
                        })
                    });
                    $('#leftpage', $(this.el)).append($(this.addView_.el));
                } else {
                    this.addView_ = new OrderformingAddView___({
                        item: this.item, model: new CategoryListModel({searchString: "Поиск категории товаров"})
                    });
                    $('#leftpage', $(this.el)).append($(this.addView_.el));
                }

            },

            onClose: function() {
                GLOBAL.trigger('Close');
                this.xhr && this.xhr.abort();
            },

            fetchData: function() {
                var that = this;

                this.showTrobber();
                this.xhr = this.model.fetch().done(function() {
                    that.hideTrobber();
                });
            },

            increaseAmountByTen: function(e) {
                this.increaseAmount(e, 10)
            },

            decreaseAmountByTen: function(e) {
                this.decreaseAmount(e, 10)
            },

            _minItemAmount: 1, _minItemAmount: 1,

            increaseAmount: function(e, amount) {
                var el = $(e.currentTarget), pid = el.parents('tr').data('id'), items = this.model.get('items'), item, amount = amount ||
                        1;

                if (el.hasClass('icon_disabled_yes')) return;

                for (var i = 0; i < items.length; i++) {
                    if (items[i].id == pid) {
                        item = items[i];
                        item.amount = (+item.amount) + amount;
                        item.summ = ((+item.price.replace(',', '.')) * (+item.amount)).toFixed(2).replace('.', ',');
                        items[i] = item;
                        this.model.set('items', items);
                        el.parents('td').find('.amount').val(item.amount);
                        el.parents('tr').find('.summa').html(item.summ);
                        break;
                    }
                }

                item && this.trigger('amountChange', {id: pid, amount: item.amount, el: el})
            },

            changeAmount: function(e) {
                var el = $(e.currentTarget), pid = el.parents('tr').data('id'), items = this.model.get('items'), item, amount = el.val();

                for (var i = 0; i < items.length; i++) {
                    if (items[i].id == pid) {
                        item = items[i];
                        item.amount = el.val();
                        item.summ = ((+item.price.replace(',', '.')) * (+item.amount)).toFixed(2).replace('.', ',');
                        items[i] = item;
                        this.model.set('items', items);
                        el.parents('td').find('.amount').val(item.amount);
                        el.parents('tr').find('.summa').html(item.summ);
                        break;
                    }
                }

                item && this.trigger('amountChange', {id: pid, amount: item.amount, el: el})

            },

            decreaseAmount: function(e, amount) {
                var el = $(e.currentTarget), pid = el.parents('tr').data('id'), items = this.model.get('items'), item, amount = amount ||
                        1;

                if (el.hasClass('icon_disabled_yes')) return;

                for (var i = 0; i < items.length; i++) {
                    if (items[i].id == pid) {
                        item = items[i];
                        item.amount = (+item.amount) - amount;
                        if (item.amount < this._minItemAmount) item.amount = this._minItemAmount;
                        item.summ = ((+item.price.replace(',', '.')) * (+item.amount)).toFixed(2).replace('.', ',');
                        items[i] = item;
                        this.model.set('items', items);
                        el.parents('td').find('.amount').val(item.amount);
                        el.parents('tr').find('.summa').html(item.summ);
                        break;
                    }
                }

                item && this.trigger('amountChange', {id: pid, amount: item.amount, el: el})
            },

            showBigCountWarning: function() {
                this.$el.find('.count-warning').show();
            },

            initialize: function() {
                var that = this;
                orderId = this.model.get('orderId'); //Надо будет переделать на свойство глобально объекта
                $.get('/order/' + orderId + '/count/', function(data) {
                        data.count > 20 && that.showBigCountWarning()
                    }, 'json');
                this.model.bind('change', this.render, this);
                this.render();
                this.on('amountChange', this.amountChange, this);
                this.changedItems = {};
                this.xhr = this.fetchData();
                controller.on('route', this.onRoute, this);
            },

            _amountChangeUrl: function(id) {
                return '/order/' + this.model.get('orderId') + '/update/' + id + '/'
            },

            amountChange: function(item) {

                var that = this;

                $.post(this._amountChangeUrl(item.id), {amount: item.amount}, 'json');

                this.changedItems[item.id] && clearTimeout(this.changedItems[item.id]);

                this.changedItems[item.id] = setTimeout(function() { that.flash(item) }, 1000);
            },

            flash: function(item) {
                var tr = item.el.parents('tr').addClass('flash'), icons = item.el.parents('tr').find('.icon').addClass('icon_disabled_yes'), input = item.el.parents('tr').find('.amount').prop('disabled',
                        true);
                setTimeout(function() { alert('Количество товара изменено'); }, 2000)
                setTimeout(function() {
                    tr.removeClass('flash');
                    icons.removeClass('icon_disabled_yes');
                    input.prop('disabled', false)
                }, 2100);
                $.get('/order/' + this.model.get('orderId') + '/', function(data) {
                    $('.weight').text(data.weight + ' кг.');
                    $('.price').text(data.price);
                    $('.price-rub').text(data.price_rub)
                }, 'json')
            },

            rezerv: function() {
                $.post('/order/new/undraft/', {orderId: this.model.get('orderId')}, function() {
                    controller.navigate('', {trigger: true});
                    alert('Черновик заказа отправлен менеджеру');
                }, 'json');
            },

            save: function() {
                $.cookie('saved', '1');
                controller.navigate('/', {trigger: true});
                alert('Черновик запроса от ' + this.model.get('date') + ' сохранен');
            },

            deleteItem: function(event) {
                var id = $(event.currentTarget).parents('tr').data('id');
                if (id && confirm('Вы точно хотите удалить позицию?')) {
                    var that = this;
                    $.get('/order/' + this.model.get('orderId') + '/delete/' + id + '/', function(data) {
                        if (data && data.error) alert(data.error.text);
                        that.model.get('items').length ?
                            that.fetchData() :
                            controller.navigate('#new_order', {trigger: true});
                        alert('Позиция удалена');
                    });
                }
            },

            itemInfo: function(event) {
                var id = $(event.currentTarget).parents('tr').data('id'), items = this.model.get('items'), item;

                if (id) {

                    for (var i = 0; i < items.length; i++) {
                        if (items[i].id == id) {
                            item = items[i];
                            break;
                        }
                    }

                    new Popup({contentView: ItemAdditionalInfoView, contentModel: new Backbone.Model(item)});
                }
            },

            rowCount: 3,

            sortRule: 'row_num',

            showTrobber: function() {
                this.$el.find('.orderforming__trobber-holder').show();
            },

            hideTrobber: function() {
                this.$el.find('.orderforming__trobber-holder').hide();
            },

            render: function() {
                this.undelegateEvents();
                var items = this.model.get('items'), that = this;

                items.sort(function(a, b) {
                    if (that.sortRule != 'name' && that.sortRule != 'special') {
                        a[that.sortRule] &&
                        a[that.sortRule].replace &&
                        (a[that.sortRule] = +a[that.sortRule].replace(',', '.'));
                        b[that.sortRule] &&
                        b[that.sortRule].replace &&
                        (b[that.sortRule] = +b[that.sortRule].replace(',', '.'));
                    }
                    if (a[that.sortRule] > b[that.sortRule]) return 1;
                    return -1;
                });

                //			if (items.length < this.rowCount) {
                //				for (var i = 0; i < this.rowCount - items.length; i++) {
                //					items.push({
                //						"name": "",
                //						"amount": "",
                //						"price": "",
                //						"discount": "",
                //						"summ": "",
                //						"average": "",
                //						"reccomended": "",
                //						"special": "",
                //                        link: ''
                //					});
                //					this.model.set('items', items);
                //				}
                //			}

                this.$el.html(this._template(this.model.toJSON()));
                this.$el.children('#orderlistcontent tr:odd').addClass('oddrow');
                this.$el.find('.header_sorting_yes').each(function(i, el) {
                    $(el).data('sorting') == that.sortRule && $(el).addClass('active');
                });
                this.delegateEvents();
                GLOBAL.bind('Close', this.undelegateEvents, this);
            }

        });

        var GroupListModel = Backbone.Model.extend({
            defaults: {
                groups: []
            }, url: function() { return '/groups/' + this.get('categoryId') + '/' }
        });

        var CategoryListModel = GroupListModel.extend({
            url: '/categorys/'
        });

        var ItemListModel = Backbone.Model.extend({
            initialize: function() {
                this.url = '/group/' + this.get('group') + '/' + this.get('orderId') + '/';
            }
        });

        var ItemHistoryModel = Backbone.Model.extend({
            initialize: function() {
                this.url = '/item/' + this.get('itemId') + '/' + this.get('orderId');
            },

            defaults: {
                header: "Добавление товара", amount: 0
            }
        });

        var PopupView = ANView.extend({

            model: new Backbone.Model(), //must be replaced

            key: function(event) {
                if (event.which == 27) GLOBAL.trigger('closePopups');
            },

            initialize: function(data) {
                GLOBAL.trigger('closePopups');
                GLOBAL.bind('closePopups', this.close, this);
                $(document).bind('keyup', this.key);
                this.model.bind('change', this.render, this);
                this.model.fetch();
                if (data) this.options = data;
                return this;
            },

            render: function() {
                var data = this.model.toJSON();
                //data.previous = JSON.parse(data.previous);
                $(this.el).html(this.template(data));
                this.defaultInput && $(this.defaultInput).focus();
                $(this.el).find('.good-item').eq(0).click();
                return this;
            }
        });

        var Popup = ANView.extend({

            template: JST.popup,

            initialize: function(options) {
                this.contentView = options.contentView;
                this.contentModel = options.contentModel;
                this.contentParams = options.contentParams || {};
                GLOBAL.on('closePopups', this.remove, this);
                this.render();
            },

            render: function() {
                var that = this, popup = $(this.template());
                $('.paranja').show().click(function() {
                    that.remove();
                    $(this).hide();
                });
                this.contentModel ?
                    new this.contentView({
                        el: popup.find('.popup__content'),
                        model: this.contentModel,
                        params: this.contentParams
                    }) :
                    new this.contentView({el: popup.find('.popup__content'), params: this.contentParams});
                this.$el.html(popup);
                this.$el.appendTo('body');
                popup.css({'margin-top': '-' + (popup.height() / 2 + 50) + 'px'});
            }
        });

        var ItemAdditionalInfoView = ANView.extend({

            initialize: function() {
                this.render()
            },

            render: function() {
                var json = this.model.toJSON();

                this.$el.html('<h1 class="popup__header">Дополнительная информация о товаре</h1>' +
                    '<div>Остаток по складу: ' +
                    (json.stock_amount || 'Нет') +
                    '</div>' +
                    '<div>В дороге: ' +
                    (json.amount_in_way || 'Нет') +
                    '</div>' +
                    '<div>Скорость продаж: ' +
                    json.average +
                    ' ' +
                    json.ed_izm +
                    ' в месяц</div>' +
                    '<div>Кратность коробок: ' +
                    json.amount_in_pack +
                    '</div>' +
                    '<div>Краткое описание применения: ' +
                    json.product_application +
                    '</div>');
            }

        });


        var ConfirmView = ANView.extend({

            _template: JST['confirm'],

            events: {
                'click .confirm__button-left': '_onLeftClick', 'click .confirm__button-right': '_onRightClick'
            },

            destruct: function() {
                $('.paranja').hide();
                this.remove();
            },

            attributes: {
                class: 'confirm'
            },

            initialize: function() {
                //GLOBAL.on('closePopups'. this.destruct, this);
            },

            _text: {
                left: 'Left', right: 'Right', text: 'Text'
            },

            _onLeftClick: function() {
                throw('Not implemented exception');
            },

            _onRightClick: function() {
                throw('Not implemented exception')
            },

            render: function() {
                $('.paranja').show();
                this.$el.html(this._template(this._text));
                $('body').append(this.$el);
            }

        });

        var Backorder = ANView.extend({

            events: {
                'submit .backorder__form': 'onSubmit'
            },

            onSubmit: function(e) {
                e.preventDefault();

                $('.backorder__error').text('').hide();
                $('.backorder__status').show();
                $('.backorder__file').hide();

                this.$el.find('form').ajaxSubmit({
                    success: function(data) {
                        if (data.error) {
                            $('.backorder__error').text(data.error || '').show();
                            $('.backorder__status').hide();
                            if (data.file) $('.backorder__file').show().attr('href', data.file);
                            return;
                        }
                        GLOBAL.trigger('closePopups');
                        setTimeout(function() {
                            controller.navigate('new_order/edit', {trigger: true});
                            alert("Заказ создан на основе загруженных остатков")
                        }, 500);
                    }, dataType: 'json'
                });

            },

            template: '<div class="backorder">' +
            '<div class="backorder__header">Загрузка остатков по складу</div>' +
            'Для создания нового черновика заказа, загрузите остатки по складу, на текущий момент. </br></br><a class="backorder__file-example" href="/static/stock_balance.xls">Скачать</a> пример файла остатков.' +
            '<div class="backorder__error"></div>' +
            '<a class="backorder__file">Скачать файл</a>' +
            '<div class="backorder__status">Идет загрузка файла&nbsp;&nbsp;&nbsp;<img src="/static/img/ajax-loader.gif"></div>' +
            '<div class="backorder__input">' +
            '<form class="backorder__form" method="POST" enctype="multipart/form-data" action="/test/">' +
            '<input class="backorder__file-input" name="file" type="file">' +
            '<div class="backorder__controls">' +
            '<a href="/" class="backorder__back">Отмена</a>' +
            '<input type="submit" class="backorder__submit" value="Загрузить">' +
            '</div>' +
            '</form>' +
            '</div>' +
            '</div>',

            initialize: function() {
                this.render();
            },

            render: function() {
                this.$el.html(this.template);
            }

        });

        var BackorderModel = OrderformingModel.extend({
            url: '/backorder/'
        });

        var BackorderView = OrderformingView.extend({
            _template: JST['backorder/main'],
            model: new BackorderModel,
            _minItemAmount: 0,
            _amountChangeUrl: function(id) {
                return '/backorder/item/' + id + '/update/'
            },
            deleteItem: function(event) {
                var id = $(event.currentTarget).parents('tr').data('id'), items = this.model.get('items'), item;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].id == id) {
                        item = items[i];
                        break;
                    }
                }
                if (!item || item.amount != 0) {
                    alert('В Backorder удалить можно только позиции с 0 в кол-ве');
                    return;
                }
                if (id && confirm('Вы точно хотите удалить позицию?')) {
                    var that = this;
                    $.get('/backorder/item/' + id + '/delete/', function(data) {
                        if (data && data.error) alert(data.error.text);
                        that.model.get('items').length ?
                            that.fetchData() :
                            controller.navigate('#new_order', {trigger: true});
                        alert('Позиция удалена');
                    });
                }
            }
        });

        var OrderformingAddView = PopupView.extend({

            model: GroupListModel,

            inputHelp: "Поиск группы товаров",

            events: {
                "click .good-item": "selectItem",
                "click .back": "back",
                "click #vybrat-button": "submitForm",
                "click #vybrat-otmena": "close",

                "focus #search-input": "inputFocus",
                "blur #search-input": "inputBlur",
                "keyup #search-input": "inputSearch"
            },

            template: JST['orderforming/add1'],

            back: function(e) {
                e.preventDefault();
                this.options.item.set('category', undefined);
                this.close();
            },

            submitForm: function() {
                this.selectedItem != undefined && this.options.item.set('group', this.selectedItem) && this.close()
            },

            inputFocus: function(event) {
                $(event.target).val() == this.inputHelp && $(event.target).val('');
            },

            inputBlur: function(event) {
                $(event.target).val() == '' && $(event.target).val(this.inputHelp);
            },

            inputSearch: function() {
                var val = $('#search-input').val().toLowerCase();

                $('.good-item').each(function() {
                    if ($(this).text().toLowerCase().indexOf(val) != -1) $(this).show(); else $(this).hide();
                });
            }

        });

        var OrderformingAddView_ = OrderformingAddView.extend({
            back: function(e) {
                e.preventDefault();
                this.options.item.set('group', undefined);
                this.close();
            },

            inputHelp: "Поиск по названию товара", submitForm: function(event) {
                if (this.selectedItem != undefined) {
                    this.options.item.set('itemId', this.selectedItem);
                    this.close();
                }
            }

        });

        var OrderformingAddView__ = OrderformingAddView.extend({
            template: JST['orderforming/add2'], defaultInput: "#quontity-input", back: function(e) {
                e.preventDefault();
                this.options.item.set('itemId', undefined);
                this.close();
            }, submitForm: function(event) {
                if ($('#quontity-input').val() != undefined) {
                    this.options.item.set('amount', $('#quontity-input').val());
                    this.close();
                }
            }

        });

        var OrderformingAddView___ = OrderformingAddView.extend({

            model: CategoryListModel,

            submitForm: function() {
                this.selectedItem != undefined && this.options.item.set('category', this.selectedItem) && this.close()
            }

        });

        var OrderformingEditView = OrderformingAddView.extend({
            template: JST['orderforming/add2'], defaultInput: "#quontity-input", submitForm: function(event) {
                var val;
                if (val = $('#quontity-input').val()) {
                    $.post(this.model.url + 'update/', {amount: val}, function(data) {
                            if (data.error) {
                                alert(data.error.text);
                                return;
                            }
                            GLOBAL.trigger('fetch');
                        }, 'json');
                    this.close();
                }
            }

        });

        var OrderSavedConfirm = ConfirmView.extend({
            _text: {
                text: "У вас есть черновик запроса в редактировании",
                left: "Продолжить редактирование",
                right: "Создать новый"
            }, _onLeftClick: function() {
                controller.navigate('new_order/edit', {trigger: true});
                this.destruct();
            }, _onRightClick: function() {
                var that = this;
                $.post('/order/new/delete/', function() {
                    controller.navigate('new-order', {trigger: true});
                    that.destruct();
                })
            }
        });

        var OrderAutomaticalySavedConfirm = ConfirmView.extend({
            _text: {
                text: "Черновик запроса был сохранен автоматически, на момент вашего выхода",
                left: "Продолжить редактирование",
                right: "Создать новый"
            }, _onLeftClick: function() {
                controller.navigate('new_order/edit', {trigger: true});
                this.destruct();
            }, _onRightClick: function() {
                var that = this;
                $.post('/order/new/delete/', function() {
                    controller.navigate('new-order', {trigger: true});
                    that.destruct();
                })
            }
        });

        return {
            init: function() {
                var that = this;
                controller = new Controller();

                this.menu = new Menu();
                Backbone.history.start();

                GLOBAL.on('closePopups', function() {
                    $('.paranja').hide();
                });

                $('body').on('click', '.not-implemented', notImplemented);
                try {
                    $('a[href=#' + Backbone.history.fragment + ']', that.menu.el).click();
                } catch (e) {}
            }
        }
    }();

    var NewOrderView = require('./src/views/new-order.js')

//} catch (e) {
//    alert('В программе произошла ошибка. Пожалуйста, перезагрузите страницу с приложением.')
//}
