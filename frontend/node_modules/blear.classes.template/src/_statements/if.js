/**
 * #if
 * @author ydr.me
 * @create 2016-05-06 18:43
 */


'use strict';

module.exports = function (vnode) {
    if (vnode.open) {
        return 'if (Boolean(' + vnode.value + ')) {';
    } else {
        return '}';
    }
};
