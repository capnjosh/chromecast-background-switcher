(function( cbsScriptUrl, startAfter, switchEvery ) {

    var html = document.getElementsByTagName( 'html' )[ 0 ];
    var body = document.getElementsByTagName( 'body' )[ 0 ];

    html.style.width = '100%';
    html.style.height = '100%';
    body.style.width = '100%';
    body.style.height = '100%';

    var screensaver = document.createElement( 'div' );
    screensaver.style.position = 'fixed';
    screensaver.style.top = '0px';
    screensaver.style.left = '0px';
    screensaver.style.width = '100%';
    screensaver.style.height = '100%';
    screensaver.style.zIndex = '2147483647';
    screensaver.style.display = 'none';
    body.appendChild( screensaver );

    var inactivityTracker = null;

    var cbsScript = document.createElement( 'script' );
    cbsScript.src = cbsScriptUrl;
    cbsScript.addEventListener( 'load', function() {

        var previousImage;

        chromecastBackgroundSwitcher.init(
            'https://cdn.rawgit.com/dconnolly/chromecast-backgrounds/master/backgrounds.json',
            {
                interval: switchEvery,
                callback: function( image ) {
                    if ( previousImage !== undefined ) {
                        screensaver.removeChild( previousImage );
                    }
                    image.render.setAttribute( 'width', '100%' );
                    image.render.setAttribute( 'height', '100%' );
                    previousImage = image.render;
                    screensaver.appendChild( image.render );
                }
            }
        );
        chromecastBackgroundSwitcher.pause();
        detectActivity();
        detectInactivity();

    } );
    document.getElementsByTagName( 'head' )[ 0 ].appendChild( cbsScript );

    function detectInactivity() {

        if ( inactivityTracker !== null ) {
            clearInterval( inactivityTracker );
        }

        inactivityTracker = setTimeout( function() {

            screensaver.style.display = 'block';
            chromecastBackgroundSwitcher.restart();
            clearInterval( inactivityTracker );
            inactivityTracker = null;

        }, startAfter );

    }

    function stopScreensaver() {

        screensaver.style.display = 'none';
        chromecastBackgroundSwitcher.pause();
        detectInactivity();

    }

    function detectActivity() {

        document.addEventListener( 'keyup', stopScreensaver );
        document.addEventListener( 'mouseup', stopScreensaver );

    }

}( 'https://cdn.rawgit.com/capnjosh/chromecast-background-switcher/master/chromecast-background-switcher.js', 60000, 60000 ));
