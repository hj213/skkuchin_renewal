/**
 * #set
 * @author ydr.me
 * @create 2016-05-06 18:43
 */


'use strict';

var reVarible = /^[a-z_$][a-z\d$_]*\s/i;
var reObject = /[\[.]/;

// set abc = 123;
// set abc.def = 123;
// set abc[def] = 123;
// set abc = some.abc
module.exports = function (vnode) {
    var value = vnode.value;
    var varible = '';

    value.replace(reVarible, function (source) {
        varible = source;
        return '';
    });

    if (reObject.test(varible)) {
        return [value, ''];
    }

    return [
        'if (typeof ' + varible + ' === "undefined") {',
        '  var ' + varible + ' = null;',
        '}',
        ';' + value + ';'
    ].join('\n');
};
