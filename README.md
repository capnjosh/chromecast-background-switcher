chromecast-background-switcher
==============================

This is inspired by the Chromecast screensaver.

See [demo](http://htmlpreview.github.io/?https://github.com/capnjosh/chromecast-background-switcher/blob/master/demo.html).

**Bookmarklet**:

    javascript:(function(g,h,k){function e(){null!==b&&clearInterval(b);b=setTimeout(function(){a.style.display="block";chromecastBackgroundSwitcher.restart();clearInterval(b);b=null},h)}function f(){a.style.display="none";chromecastBackgroundSwitcher.pause();e()}var c=document.getElementsByTagName("html")[0],d=document.getElementsByTagName("body")[0];c.style.width="100%";c.style.height="100%";d.style.width="100%";d.style.height="100%";var a=document.createElement("div");a.style.position="fixed";a.style.top="0px";a.style.left="0px";a.style.width="100%";a.style.height="100%";a.style.zIndex="2147483647";a.style.display="none";d.appendChild(a);var b=null,c=document.createElement("script");c.src=g;c.addEventListener("load",function(){var c;chromecastBackgroundSwitcher.init("http://bin.puppynkitty.com/chromecast-backgrounds.json",{interval:k,callback:function(b){void 0!==c&&a.removeChild(c);b.render.setAttribute("width","100%");b.render.setAttribute("height","100%");c=b.render;a.appendChild(b.render)}});chromecastBackgroundSwitcher.pause();document.addEventListener("keyup",f);document.addEventListener("mouseup",f);e()});document.getElementsByTagName("head")[0].appendChild(c)})("http://bin.puppynkitty.com/chromecast-background-switcher.js",6E4,6E4);

**Bookmarklet Behavior**:
  * Starts screensaver after 1 minute of inactivity. To resume activity, press any key or click your mouse button.
  * Switches background every 1 minute.

**Bookmarklet Notes**:
  * The default configuration will have issues when loaded on a secure site. This is caused by the dependencies loaded from a non secure site which results in [_Mixed Content_](https://developer.mozilla.org/en-US/docs/Security/MixedContent). Dependencies are loaded from my personal website which doesn't have SSL.
  * You can allow the script to run by clicking the gray shield icon on Firefox or Chrome or from the mixed content warning prompt on Internet Explorer. After allowing it, you might need to refresh then load the script again. :\
  * Another solution is to download the 2 dependencies (**chromecast-backgrounds.json** and **chromecast-background-switcher.js**) then upload both to a secure site, update the bookmarklet code, minify it, and update your bookmark.
  * You can use https://rawgit.com/ but wouldn't recommend it (I originally had the dependencies using it).
  * Or assign a variable with the contents of **chromecast-backgrounds.json** and put it inside the self executing function together with **chromecast-background-switcher.js** and have a self contained bookmarklet. It's going to be HUGE though. :|
  * I'll get an SSL certificate someday. :)
