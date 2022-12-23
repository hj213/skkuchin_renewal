/**
 * @if
 * @author ydr.me
 * @create 2016-05-01 15:49
 */


'use strict';

// exp
module.exports = function (vnode, directive) {
    return [
        'else if (' + directive.value + ') {',
        '}'
    ];
};
