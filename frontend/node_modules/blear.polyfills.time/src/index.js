'use strict';


if (typeof navigator !== 'undefined') {
    var win = window;

    /* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */
    win.requestAnimationFrame = (function () {
        var timeLast = 0;

        return win.requestAnimationFrame ||
            win.webkitRequestAnimationFrame ||
            win.mozRequestAnimationFrame ||
            function (callback) {
                var timeCurrent = (new Date()).getTime(),
                    timeDelta;

                /* Dynamically set delay on a per-tick basis to match 60fps. */
                /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
                timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
                timeLast = timeCurrent + timeDelta;

                return setTimeout(function () {
                    callback(timeCurrent + timeDelta);
                }, timeDelta);
            };
    })();

    win.cancelAnimationFrame = (function () {
        return win.cancelAnimationFrame ||
            win.webkitCancelAnimationFrame ||
            win.mozCancelAnimationFrame ||
            win.clearTimeout;
    })();
}