module.exports = Backbone.Model.extend({

    url: function() {
        return '/order/' + this.get('id') + '/'
    }

});