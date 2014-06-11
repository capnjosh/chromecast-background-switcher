(function($, window) {

    function chromecastBackgroundSwitcher() {}

    chromecastBackgroundSwitcher.prototype = {
        intervalHandle: undefined,
        list: [],
        init: function(data, options) {

            var __ = this;

            options = $.extend({
                callback: undefined,
                converter: undefined,
                interval: 60000
            }, options);

            __.list = data;
            __.change(options);

        },
        loadImage: function(options) {

            var __ = this,
                index = Math.floor(Math.random() * __.list.length);

            if (options.converter === undefined) {
                // Use URL

                if (typeof options.callback === 'function') {
                    __.list[index]['success'] = true;
                    options.callback(__.list[index]);
                }
            }
            else {
                // Use converter

                $.ajax
                    (
                        options.converter,
                        {
                            type: 'POST',
                            data: {
                                url: __.list[index].url
                            }
                        }
                    )
                    .done(function(data) {

                        $.extend(data, __.list[index]);

                        if (typeof options.callback === 'function') {
                            options.callback(data);
                        }

                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {

                        if (typeof options.callback === 'function') {
                            options.callback(jqXHR.responseText);
                        }

                    });
            }

        },
        change: function(options) {

            var __ = this;

            if (__.intervalHandle !== undefined) {
                clearInterval(__.intervalHandle);
            }

            __.loadImage(options);

            __.intervalHandle = setInterval(function() {

                __.loadImage(options);

            }, options.interval);

        },
        stop: function() {

            var __ = this;

            if (__.intervalHandle !== undefined) {
                clearInterval(__.intervalHandle);
            }

        }
    };

    window.chromecastBackgroundSwitcher = new chromecastBackgroundSwitcher();

})(jQuery, window);
