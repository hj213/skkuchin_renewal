/**
 * request class
 * @author ydr.me
 * @create 2018-09-30 08:28
 * @update 2018-09-30 08:28
 */


'use strict';
var http = require('http');
var https = require('https');
var kernel = require('request');
var console = require('blear.node.console');
var debug = require('blear.node.debug');
var Class = require('blear.classes.class');
var typeis = require('blear.utils.typeis');
var object = require('blear.utils.object');

var Request = Class.ify(kernel.Request).extend({
    constructor: function (options, beforeRequest) {
        var the = this;
        the.httpModules = {
            'http:': overideHttpModule(the, http),
            'https:': overideHttpModule(the, https)
        };

        var requestedList = [];
        var debugHead = function (method, url) {
            if (!options.debug) {
                return;
            }

            console.log();
            console.log();
            console.infoWithTime(method, url);
        };
        var debugInfo = function (event, val) {
            if (!options.debug) {
                return;
            }

            debug.info(event, val);
        };


        the.on('request', function (req) {
            requestedList.push(the.href);
            debugHead(the.method, the.href);
            debugInfo('request headers', the.headers);
            debugInfo('request query', options.qs);

            if (options.body) {
                debugInfo('request body', options.body);
            }

            if (options.form) {
                debugInfo('request form', options.form);
            }

            if (options.formData) {
                debugInfo('request form', options.formData);
            }
        });

        the.on('error', function (error) {
            debugHead(the.method, the.href);
            debugInfo('request error', error);
        });

        the.on('response', function (res) {
            debugHead(the.method, the.href);
            debugInfo('response statusCode', res.statusCode);
            debugInfo('response headers', res.headers);
        });

        the.on('complete', function (res, body) {
            debugHead(the.method, the.href);
            debugInfo('response body', body);
        });

        the.href = requestedList[requestedList.length - 1];
        the.requestedList = requestedList;
        Request.parent(the, options);
    }
});

module.exports = Request;

// =================================================
// =================================================
// =================================================

/**
 * 重写 http 模式，以便在请求过程中监视
 * @param client
 * @param original
 */
function overideHttpModule(client, original) {
    var overided = object.assign({}, original);
    var originalRequest = original.request;

    overided.request = function (options, cb) {
        client.emit('beforeRequest');
        return originalRequest(options, cb);
    };

    return overided;
}

