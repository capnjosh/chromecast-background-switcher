(function($, window) {

    function chromecastBackgroundSwitcher() {}

    chromecastBackgroundSwitcher.prototype = {
        interval: undefined,
        switchEvery: 5000,
        list: [],
        updateList: function(data) {

            var __ = this,
                url,
                sift = /\((.*)\)/g;

            while (url = sift.exec(data)) {
                __.list.push(url[1]);
            }

        },
        init: function(data, options) {

            var __ = this;

            options = $.extend({
                callback: undefined,
                converter: undefined
            }, options);

            __.updateList(data);
            __.change(options);

        },
        loadImage: function(options) {

            var __ = this,
                index = Math.floor(Math.random() * __.list.length);

            if (options.converter === undefined) {
                // Use URL

                if (typeof options.callback === 'function') {
                    options.callback({
                        url: __.list[index]
                    });
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
                                url: __.list[index]
                            }
                        }
                    )
                    .done(function(data) {

                        if (typeof options.callback === 'function') {
                            options.callback(data);
                        }

                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {

                        if (typeof options.callback === 'function') {
                            options.callback({
                                url: __.list[index],
                                success: false
                            });
                        }

                    });
            }

        },
        change: function(options) {

            var __ = this;

            if (__.interval !== undefined) {
                clearInterval(__.interval);
            }

            __.loadImage(options);

            __.interval = setInterval(function() {

                __.loadImage(options);

            }, __.switchEvery);

        },
        stop: function() {

            var __ = this;

            if (__.interval !== undefined) {
                clearInterval(__.interval);
            }

        }
    };

    window.chromecastBackgroundSwitcher = new chromecastBackgroundSwitcher();

})(jQuery, window);
