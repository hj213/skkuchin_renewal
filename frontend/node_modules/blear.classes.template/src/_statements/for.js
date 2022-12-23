/**
 * #for
 * @author ydr.me
 * @create 2016-05-06 18:43
 */


'use strict';


module.exports = function (vnode) {
    if (!vnode.open) {
        return '});';
    }

    var value = vnode.value;
    var forInList = value.split(' in ');
    var keyValName = forInList[0];
    var keyValList = keyValName.split(',');
    var valName = keyValList.pop();
    var keyName = keyValList.pop() || this.genVarName();
    var listName = forInList[1];

    return this.thisName() + '.each(' + listName + ', function(' + keyName + ', ' + valName + ') {';
};
