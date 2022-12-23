/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-27 17:34
 */


'use strict';

var object = require('../src/index');

var sourceEl = document.getElementById('source');
var targetEl = document.getElementById('target');
var parseEl = document.getElementById('parse');

parseEl.onclick = function () {
    targetEl.value = object.parsePath(sourceEl.value).join(' ==> ');
};
