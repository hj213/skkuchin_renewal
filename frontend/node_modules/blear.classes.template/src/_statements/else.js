/**
 * #else
 * #else if
 * @author ydr.me
 * @create 2016-05-06 18:43
 */


'use strict';

var reIf = /^if\s/;

module.exports = function (vnode) {
    var isElseIf = false;
    var value = vnode.value;

    value = value.replace(reIf, function () {
        isElseIf = true;
        return '';
    });

    if (isElseIf) {
        return '} else if (Boolean(' + value + ')) {';
    }

    return '} else {';
};
