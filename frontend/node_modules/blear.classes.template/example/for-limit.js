/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-02 23:31
 */


'use strict';

var Template = require('../src/index');


var demoEl = document.getElementById('demo');
var template = demoEl.innerHTML;

var tpl = new Template(template);

var data = {
    list: [{
        id: 1,
        name: '张三',
        selected: true
    }, {
        id: 2,
        name: '李四',
        selected: false
    }, {
        id: 3,
        name: '王五',
        selected: false
    }, {
        id: 4,
        name: '赵六',
        selected: true
    }]
};

demoEl.innerHTML = tpl.render(data);
