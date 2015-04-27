module.exports = Backbone.View.extend({

    template: require('./popup.jade'),

    events: {
        'click .popup__cross': 'close'
    },

    initialize: function(options) {
        this.contentView = options.contentView;
        this.contentModel = options.contentModel;
        this.contentParams = options.contentParams || {};
        GLOBAL.on('closePopups', this.close, this);
        this.render();
    },

    render: function() {
        var that = this, popup = $(this.template());

        $('.paranja').show().click(function() {
            that.close();
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
        $('body').css({ 'overflow': 'hidden' });
        popup.css({'margin-top': '-' + (popup.height()) + 'px'});
    },

    close: function() {
        $('.paranja').hide();
        $('body').css({ 'overflow': 'auto' });
        this.remove();
    }
});
