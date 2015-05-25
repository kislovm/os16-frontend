module.exports = Backbone.Model.extend({

    save: function() {
        return $.post(this.url(), { amount: this.get('amount') }, 'json');
    },

    url: function() {
        return '/order/' + this.get('orderId') + '/update/' + this.get('id') + '/';
    }

});