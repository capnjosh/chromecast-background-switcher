(function( undefined ) {

    function chromecastBackgroundSwitcher() {

        var self = this;
        var list;
        var timer;
        var queue = [];
        var queueDOM;
        var defaultOptions = {
            interval: 60000,
            type: 'image',
            callback: function() {}
        };
        var settings;

        this.init = function( url, userOptions ) {

            self.pause();

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {

                if ( xhr.readyState === 4 && xhr.status === 200 ) {
                    list = JSON.parse( xhr.responseText );
                    settings = extend( {}, defaultOptions, userOptions );
                    preheat();
                    startEngine();
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
            startEngine();

        };

        // From http://underscorejs.org/#extend
        function extend( obj ) {

            var source, prop;

            for ( var i = 1, length = arguments.length; i < length; i++ ) {
                source = arguments[ i ];
                for ( prop in source ) {
                    if ( hasOwnProperty.call( source, prop ) ) {
                        obj[ prop ] = source[ prop ];
                    }
                }
            }

            return obj;

        }

        function preheat() {

            // Container for background type
            if ( settings.type === 'background' ) {
                queueDOM = document.createElement( 'div' );
                // display: none; prevents images from loading.
                queueDOM.style.width = '0px';
                queueDOM.style.height = '0px';
                document.getElementsByTagName( 'body' )[0].appendChild( queueDOM );
            }

        }

        function loadImage() {

            // Get random image
            var image = list[ Math.floor( Math.random() * list.length ) ];

            // Prevent request
            if ( 'render' in image ) {
                return image;
            }

            image[ 'render' ] = undefined;

            switch ( settings.type ) {
                case 'image':
                    image.render = new Image();
                    image.render.src = image.url;
                    break;
                case 'background':
                    image.render = document.createElement( 'div' );
                    image.render.style.backgroundImage = 'url("' + image.url + '")';
                    queueDOM.appendChild( image.render );
                    break;
            }

            return image;

        }

        function startEngine() {

            if ( queue.length === 0 ) {
                // Initial image
                settings.callback( loadImage() );
                // Initial queue
                queue.push( loadImage() );
            }
            else {
                // From restart
                settings.callback( queue.shift() );
            }

            // Queue always maintains 2 sources
            queue.push( loadImage() );

            // Start interval
            timer = setInterval( function() {

                settings.callback( queue.shift() );
                queue.push( loadImage() );

            }, settings.interval );

        }
    }

    window.chromecastBackgroundSwitcher = new chromecastBackgroundSwitcher();

}());
