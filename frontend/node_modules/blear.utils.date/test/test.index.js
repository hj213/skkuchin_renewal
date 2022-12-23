/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var date = require('../src/index.js');

describe('index.js', function () {
    it('.now', function () {
        expect(typeof date.now()).toEqual('number');
    });

    it('.id', function () {
        var d = new Date(2016, 0, 1);

        expect(date.id(d)).toEqual(20160101);
        expect(date.id(2016, 0, 1)).toEqual(20160101);
    });

    it('.fromId', function () {
        var d = date.fromId(20160101);

        expect(date.id(d)).toEqual(20160101);
    });

    it('.parse', function () {
        expect(isNaN(date.parse('...'))).toEqual(false);
        expect(isNaN(date.parse(new Date('...')))).toEqual(false);
        expect(date.parse().getFullYear()).toEqual(new Date().getFullYear());
        expect(date.parse(2016).getFullYear()).toEqual(1970);
        expect(date.parse([2016]).getFullYear()).toEqual(1970);
        expect(date.parse(2016, 0).getMonth()).toEqual(0);
        expect(date.parse([2016, 0]).getMonth()).toEqual(0);
        expect(date.parse(2016, 0, 1).getDate()).toEqual(1);
        expect(date.parse([2016, 0, 1]).getDate()).toEqual(1);
        expect(date.parse(2016, 0, 1, 1).getHours()).toEqual(1);
        expect(date.parse([2016, 0, 1, 1]).getHours()).toEqual(1);
        expect(date.parse(2016, 0, 1, 1, 1).getMinutes()).toEqual(1);
        expect(date.parse([2016, 0, 1, 1, 1]).getMinutes()).toEqual(1);
        expect(date.parse(2016, 0, 1, 1, 1, 1).getSeconds()).toEqual(1);
        expect(date.parse([2016, 0, 1, 1, 1, 1]).getSeconds()).toEqual(1);
        expect(date.parse(2016, 0, 1, 1, 1, 1, 1).getMilliseconds()).toEqual(1);
        expect(date.parse([2016, 0, 1, 1, 1, 1, 1]).getMilliseconds()).toEqual(1);
    });

    it('.format', function () {
        expect(date.format()).toMatch(/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/);
        expect(date.format('YYYY'), new Date()).toMatch(/^\d{4}$/);
    });

    it('.isLeapYear', function () {
        expect(date.isLeapYear(2016)).toEqual(true);
        expect(date.isLeapYear(2017)).toEqual(false);
    });

    it('.getDaysInMonth', function () {
        expect(date.getDaysInMonth(2016, 1)).toEqual(29);
        expect(date.getDaysInMonth(2017, 1)).toEqual(28);
    });

    it('.getDaysInYear', function () {
        expect(date.getDaysInYear(2016, 0, 1)).toEqual(1);
        expect(date.getDaysInYear(2016, 11, 31)).toEqual(366);
    });

    it('.getWeeksInYear', function () {
        expect(date.getWeeksInYear(2016, 0, 1)).toEqual(1);
        expect(date.getWeeksInYear(2016, 3, 11)).toEqual(16);
        expect(date.getWeeksInYear(2016, 0, 1, 3)).toEqual(1);
        expect(date.getWeeksInYear(2016, 3, 11, 3)).toEqual(15);
    });

    it('.getWeeksInMonth', function () {
        expect(date.getWeeksInMonth(2016, 0, 1)).toEqual(1);
        expect(date.getWeeksInMonth(2016, 3, 11)).toEqual(3);
        expect(date.getWeeksInMonth(2016, 0, 1, 3)).toEqual(1);
        expect(date.getWeeksInMonth(2016, 3, 11, 3)).toEqual(2);
        expect(date.getWeeksInMonth(2016, 9, 30, 1)).toEqual(5);
        expect(date.getWeeksInMonth(2016, 9, 31, 1)).toEqual(6);
    });

    it('.from', function () {
        var now = date.now();

        // 过去
        expect(date.from(0, now)).toEqual('很久之前');
        expect(date.from(now - 1, now)).toEqual('刚刚');
        expect(date.from(now - 10 * 1000, now)).toEqual('10秒前');
        expect(date.from(now - 30 * 60 * 1000, now)).toEqual('30分钟前');
        expect(date.from(now - 60 * 60 * 1000, now)).toEqual('1小时前');
        expect(date.from(now - 24 * 60 * 60 * 1000, now)).toEqual('1天前');
        expect(date.from(now - 30 * 24 * 60 * 60 * 1000, now)).toEqual('1个月前');
        expect(date.from(now - 12 * 30 * 24 * 60 * 60 * 1000, now)).toEqual('1年前');
        expect(date.from(now - 9 * 12 * 30 * 24 * 60 * 60 * 1000, now)).toEqual('9年前');
        expect(date.from(now - 10 * 12 * 30 * 24 * 60 * 60 * 1000, now)).toEqual('很久之前');

        // 将来
        expect(date.from(now + 1, now)).toEqual('即将');
        expect(date.from(now + 10 * 1000, now)).toEqual('10秒后');
        expect(date.from(now + 60 * 60 * 1000, now)).toEqual('1小时后');
        expect(date.from(now + 24 * 60 * 60 * 1000, now)).toEqual('1天后');
        expect(date.from(now + 30 * 24 * 60 * 60 * 1000, now)).toEqual('1个月后');
        expect(date.from(now + 12 * 30 * 24 * 60 * 60 * 1000, now)).toEqual('1年后');
        expect(date.from(now + 9 * 12 * 30 * 24 * 60 * 60 * 1000 + 1, now)).toEqual('9年后');
        expect(date.from(now + 10 * 12 * 30 * 24 * 60 * 60 * 1000 + 1, now)).toEqual('很久之后');
    });

    it('.iso', function () {
        expect(date.iso()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
    });

    it('.start', function () {
        var d1 = new Date();
        var d2 = date.start(d1);

        expect(d2.getFullYear()).toEqual(d1.getFullYear());
        expect(d2.getMonth()).toEqual(d1.getMonth());
        expect(d2.getDate()).toEqual(d1.getDate());
        expect(d2.getHours()).toEqual(0);
        expect(d2.getMinutes()).toEqual(0);
        expect(d2.getSeconds()).toEqual(0);
        expect(d2.getMilliseconds()).toEqual(0);
    });

    it('.end', function () {
        var d1 = new Date();
        var d2 = date.end(d1);

        expect(d2.getFullYear()).toEqual(d1.getFullYear());
        expect(d2.getMonth()).toEqual(d1.getMonth());
        expect(d2.getDate()).toEqual(d1.getDate());
        expect(d2.getHours()).toEqual(23);
        expect(d2.getMinutes()).toEqual(59);
        expect(d2.getSeconds()).toEqual(59);
        expect(d2.getMilliseconds()).toEqual(999);
    });
});
