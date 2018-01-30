/*!
 * Share v1.0.1
 * Share current page on Facebook, Twitter, Google+ and WhatsApp
 * http://mogusbi.co.uk
 *
 * Written by Mo Gusbi
 */
; (function ($, window, document, undefined) {
    'use strict';

    var pluginName = 'share';

    function Plugin(element, options) {
        this.element = element;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            var _this = this;

            $(_this.element).on('click', function () {
                _this.click();

                return this;
            });
        },
        click: function () {
            var channel = $(this.element).data('share'),
                 url = $(this.element).data('url');
            switch (channel) {
                case 'facebook':
                    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, channel, 'width=625,height=435');
                    break;
                case 'twitter':
                    window.open('https://twitter.com/share?url=' + url, channel, 'width=625,height=435');
                    break;
                case 'google-plus':
                    window.open('https://plus.google.com/share?url=' + url, channel, 'width=520,height=580');
                    break;
                case 'linkedin':
                    window.open('https://www.linkedin.com/shareArticle?mini=true&url='+ url ,channel,'width=625,height=435');
                    break;
            }
        }
    });

    $.fn[pluginName] = function () {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this));
            }
        });

        return this;
    };
})(jQuery, window, document);


