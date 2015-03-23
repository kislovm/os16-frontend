module.exports = Backbone.View.extend({

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
        popup.css({'margin-top': '-' + (popup.height() / 2) + 'px'});
    }
});
