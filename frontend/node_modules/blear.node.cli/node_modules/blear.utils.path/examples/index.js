/**
 * 文件描述
 * @author ydr.me
 * @create 2018-05-18 17:54
 * @update 2018-05-18 17:54
 */


'use strict';

var path = require('../src/index');

document.getElementById('normalize').onclick = function () {
    var path1 = document.getElementById('path1').value;
    document.getElementById('path2').value = path.normalize(path1);
};

window.path = path;

console.log(path.relative('/a/b/c/d', 'o/p/q/r'));

