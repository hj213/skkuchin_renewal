/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var number = require('../src/index.js');

describe('index.js', function () {
    it('.parseInt', function (done) {
        expect(number.parseInt(10)).toBe(10);
        expect(number.parseInt(10.1)).toBe(10);
        expect(number.parseInt('----')).toBe(0);
        expect(number.parseInt(NaN)).toBe(0);
        expect(number.parseInt('0001')).toBe(1);
        expect(number.parseInt('0xa')).toBe(0);
        expect(number.parseInt(0xa)).toBe(10);
        done();
    });

    it('.parseFloat', function (done) {
        expect(number.parseFloat(10)).toBe(10);
        expect(number.parseFloat(10.1)).toBe(10.1);
        expect(number.parseFloat('----')).toBe(0);
        expect(number.parseFloat(NaN)).toBe(0);
        expect(number.parseFloat('0001')).toBe(1);
        expect(number.parseFloat('0xa')).toBe(0);
        expect(number.parseFloat(0xa)).toBe(10);
        done();
    });

    it('.format', function (done) {
        expect(number.format('123.456')).toBe('123.456');
        expect(number.format('987123.456')).toBe('987,123.456');
        expect(number.format('987123.456', '|')).toBe('987|123.456');
        done();
    });

    it('.abbr', function (done) {
        expect(number.abbr('0')).toBe('0');
        expect(number.abbr('10')).toBe('10');
        expect(number.abbr('10.000')).toBe('10');
        expect(number.abbr('10.0001', 3)).toBe('10');
        expect(number.abbr('10.0001', 4)).toBe('10.0001');
        expect(number.abbr(10)).toBe('10');
        expect(number.abbr('123')).toBe('123');
        expect(number.abbr('1234')).toBe('1K');
        expect(number.abbr('1234', 1)).toBe('1.2K');
        expect(number.abbr('1234', 2)).toBe('1.23K');
        expect(number.abbr('1234', 3)).toBe('1.234K');
        expect(number.abbr('1234', 4)).toBe('1.234K');
        expect(number.abbr('123456789', 4)).toBe('123,456.789K');
        expect(number.abbr('123456789', 4, 1)).toBe('123,456,789');
        expect(number.abbr('123456789', 4, 2)).toBe('123,456.789K');
        expect(number.abbr('123456789', 4, 3)).toBe('123.4568M');
        expect(number.abbr('123456789012', 4, 4)).toBe('123.4568G');
        expect(number.abbr('123456789012345', 4, 5)).toBe('123.4568T');
        expect(number.abbr('123456789012345678', 4, 6)).toBe('123.4568P');
        expect(number.abbr('123456789012345678901', 4, 7)).toBe('123.4568E');
        expect(number.abbr('123456789012345678901234', 4, 8)).toBe('123.4568Z');
        expect(number.abbr('123456789012345678901234567', 4, 9)).toBe('123.4568Y');
        expect(number.abbr('1234567890123456789012345678901', 4, 10)).toBe('1,234,567.8901Y');
        done();
    });

    it('.to62/.from62', function () {
        var xyz = number.from62('xyz');
        var ret = number.to62(xyz);

        console.log('xyz =>', ret);

        expect(ret).toBe('xyz');
    });
});
