module.exports = Backbone.View.extend({

    _template: require('./new-order-upload-file.jade'),

    events: {
        'change .new-order__file-upload-input' : '_onFileChoose',
        'submit .new-order__file-upload-form' : '_onFileSubmit'
    },

    _onUploadStart: function() {
        this._fileInput.prop('disabled', true);
        this._uploadButton.prop('disabled', true);
        this._uploadTrobber.show();
    },

    _onUploadFinish: function() {
        this._fileInput.prop('disabled', false);
        this._uploadButton.prop('disabled', false);
        this._uploadTrobber.hide();
    },

    _onFileSubmit: function(e) {
        var _this = this;

        e.preventDefault();

        this._fileUploadForm.ajaxSubmit({
            beforeSubmit: function() {
                _this._onUploadStart();
            },
            success: function(data) {
                if (data.error)
                    _this._showError(data.error);
                else {
                    _this.model.set({
                        'uploaded': true,
                        'products': data.data,
                        'sequence': data.sequence
                    });
                }
                _this._onUploadFinish();
            },
            error: function() {
                _this._showError('что-то пошло не так, пожалуйста, попробуйте обновить страницу и загрузить файл еще раз.');
                _this._onUploadFinish();
            },
            dataType: 'json'
        });


    },

    _onFileChoose: function() {
        var val = this._fileInput.val(),
            error = '';

        if (!val) {
            this._toggleUploadButton(true);
        } else if(val.match('.xlsx|.xls')) {
            this._toggleUploadButton(false);
        } else {
            this._toggleUploadButton(true);
            error = 'файл должен был в формате XLS или XLSX';
        }

        this._showError(error);
    },

    _showError: function(error) {
        error ?
            this._error.html('Ошибка:&nbsp;' + error) :
            this._error.html('');
    },

    _toggleUploadButton: function(disabled) {
        this._uploadButton.prop('disabled', disabled);
    },

    initialize: function() {
        this.render();
        this.model.on('change', this._toggleDisabled, this);
    },

    _toggleDisabled: function() {
        var content = this.$el.find('.new-order__content'),
            disabled = this._isDisabled();

        disabled ?
            content.slideUp() :
            content.slideDown();

        this.$el.toggleClass('disabled', disabled);
    },

    _isDisabled: function() {
        return this.model.get('uploaded')
    },

    render: function() {
        this.$el.html(this._template());

        this._fileInput = this.$el.find('.new-order__file-upload-input');
        this._uploadButton = this.$el.find('.new-order__file-upload-button');
        this._fileUploadForm = this.$el.find('.new-order__file-upload-form');
        this._error = this.$el.find('.new-order__error');
        this._uploadTrobber = this.$el.find('.new-order__upload-trobber');

    }

});

