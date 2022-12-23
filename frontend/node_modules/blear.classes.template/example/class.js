/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-03 15:31
 */


'use strict';

var Template = require('../src/index');

var demoEl = document.getElementById('demo');
var template = demoEl.innerHTML;

var tpl = new Template(template);

var data = {
    a: false
};

demoEl.innerHTML = tpl.render(data);
