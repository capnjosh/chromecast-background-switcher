(function($, window) {

    function chromecastBackgroundSwitcher() {}

    chromecastBackgroundSwitcher.prototype = {
        interval: undefined,
        switchEvery: 5000,
        list: [],
        queue: [],
        qeueuMax: 2,
        updateList: function(data) {

            var url,
                sift = /\((.*)\)/g;

            while (url = sift.exec(data)) {
                this.list.push(url[1]);
            }

        },
        init: function(data, options) {

            options = $.extend({
                callback: undefined,
                converter: undefined
            }, options);

            this.updateList(data);
            this.change(options);

        },
        change: function(options) {

            var __ = this;

            if (__.interval !== undefined) {
                clearInterval(__.interval);
            }

            function loadImage() {

                var index = Math.floor(Math.random() * __.list.length);

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

                        });
                }

            }

            loadImage();

            __.interval = setInterval(function() {

                loadImage();

            }, __.switchEvery);

        },
        stop: function() {

            if (this.interval !== undefined) {
                clearInterval(this.interval);
            }

        }
    };

    window.chromecastBackgroundSwitcher = new chromecastBackgroundSwitcher();

})(jQuery, window);
