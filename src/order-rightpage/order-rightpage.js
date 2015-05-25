var BaseView = require('../base-view/base-view.js');

var OrderListItemView = require('../order-list-item/order-list-item.js');

module.exports = BaseView.extend({

    events: {
        'click .order__list-sort': '_sort',
        'click .order__add': '_add'
    },

    _template: require('./order-rightpage.jade'),

    initialize: function() {
        this.collection.on('add', this._onAdd, this);
        this.collection.on('remove', this._onDelete, this);
        this.views = [];
        this.render();
    },

    _onDelete: function(deleted, collection) {
        var id = parseInt(deleted.get('row_num'));

        collection.each(function(model) {
            var rowId = parseInt(model.get('row_num'));

            if(rowId > id) model.set('row_num', --rowId);
        });
    },

    _add: function() {
        this.item = new Backbone.Model();
        try {
            this.addView_.close();
        } catch (e) {}
        this.addView_ = new OrderformingAddView___({
            item: this.item, model: new CategoryListModel({
                searchString: "Поиск категории товаров"
            })

        });
        this.$el.append($(this.addView_.el));
        this.item.bind('change', this.changeAddView, this);
    },

    changeAddView: function() {
        var amount;
        if (amount = this.item.get('amount')) {
            var that = this;
            $.post(
                '/order/' + this.model.get('id') + '/add/' + this.item.get('itemId') + '/',
                { amount: amount },
                function(data) {
                    if (data.error) {
                        alert(data.error.text);
                        return;
                    }

                    if (that.model.get('id') == 0 &&
                            data.orderId != undefined && that.model.get('id') != data.orderId)
                        window.location.hash = '#order/' + data.orderId;

                    else
                        that.model.fetch() &&
                            alert('Товар добавлен');
                },
                'json');
        } else if (this.item.get('itemId') != undefined) {
            this.addView_ = new OrderformingAddView__({
                item: this.item, model: new ItemHistoryModel({
                    itemId: this.item.get('itemId'),
                    orderId: this.model.get('id')
                })
            });
            this.$el.append($(this.addView_.el));
        } else if (this.item.get('group') != undefined) {
            this.addView_ = new OrderformingAddView_({
                item: this.item, model: new ItemListModel({
                    group: this.item.get('group'), searchString: "Поиск по названию",
                    orderId: this.model.get('id')
                })
            });
            this.$el.append($(this.addView_.el));
        } else if (this.item.get('category') !== undefined) {
            this.addView_ = new OrderformingAddView({
                item: this.item,
                model: new GroupListModel({
                    searchString: "Поиск группы товаров",
                    categoryId: this.item.get('category')
                })
            });
            this.$el.append($(this.addView_.el));
        } else {
            this.addView_ = new OrderformingAddView___({
                item: this.item, model: new CategoryListModel({searchString: "Поиск категории товаров"})
            });
            this.$el.append($(this.addView_.el));
        }

    },

    _onAdd: function(model) {

        model.set('orderId', this.model.get('id'));

        var view = new OrderListItemView({
            model: model
        });

        this.views.push(view);

        this.$el.find('.order__list-body').append(view.$el);
    },

    _sortingParam: 'row_num',

    _reversed: false,

    _sort: function(e)  {
        var sortingParam = $(e.currentTarget).data('sort');
        var tbody = this.$el.find('tbody');

        tbody.find('tr').detach();

        if (this._sortingParam != sortingParam) {
            this._reversed = true;
        }

        if (this._sortingParam == sortingParam && !this._reversed) {
            tbody.append(
                _
                    .sortBy(this.views,
                    function (view) {
                        return parseInt(view.model.get(sortingParam));
                    })
                    .map(function (view) {
                        return view.$el
                    })
                    .reverse());
        } else {
            tbody.append(
                _
                    .sortBy(this.views,
                    function (view) {
                        return parseInt(view.model.get(sortingParam));
                    })
                    .map(function (view) {
                        return view.$el
                    }));
        }

        this._sortingParam = sortingParam;
        this._reversed = !this._reversed;
    },

    render: function() {
        this.$el.html(this._template(this.model.toJSON()));
        this.$el.find('.order__list').fixedHeaderTable({ footer: false, cloneHeadToFoot: false, fixedColumn: false });

        this.collection.each(function (model) {
            this._onAdd(model);
        }, this);
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

var PopupView = Backbone.View.extend({

    model: new Backbone.Model(), //must be replaced

    selectItem: function(event) {
        this.selectedItem = $(event.target).data('id');
        $(event.currentTarget).siblings().removeClass('selected').blur();
        $(event.currentTarget).addClass('selected').attr("tabindex", -1).focus();
    },

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