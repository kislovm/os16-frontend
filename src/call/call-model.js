module.exports = Backbone.Model.extend({

    defaults: {
        call_date: 1
    },

    set: function(key, value, options) {
        if (_.isObject(key) || key == null) {
            attrs = key;
            options = value;
        } else {
            attrs = {};
            attrs[key] = value;
        }

        for (attr in attrs) {
            if (attr == 'call_duration') {
                var callDuration = attrs['call_duration'];

                attrs['call_duration'] =
                    callDuration == 0 ?
                        callDuration + ' секунд' :
                        callDuration == 1 || callDuration > 4 ?
                            callDuration / 60 + ' минут' :
                            callDuration / 60 + ' минуты';

            }
        }

        return Backbone.Model.prototype.set.call(this, attrs, options);
    }

});
