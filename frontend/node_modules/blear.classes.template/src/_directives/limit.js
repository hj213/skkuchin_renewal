/**
 * @limit
 * @author ydr.me
 * @create 2016-06-02 23:36
 */


'use strict';

var string = require('blear.utils.string');


// @limit="length start"
module.exports = function (vnode, directive) {
    var forDirective = vnode.directives['for'];

    if (!forDirective) {
        if (typeof DEBUG !== 'undefined' && DEBUG === true) {
            console.warn('@limit 指令必须和 @for 指令配合使用');
        }

        return ['', ''];
    }

    var indexName = forDirective.indexName;
    var listName = forDirective.listName;
    var thisName = this.thisName();
    var lengthStartList = string.trim(directive.value).split(' ');
    var length = string.trim(lengthStartList.shift());
    var start = string.trim(lengthStartList.pop() || '') || '0';
    var end = length + ' - 1  + ' + start;

    return [
        'if (!' + thisName + '.typeis.Array(' + listName + ') || ' + thisName + '.typeis.Array(' + listName + ') && ' + indexName + ' >= ' + start + ' && ' + indexName + ' <= ' + end + ') {',
        '}'
    ];
};


