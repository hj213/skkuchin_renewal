/**
 * request main
 * @author ydr.me
 * @create 2017-04-07 16:24
 * @update 2018年09月30日09:22:59
 */


'use strict';

var object = require('blear.utils.object');
var access = require('blear.utils.access');
var typeis = require('blear.utils.typeis');
var fun = require('blear.utils.function');

var Request = require('./request.class');
var pkg = require('../package.json');

var defaults = {
    // url 查询参数
    query: null,
    // string
    body: null,
    // application/json
    json: null,
    // application/x-www-form-urlencoded
    form: null,
    // multipart/form-data
    formData: null,
    headers: {},
    cookies: {},
    url: '/',
    proxy: null,
    // 请求方法
    method: 'get',
    // 响应编码
    encoding: 'utf8',
    // 最大 30x 跳转次数
    maxRedirects: 10,
    // 超时时间：15 秒
    timeout: 15000,
    // 是否模拟浏览器
    browser: {
        accept: ' text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-encoding': 'gzip',
        'accept-language': 'zh-cn',
        'user-agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 ' +
            '(KHTML, like Gecko) Version/12.1.1 Safari/605.1.15 ' +
            pkg.name + '/' + pkg.version,
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        host: true,
        origin: true,
        // 经典错误，应为 referrer
        referer: true,
        // 是否保持 cookie
        cookie: true
    },
    // 是否严格 SSL
    strictSSL: false,
    // 是否调试模式
    debug: false
};

function request(options, callback) {
    var args = access.args(arguments);
    var browser = options.browser;

    if (browser) {
        options.browser = object.assign({}, defaults.browser, options.browser);
    }

    options = object.assign({}, defaults, options);
    options.method = options.method.toUpperCase();

    if (typeis.Object(options.browser)) {
        options.headers = object.assign({}, {
            accept: options.browser.accept,
            'accept-encoding': options.browser['accept-encoding'],
            'accept-language': options.browser['accept-language'],
            'user-agent': options.browser['user-agent'],
            'cache-control': options.browser['cache-control'],
            'pragma': options.browser['pragma']
        }, options.headers);
    }

    if (typeis.Object(options.cookies)) {
        options.headers.cookie = options.headers.cookie || '';
        var cookies = [];
        object.each(options.cookies, function (key, val) {
            cookies.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
        });
        options.headers.cookie += cookies.join(';');
    }

    var json = options.json;
    var body = options.body;

    if (typeis.Object(json)) {
        options.body = JSON.stringify(json);
        options.headers['content-type'] = 'application/json';
    }
    // compact
    else if (typeis.Object(body)) {
        options.body = JSON.stringify(body);
    }

    if (options.encoding === 'binary') {
        options.encoding = null;
        options.callback = fun.ensure(callback);
    }

    if (args.length === 2
        && typeis.Function(callback)
        && !typeis.Function(options.callback)
    ) {
        options.callback = callback;
    }

    var response = options.callback;

    if (typeis.Function(response)) {
        options.callback = function (err, res, body) {
            if (err) {
                return response.call(this, err);
            }

            var headers = res.headers;
            res.cookies = (headers['set-cookie'] || []).map(function (val) {
                var o = {};
                val.split(/;\s+/).forEach(function (slice, index) {
                    var group = slice.split('=');
                    var key = decodeURIComponent(group[0]);
                    var val = decodeURIComponent(group[1] || '');

                    // desc
                    if (index) {
                        o[key.toLowerCase()] = val;
                    } else {
                        o.key = key;
                        o.val = val;
                    }
                });
                return o;
            });

            response.call(
                this,
                null,
                options.method === 'HEAD' ? res && res.headers : body,
                res
            );
        };
    }

    // https://www.npmjs.com/package/request#requestoptions-callback
    var req = new Request({
        // object containing querystring values to be appended to the uri
        qs: options.query,
        // useQuerystring - if true, use querystring to stringify and parse querystrings,
        // otherwise use qs (default: false). Set this option to true if you need arrays to be serialized as
        // foo=bar&foo=baz instead of the default foo[0]=bar&foo[1]=baz.
        useQuerystring: true,
        // sets body to JSON representation of value and adds Content-type: application/json header.
        // Additionally, parses the response body as JSON.
        json: false,
        body: options.body,
        form: options.form,
        formData: options.formData,
        headers: options.headers,
        url: options.url,
        // an HTTP proxy to be used. Supports proxy Auth with Basic Auth,
        // identical to support for the url parameter
        // (by embedding the auth info in the uri)
        proxy: options.proxy,
        method: options.method,
        encoding: options.encoding,
        // follow HTTP 3xx responses as redirects (default: true).
        // This property can also be implemented as function which gets response
        // object as a single argument and should return true if redirects
        // should continue or false otherwise.
        followRedirect: true,
        // the maximum number of redirects to follow (default: 10)
        maxRedirects: options.maxRedirects,
        timeout: options.timeout,
        strictSSL: options.strictSSL,
        callback: options.callback,
        // if true, add an Accept-Encoding header to request compressed content encodings
        // from the server (if not already present) and decode supported content encodings
        // in the response. Note: Automatic decoding of the response content is performed
        // on the body data returned through request (both through the request stream and
        // passed to the callback function) but is not performed on the response stream
        // (available from the response event) which is the unmodified http.IncomingMessage
        // object which may contain compressed data
        gzip: true,
        // if true, the request-response cycle (including all redirects) is timed at millisecond resolution.
        // When set, the following properties are added to the response object:
        time: true,
        debug: options.debug
    });

    req.on('beforeRequest', function () {
        var browser = options.browser;

        if (!typeis.Object(browser)) {
            return;
        }

        if (browser.host === true) {
            req.setHeader('host', req.uri.host);
        } else if (typeis.String(browser.host)) {
            req.setHeader('host', browser.host);
        }

        if (browser.origin === true) {
            req.setHeader('origin', req.uri.protocol + '//' + req.uri.host);
        } else if (typeis.String(browser.origin)) {
            req.setHeader('origin', browser.origin);
        }

        if (browser.referer === true) {
            req.setHeader('referer', req.uri.href);
        } else if (typeis.String(browser.referer)) {
            req.setHeader('referer', browser.referer);
        }
    });

    return req;
}

request.defaults = defaults;
module.exports = request;
