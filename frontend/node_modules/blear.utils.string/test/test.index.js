/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var string = require('../src/index.js');

describe('测试文件', function () {
    it('.trim', function (done) {
        expect(string.trim(' 1 ')).toEqual('1');
        done();
    });

    it('.ify', function (done) {
        expect(string.ify(null)).toEqual('');
        expect(string.ify(undefined)).toEqual('');
        expect(string.ify(1)).toEqual('1');
        expect(string.ify('1')).toEqual('1');
        done();
    });

    it('.humprize', function (done) {
        expect(string.humprize('webkit-border-radius')).toEqual('webkitBorderRadius');
        expect(string.humprize('webkit-border-radius', true)).toEqual('WebkitBorderRadius');
        done();
    });

    it('.separatorize', function (done) {
        expect(string.separatorize('webkitBorderRadius')).toEqual('webkit-border-radius');
        expect(string.separatorize('WebkitBorderRadius', ':', false)).toEqual(':webkit:border:radius');
        expect(string.separatorize('WebkitBorderRadius', ':', true)).toEqual('webkit:border:radius');
        expect(string.separatorize('webkitBorderRadius', '/')).toEqual('webkit/border/radius');
        done();
    });

    it('.repeat', function (done) {
        expect(string.repeat('a', 5)).toBe('aaaaa');
        done();
    });

    it('.padStart', function (done) {
        expect(string.padStart('a', 3, '0')).toBe('00a');
        expect(string.padStart('a', 3)).toBe('  a');
        expect(string.padStart('aaa', 3)).toBe('aaa');
        done();
    });

    it('.padEnd', function (done) {
        expect(string.padEnd('a', 3, '0')).toBe('a00');
        expect(string.padEnd('a', 3)).toBe('a  ');
        expect(string.padEnd('aaa', 3)).toBe('aaa');
        done();
    });

    it('.escapeHTML/.unescapeHTML', function () {
        var str1 = '<&>"\'/';
        var str2 = '&lt;&amp;&gt;&quot;&apos;&#x2f;';
        var str3 = '123';

        expect(string.escapeHTML(str1)).toEqual(str2);
        expect(string.unescapeHTML(str2)).toEqual(str1);
        var ret = string.escapeHTML(str3, true);
        var divEl = document.createElement('div');
        divEl.innerHTML = ret;
        expect(divEl.innerHTML).toBe(str3);
    });

    it('.escapeRegExp', function () {
        var res1 = '\\d{4}';
        var str1 = '\\\\d\\{4\\}';

        expect(string.escapeRegExp(res1)).toEqual(str1);
    });

    it('.versionThan', function () {
        expect(string.versionThan('3.1.5', '3.1.10')).toEqual(false);
        expect(string.versionThan('3.1.5', '3.1.10', '>')).toEqual(false);
        expect(string.versionThan('3.1.5', '3.1.10', '>=')).toEqual(false);
        expect(string.versionThan('3.1.5', '3.1.10', '<=')).toEqual(true);
        expect(string.versionThan('3.1.5', '3.1.10', '<')).toEqual(true);
        expect(string.versionThan('1.9', '1.10.11.1', '<')).toEqual(true);
        expect(string.versionThan('1.9.11.1', '1.10', '<')).toEqual(true);
        expect(string.versionThan('1.9.11.1>>>', '1.10', '<')).toEqual(false);
    });

    it('.assign:oneByOne', function () {
        var data = {
            a: 'A',
            b: 'B',
            c: 'C'
        };
        var str = '${1}${2}${3}';
        expect(string.assign(str, data.a, data.b, data.c)).toEqual('ABC');
    });

    it('.assign:one', function () {
        var data = {
            a: 'A',
            b: 'B',
            c: 'C'
        };
        var str = '${a}${b}${c}';
        expect(string.assign(str, data)).toEqual('ABC');
    });

    it('.assign:one:filter', function () {
        var data = {
            a: 'A',
            b: 'B',
            c: 'C'
        };
        var str = '${a}${b}${c}';
        expect(string.assign(str, data, function (val) {
            return '[' + val + ']';
        })).toEqual('[A][B][C]');
    });
    
    it('.textify', function () {
        var original = '\n';
        var original2 = '"';
        var ret = string.textify(original);
        var ret2 = string.textify(original2);

        expect(ret).toEqual('\\n');
        expect(ret2).toEqual('\\"');
    });
});
