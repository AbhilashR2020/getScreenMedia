(function(e){if("function"==typeof bootstrap)bootstrap("getscreenmedia",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeGetscreenmedia=e}else"undefined"!=typeof window?window.getscreenmedia=e():global.getscreenmedia=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
// getScreenMedia helper by @HenrikJoreteg
var getUserMedia = require('getusermedia');

module.exports = function (cb) {
    var constraints = {
            video: {
                mandatory: {
                    chromeMediaSource: 'screen'
                }
            }
        };
    var error;

    if (window.location.protocol === 'http:') {
        error = new Error('NavigatorUserMediaError');
        error.reason = 'HTTPS_REQUIRED';
        return cb();
    }

    if (!navigator.webkitGetUserMedia) {
        error = new Error('NavigatorUserMediaError');
        error.reason = 'NOT_SUPPORTED';
        return cb(error);
    }

    getUserMedia(constraints, cb);
};

},{"getusermedia":2}],2:[function(require,module,exports){
// getUserMedia helper by @HenrikJoreteg
var func = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);


module.exports = function (constraints, cb) {
    var options;
    var haveOpts = arguments.length === 2;
    var defaultOpts = {video: true, audio: true};

    // make constraints optional
    if (!haveOpts) {
        cb = constraints;
        constraints = defaultOpts;
    }

    // treat lack of browser support like an error
    if (!func) {
        // throw proper error per spec
        var error = new Error('NavigatorUserMediaError');
        error.reason = "NOT_SUPPORTED";
        return cb(error);
    }

    func.call(navigator, constraints, function (stream) {
        cb(null, stream);
    }, function (err) {
        err.reason = err.name || "PERMISSION_DENIED";
        cb(err);
    });
};

},{}]},{},[1])(1)
});
;