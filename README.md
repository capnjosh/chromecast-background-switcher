chromecast-background-switcher
==============================

This is inspired by the Chromecast screensaver.

See [demo](http://htmlpreview.github.io/?https://github.com/capnjosh/chromecast-background-switcher/blob/master/demo.html).

Bookmarklet Version:

    javascript:(function(g,h,k){function e(){null!==b&&clearInterval(b);b=setTimeout(function(){a.style.display="block";chromecastBackgroundSwitcher.restart();clearInterval(b);b=null},h)}function f(){a.style.display="none";chromecastBackgroundSwitcher.pause();e()}var c=document.getElementsByTagName("html")[0],d=document.getElementsByTagName("body")[0];c.style.width="100%";c.style.height="100%";d.style.width="100%";d.style.height="100%";var a=document.createElement("div");a.style.position="fixed";a.style.top="0px";a.style.left="0px";a.style.width="100%";a.style.height="100%";a.style.zIndex="2147483647";a.style.display="none";d.appendChild(a);var b=null,c=document.createElement("script");c.src=g;c.addEventListener("load",function(){var c;chromecastBackgroundSwitcher.init("https://cdn.rawgit.com/dconnolly/chromecast-backgrounds/master/backgrounds.json",{interval:k,callback:function(b){void 0!==c&&a.removeChild(c);b.render.setAttribute("width","100%");b.render.setAttribute("height","100%");c=b.render;a.appendChild(b.render)}});chromecastBackgroundSwitcher.pause();document.addEventListener("keyup",f);document.addEventListener("mouseup",f);e()});document.getElementsByTagName("head")[0].appendChild(c)})("https://cdn.rawgit.com/capnjosh/chromecast-background-switcher/master/chromecast-background-switcher.js",6E4,6E4);

Bookmarklet Behavior:
  * Starts screensaver after 1 minute of inactivity. To resume activity, press any key or click your mouse button.
  * Switches background every 1 minute.
