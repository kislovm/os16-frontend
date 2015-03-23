module.exports = Backbone.View.extend({

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
        if(this.$el.find('.item-select').val() == 'Товар') return;

        this.itemModel.set({
            'client_product_name': this.$el.find('.item-select option:selected').text(),
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
