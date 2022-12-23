/**
 * @filter
 * @author ydr.me
 * @create 2016-06-02 23:36
 */


'use strict';

// @filter="expression"
module.exports = function (vnode, directive) {
    var forDirective = vnode.directives['for'];

    if (!forDirective) {
        if (typeof DEBUG !== 'undefined' && DEBUG === true) {
            console.warn('@filter 指令必须和 @for 指令配合使用');
        }

        return ['', ''];
    }

    return ['if (Boolean(' + directive.value + ')) {', '}'];
};


