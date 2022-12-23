/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Template = require('../src/index.js');


describe('测试文件', function () {
    it('<!--comment--> true', function () {
        var template = '' +
            '<!DOCTYPE html>\n' +
            '<!--\n' +
            ' - 文件描述\n' +
            ' - @author ydr.me\n' +
            ' -->\n' +
            '<!--[if IE 8]><html class="ie8 oldie" lang="zh-Hans"><![endif]-->\n';
        var tpl = new Template(template, {
            comment: true
        });
        var html = tpl.render({});

        console.log(html);
        expect(html).toMatch(/^ - 文件描述$/m);
        expect(html).toMatch(/<!--\[if IE 8]>/);
        expect(html).toMatch(/<!\[endif]-->/);
    });


    it('<!--comment--> false', function () {
        var template = '' +
            '<!DOCTYPE html>\n' +
            '<!--\n' +
            ' - 文件描述\n' +
            ' - @author ydr.me\n' +
            ' -->\n' +
            '<!--[if IE 8]><html class="ie8 oldie" lang="zh-Hans"><![endif]-->\n';
        var tpl = new Template(template, {
            comment: false
        });
        var html = tpl.render({});

        console.log(html);
        expect(html).toMatch(/^<!doctype html>$/i);
    });


    it('<!DOCTYPE html>', function () {
        var template = '<!DOCTYPE html><HTML>123</html>';
        var template2 = '<!doctype html><html>123</html>';
        var tpl = new Template(template);
        var html = tpl.render({});
        expect(html).toEqual(template2);
    });

    it('{{varible}}', function (done) {
        var str1 = '{{varible}}';
        var tpl = new Template(str1);
        var data = {
            varible: '<b>'
        };
        var str2 = tpl.render(data);

        expect(str2).toEqual('&lt;b&gt;');

        done();
    });

    it('\\{{@varible}}', function (done) {
        var str1 = '\\{{@varible}}';
        var tpl = new Template(str1);
        var data = {
            varible: '<b>'
        };
        var str2 = tpl.render(data);

        expect(str2).toEqual('{{@varible}}');

        done();
    });

    it('{{aa{{bb}}xx\\{{cc}}', function (done) {
        var str1 = '{{aa{{bb}}xx\\{{cc}}';
        var tpl = new Template(str1);
        var data = {
            bb: '--'
        };
        var str2 = tpl.render(data);

        expect(str2).toEqual('{{aa--xx{{cc}}');

        done();
    });

    it('{{{{varible}}', function (done) {
        var str1 = '{{{{varible}}';
        var tpl = new Template(str1);
        var html = tpl.render({
            varible: 'xx'
        });

        expect(html).toEqual('{{xx');

        done();
    });

    it('{{varible}}}}', function (done) {
        var str1 = '{{varible}}}}';
        var tpl = new Template(str1);
        var html = tpl.render({
            varible: 'xx'
        });

        expect(html).toEqual('xx}}');

        done();
    });

    it('{{{{varible}}}}', function (done) {
        var str1 = '{{{{varible}}}}';
        var tpl = new Template(str1);
        var html = tpl.render({
            varible: 'xx'
        });

        expect(html).toEqual('{{xx}}');

        done();
    });

    it('{{=varible}}', function (done) {
        var str1 = '{{=varible}}';
        var tpl = new Template(str1);
        var data = {
            varible: '<b>',
            tr: true,
            fa: false
        };
        var str2 = tpl.render(data);

        expect(str2).toEqual('<b>');

        done();
    });

    it('methods', function (done) {
        var str1 = '{{upperCase(a)}}{{suffix(b, "-")}}{{prefix(b, "-")}}{{"a" + "b"}}';
        var data = {
            a: 'a',
            b: 'b'
        };

        Template.method('upperCase', function (str) {
            return str.toUpperCase();
        });

        var tpl = new Template(str1, {
            methods: {
                suffix: function (val, suffix) {
                    return val + suffix;
                }
            }
        });

        tpl.method('prefix', function (str, prefix) {
            return prefix + str;
        });

        var str2 = tpl.render(data);

        expect(str2).toEqual('Ab--bab');

        done();
    });


    it('{{#set}}', function (done) {
        var str1 = '{{#set a = 1}}{{a}}{{#set a = 2}}{{a}}';
        var tpl = new Template(str1);
        var str2 = tpl.render();

        expect(str2).toEqual('12');
        done();
    });

    it('#ignore', function (done) {
        var str1 = '{{#ignore}}{{ignore}}{{/ignore}}';
        var tpl = new Template(str1);
        var str2 = tpl.render();

        expect(str2).toEqual('{{ignore}}');

        done();
    });

    it('#if', function (done) {
        var str1 = '{{#if varible === "<b>"}}if{{/if}}';
        var tpl = new Template(str1);
        var data = {
            varible: '<b>'
        };
        var str2 = tpl.render(data);

        expect(str2).toEqual('if');

        done();
    });

    it('#else', function (done) {
        var str1 = '{{#if 1}}1{{#else}}0{{/if}}{{#if 0}}0{{#else if 1}}1{{/if}}';
        var tpl2 = new Template(str1);

        expect(tpl2.render()).toEqual('11');

        done();
    });

    it('#for array', function (done) {
        var str1 = '{{#for user in users}}{{user}}{{/for}}';
        var tpl = new Template(str1);
        var data = {
            users: ['a', 'b']
        };
        var str2 = tpl.render(data);

        expect(str2).toEqual('ab');

        done();
    });

    it('#for array index', function (done) {
        var str1 = '{{#for index, user in users}}{{index}}{{user}}{{/for}}';
        var tpl = new Template(str1);
        var data = {
            users: ['a', 'b']
        };
        var str2 = tpl.render(data);

        expect(str2).toEqual('0a1b');

        done();
    });

    it('#for object key', function (done) {
        var str1 = '{{#for key,user in users}}{{key}}{{user}}{{/for}}';
        var tpl = new Template(str1);
        var data = {
            users: {
                a: 'a',
                b: 'b'
            }
        };
        var str2 = tpl.render(data);

        expect(str2).toEqual('aabb');

        done();
    });

    it('@if', function () {
        var str = '<div @if="a"></div>';
        var data = {
            a: 0
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        expect(html).toEqual('');
    });

    it('@else', function () {
        var str = '<div @if="a" class="xx"></div> <p @else class="yy"></p>';
        var data = {
            a: 0
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        expect(html).toEqual('<p class="yy"></p>');
    });

    it('@else-if', function () {
        var str = '<div @if="a" class="xx"></div> <p @else-if="b" class="yy"></p>';
        var data = {
            a: 0,
            b: 1
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        expect(html).toEqual('<p class="yy"></p>');
    });

    it('@if @else-if @else', function () {
        var str = '<div @if="a"></div> <p @else-if="b"></p> <a @else></a>';
        var data = {
            a: 0,
            b: 0
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        expect(html).toEqual('<a></a>');
    });

    it('@for:array', function () {
        var str = '<div @for="a, b in c">{{a}}{{b}}</div>';
        var data = {
            c: [1, 2]
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        expect(html).toEqual('<div>01</div><div>12</div>');
    });

    it('@for:object', function () {
        var str = '<div @for="a, b in c">{{a}}{{b}}</div>';
        var data = {
            c: {
                a: 1,
                b: 2
            }
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        expect(html).toEqual('<div>a1</div><div>b2</div>');
    });

    it('@class', function () {
        var str = '<a class="a" @class="b: c"></a><b class="a" @class="b: c, d: e,"></b>';
        var data = {
            c: 1,
            e: 2
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        console.log(html);
        expect(/<a\s+class="a\s+b">/.test(html)).toEqual(true);
        expect(/<b\s+class="a\s+b\s+d">/.test(html)).toEqual(true);
    });

    it(':class 花括号', function () {
        var str = '<a class="a" :class="{b: c}"></a><b class="a" @class="{b: c, d: e,}"></b>';
        var data = {
            c: 1,
            e: 2
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        console.log(html);
        expect(/<a\s+class="a\s+b">/.test(html)).toEqual(true);
        expect(/<b\s+class="a\s+b\s+d">/.test(html)).toEqual(true);
    });

    it('@style', function () {
        var str = '<a style="a:b" @style="c: d"></a><b style="e:f" @style="g:h,i:j"></b>';
        var data = {
            d: 1,
            h: 2,
            j: 3
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        console.log(html);
        expect(/<a\s+style="a\s*:\s*b(\s*;)+\s*c\s*:\s*1\s*;(\s*;)*">/.test(html)).toEqual(true);
        expect(/<b\s+style="e\s*:\s*f(\s*;)+\s*g\s*:\s*2(\s*;)+\s*i\s*:\s*3(\s*;)*">/.test(html)).toEqual(true);
    });

    it(':style 花括号', function () {
        var str = '<a style="a:b" :style="c: d"></a><b style="e:f" @style="{g:h,i:j}"></b>';
        var data = {
            d: 1,
            h: 2,
            j: 3
        };
        var tpl = new Template(str);
        var html = tpl.render(data);

        console.log(html);
        expect(/<a\s+style="a\s*:\s*b(\s*;)+\s*c\s*:\s*1\s*;(\s*;)*">/.test(html)).toEqual(true);
        expect(/<b\s+style="e\s*:\s*f(\s*;)+\s*g\s*:\s*2(\s*;)+\s*i\s*:\s*3(\s*;)*">/.test(html)).toEqual(true);
    });

    it('a="a"', function () {
        var template = '<a a="a"></a>';
        var data = {a: 'b'};
        var tpl = new Template(template);
        var html = tpl.render(data);
        expect(html).toEqual('<a a="a"></a>');
    });

    it('a="{{a}}"', function () {
        var template = '<a a="{{a}}"></a>';
        var data = {a: 'b'};
        var tpl = new Template(template);
        var html = tpl.render(data);
        expect(html).toEqual('<a a="b"></a>');
    });

    it('disabled="a"', function () {
        var template = '<a disabled="a"></a>';
        var data = {a: false};
        var tpl = new Template(template);
        var html = tpl.render(data);
        expect(html).toEqual('<a disabled="a"></a>');
    });

    it('disabled="{{a}}"', function () {
        var template = '<a disabled="{{a}}"></a>';
        var data = {a: false};
        var tpl = new Template(template);
        var html = tpl.render(data);
        expect(html).toEqual('<a ></a>');
    });

    it('#*Name', function () {
        var tpl = new Template('{{a}}');
        var data = {a: 1};
        var html = tpl.render(data);
        var reName = /^__\d+__$/;

        var dataName = tpl.dataName();
        var protectionName = tpl.protectionName();
        var outputName = tpl.outputName();
        expect(dataName).toMatch(reName);
        expect(protectionName).toMatch(reName);
        expect(outputName).toMatch(reName);
    });

    it('#directive', function () {
        var template = '<div @my-directive="a"></div>';
        var tpl = new Template(template);

        tpl.directive('my-directive', 1, function (vnode, directive) {
            vnode.attrs['my'] = directive.value;
        });

        var html = tpl.render({});
        expect(html).toEqual('<div my="a"></div>');
    });

    it('#statement', function () {
        var template = '{{#myStatement a}}';
        var tpl = new Template(template);

        tpl.statement('myStatement', function (vnode) {
            return this.outputName() + ' += "{{' + vnode.value + '}}"';
        });

        var html = tpl.render({});
        expect(html).toEqual('{{a}}');
    });

    it('#parseExpression', function () {
        var exp = 'a{{b}}';
        var tpl = new Template('');
        var ret = tpl.parseExpression(exp, false);

        expect(ret).toEqual('"a" + (b)');
    });

    it('#parseExpression', function () {
        var exp = 'a';
        var tpl = new Template('');
        var ret = tpl.parseExpression(exp, false);

        expect(ret).toEqual('"a"');
    });

    it('#parseExpression', function () {
        var exp = '{{a}}';
        var tpl = new Template('');
        var ret = tpl.parseExpression(exp, false);

        expect(ret).toEqual('(a)');
    });

    it('compress', function () {
        var template = '<div     a="1"\n\n\n\n\nb="2"   >\n\n\n\t\tc\n\n\n\t\t</div>';
        var html = '<div a="1" b="2">c</div>';
        var tpl = new Template(template);

        expect(tpl.render({})).toEqual(html);
    });

    it('@filter []', function () {
        var template = '<li @for="item in list" @filter="item > 2">{{item}}</li>';
        var tpl = new Template(template);
        var data = {
            list: [1, 2, 3, 4]
        };
        var html = tpl.render(data);
        expect(html).toEqual('<li>3</li><li>4</li>');
    });

    it('@order []', function () {
        var template = '<li @for="item in list" @order="item 1">{{item}}</li>';
        var tpl = new Template(template);
        var data = {
            list: [1, 2, 3, 4]
        };
        var html = tpl.render(data);
        expect(html).toEqual('<li>1</li><li>2</li><li>3</li><li>4</li>');
    });

    it('@order [{}]', function () {
        var template = '<li @for="item in list" @order="item.id 1">{{item.id}}</li>';
        var tpl = new Template(template);
        var data = {
            list: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
        };
        var html = tpl.render(data);
        expect(html).toEqual('<li>1</li><li>2</li><li>3</li><li>4</li>');
    });

    it('@order [{}] + @filter', function () {
        var template = '<li @for="item in list" @order="item.id 1" @filter="item.id > 2">{{item.id}}</li>';
        var tpl = new Template(template);
        var data = {
            list: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
        };
        var html = tpl.render(data);
        expect(html).toEqual('<li>3</li><li>4</li>');
    });

    it('@order [{}] + @filter', function () {
        var template = '<li @for="item in list" @order="item.id -1" @filter="item.id > 2">{{item.id}}</li>';
        var tpl = new Template(template);
        var data = {
            list: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
        };
        var html = tpl.render(data);
        expect(html).toEqual('<li>4</li><li>3</li>');
    });

    it('@limit length', function () {
        var template = '<li @for="item in list" @limit="2">{{item.id}}</li>';
        var tpl = new Template(template);
        var data = {
            list: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
        };
        var html = tpl.render(data);
        expect(html).toEqual('<li>1</li><li>2</li>');
    });

    it('@limit length start', function () {
        var template = '<li @for="item in list" @limit="2 2">{{item.id}}</li>';
        var tpl = new Template(template);
        var data = {
            list: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
        };
        var html = tpl.render(data);
        expect(html).toEqual('<li>3</li><li>4</li>');
    });

    it('@limit length start @filter', function () {
        var template = '<li @for="item in list" @limit="3 1" @filter="item.id % 2 == 0">{{item.id}}</li>';
        var tpl = new Template(template);
        var data = {
            list: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
        };
        var html = tpl.render(data);
        expect(html).toEqual('<li>2</li><li>4</li>');
    });

    it('@limit length start @filter', function () {
        var template = '<li @for="item in list" @limit="3 1" @filter="item.id % 2 == 0" @order="item.id -1">{{item.id}}</li>';
        var tpl = new Template(template);
        var data = {
            list: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
        };
        var html = tpl.render(data);
        expect(html).toEqual('<li>2</li>');
    });

    it('.isExpression', function () {
        expect(Template.isExpression('a')).toEqual(false);
        expect(Template.isExpression('{{a}}')).toEqual(true);
    });

    it('.textify', function () {
        expect(Template.textify('a')).toEqual('"a"');
        expect(Template.textify('"a"')).toEqual('"\\"a\\""');
    });

    it('slash-1', function () {
        var template = '\\';
        var tpl = new Template(template);
        var html = tpl.render({});
        expect(html).toEqual('\\');
    });

    it('slash-2', function () {
        var template = '\\\\';
        var tpl = new Template(template);
        var html = tpl.render({});
        expect(html).toEqual('\\\\');
    });

    it('slash-3', function () {
        var template = '\\{{a}}';
        var tpl = new Template(template);
        var html = tpl.render({});
        expect(html).toEqual('{{a}}');
    });

    it('slash-4', function () {
        var template = '\\{{a}}{{b}}';
        var tpl = new Template(template);
        var html = tpl.render({b: 'xx'});
        expect(html).toEqual('{{a}}xx');
    });

    it('slash-5', function () {
        var template = '<p a="\\"></p>';
        var tpl = new Template(template);
        var html = tpl.render({b: 'xx'});
        expect(html).toEqual('<p a="\\"></p>');
    });

    it('slash-6', function () {
        var template = '<p a="\\" b="\\d"></p>';
        var tpl = new Template(template);
        var html = tpl.render({b: 'xx'});
        expect(html).toEqual('<p a="\\" b="\\d"></p>');
    });

    it('space', function () {
        var template = '{{new Date().getFullYear()}}';
        var tpl = new Template(template);
        var html = tpl.render({});
        expect(html).toEqual(new Date().getFullYear() + '');
    });
});
