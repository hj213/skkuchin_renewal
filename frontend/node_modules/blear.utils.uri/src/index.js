'use strict';


// @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
// @link http://tools.ietf.org/html/rfc3986
// To be more stringent in adhering to RFC 3986 (which reserves !, ', (, ), and *),
// even though these characters have no formalized URI delimiting uses,
// the following can be safely used:
var reFixedEncodeChar = /[!'()*]/g;


/**
 * 编码
 * @param URIComponent {String} URIComponent
 * @returns {*}
 */
exports.encode = function (URIComponent) {
    try {
        return encodeURIComponent(URIComponent).replace(reFixedEncodeChar, function(c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    } catch (err) {
        return '';
    }
};


/**
 * 解码
 * @param URIComponent {String} URIComponent
 * @returns {*}
 */
exports.decode = function (URIComponent) {
    try {
        return decodeURIComponent(URIComponent);
    } catch (err) {
        return '';
    }
};