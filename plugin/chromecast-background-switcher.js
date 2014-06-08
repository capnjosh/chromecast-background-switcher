(function($, window) {

    function chromecastBackgroundSwitcher() {}

    chromecastBackgroundSwitcher.prototype = {
        interval: undefined,
        switchEvery: 2000,
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
        init: function(data) {

            this.updateList(data);
            this.change();

        },
        change: function() {

            var __ = this;

            if (__.interval !== undefined) {
                clearInterval(__.interval);
            }

            __.interval = setInterval(function() {

                var index = Math.floor(Math.random() * __.list.length);

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
