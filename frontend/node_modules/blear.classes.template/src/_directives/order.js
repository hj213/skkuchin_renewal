/**
 * @order
 * @author ydr.me
 * @create 2016-06-02 23:36
 */


'use strict';


var string = require('blear.utils.string');
var number = require('blear.utils.number');


var utils = require('./utils');


// @order="expression"
module.exports = function (vnode, directive) {
    var forDirective = vnode.directives['for'];

    if (!forDirective) {
        if (typeof DEBUG !== 'undefined' && DEBUG === true) {
            console.warn('@order 指令必须和 @for 指令配合使用');
        }

        return ['', ''];
    }

    var orderInfoList = string.trim(directive.value).split(' ');
    var orderName = string.trim(orderInfoList[0]).split('.');
    var orderValue = number.parseInt(string.trim(orderInfoList[1] || '1'), 1);
    var thisName = this.thisName();
    var listCloned = this.genVarName();
    var orderedListName = this.genVarName();

    orderName.shift();

    if (orderName.length) {
        orderName.unshift('');
    }

    orderName = orderName.join('.');

    var ret = utils.parseFor(forDirective.value);
    var indexName = ret[0];
    var valName = ret[1];
    var listName = ret[2];

    forDirective.value = indexName + ',' + valName + ' in ' + orderedListName;

    return [
        [
            'var ' + listCloned + ';',
            'var ' + orderedListName + ';',
            'if (' + thisName + '.typeis.Array(' + listName + ')) {',
            /****/listCloned + '= [].concat(' + listName + ');',
            /****/orderedListName + ' = ' + listCloned + '.sort(function (a, b) {',
            /****//****/'return ' + (orderValue === 1 ? 'a' + orderName + ' - b' + orderName : 'b' + orderName + ' - a' + orderName),
            /****/'});',
            '} else {',
            /****/orderedListName + ' = ' + listName + ';',
            '}'
        ].join('\n'),
        ''
    ];
};


