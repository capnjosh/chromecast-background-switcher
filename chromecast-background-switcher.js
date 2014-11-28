(function() {

    function chromecastBackgroundSwitcher() {

        var self = this;
        var list;
        var timer;
        var queue = [];
        var options = {
            interval: 60000,
            callback: function() {}
        };

        this.init = function( url, interval, callback ) {

            self.pause();

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {

                if ( xhr.readyState === 4 && xhr.status === 200 ) {
                    list = JSON.parse( xhr.responseText );
                    options.interval = interval || options.interval;
                    options.callback = callback || options.callback;
                    switchImage();
                }

            };

            xhr.open( 'GET', url );
            xhr.send();

        };

        this.pause = function() {

            if ( timer !== undefined ) {
                clearInterval( timer );
            }

        };

        this.restart = function() {

            self.pause();
            switchImage();

        };

        function loadImage() {

            // Get random image
            var image = list[ Math.floor( Math.random() * list.length ) ];

            // Prevent request
            if ( 'cache' in image ) {
                return image;
            }

            // Cache it
            image[ 'cache' ] = new Image();
            image[ 'cache' ].src = image.url;
            return image;

        }

        function switchImage() {

            if ( queue.length === 0 ) {
                // Initial image
                options.callback( loadImage() );
                // Initial queue
                queue.push( loadImage() );
            }
            else {
                // From restart
                options.callback( queue.shift() );
            }

            // Queue always maintains 2 sources
            queue.push( loadImage() );

            // Start interval
            timer = setInterval( function() {

                options.callback( queue.shift() );
                queue.push( loadImage() );

            }, options.interval );

        }
    }

    window.chromecastBackgroundSwitcher = new chromecastBackgroundSwitcher();

}());
