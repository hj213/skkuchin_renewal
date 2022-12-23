/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var typeis = require('../src/index.js');

describe('typeis', function () {
    it('.String', function (done) {
        expect(typeis.String('')).toBe(true);
        expect(typeis.String()).toBe(false);
        expect(typeis('')).toBe('string');
        expect(typeis()).not.toBe('string');

        done();
    });

    it('.Number', function (done) {
        expect(typeis.Number(1)).toBe(true);
        expect(typeis.Number(NaN)).toBe(false);
        done();
    });

    it('.Array', function (done) {
        expect(typeis.Array([])).toBe(true);
        expect(typeis.Array()).toBe(false);
        expect(typeis([])).toBe('array');
        expect(typeis()).not.toBe('array');
        (function () {
            expect(typeis.Array(arguments)).toBe(false);
        }());

        done();
    });

    it('.Object', function (done) {
        expect(typeis.Object([])).toBe(false);
        expect(typeis.Object({})).toBe(true);
        expect(typeis({})).toBe('object');
        expect(typeis([])).not.toBe('object');
        (function () {
            expect(typeis.Object(arguments)).toBe(false);
        }());

        done();
    });

    it('.Function', function (done) {
        expect(typeis.Function([])).toBe(false);
        expect(typeis.Function(function () {
        })).toBe(true);
        expect(typeis(new Function())).toBe('function');
        expect(typeis([])).not.toBe('function');

        done();
    });

    it('.Null', function (done) {
        expect(typeis.Null(NaN)).toBe(false);
        expect(typeis.Null(null)).toBe(true);
        expect(typeis.Null()).toBe(false);
        expect(typeis(null)).toBe('null');
        expect(typeis([])).not.toBe('null');

        done();
    });

    it('.Undefined', function (done) {
        expect(typeis.Undefined(NaN)).toBe(false);
        expect(typeis.Undefined(null)).toBe(false);
        expect(typeis.Undefined(undefined)).toBe(true);
        expect(typeis.Undefined()).toBe(true);
        expect(typeis(undefined)).toBe('undefined');
        expect(typeis()).toBe('undefined');

        done();
    });

    it('.Regexp', function (done) {
        expect(typeis.Regexp(/./)).toBe(true);
        expect(typeis.RegExp(/./)).toBe(true);
        expect(typeis(/./)).toBe('regexp');

        done();
    });

    it('.Boolean', function (done) {
        expect(typeis.Boolean(1)).toBe(false);
        expect(typeis.Boolean(true)).toBe(true);
        expect(typeis.Boolean(false)).toBe(true);
        expect(typeis(true)).toBe('boolean');

        done();
    });

    it('.Window', function (done) {
        expect(typeis.Window(window)).toBe(true);
        expect(typeis(window)).toBe('window');

        done();
    });

    it('.Document', function (done) {
        expect(typeis.Document(document)).toBe(true);
        expect(typeis(document)).toBe('document');

        done();
    });

    it('.Element', function (done) {
        expect(typeis.Element(document.body)).toBe(true);
        expect(typeis(document.body)).toBe('element');
        expect(typeis(document.createElement('div'))).toBe('element');
        expect(typeis(document.createTextNode(''))).not.toBe('element');

        done();
    });

    it('.Nan', function (done) {
        expect(typeis.Nan(NaN)).toBe(true);
        expect(typeis.NaN(-1)).toBe(false);
        expect(typeis.NaN(+1)).toBe(false);
        expect(typeis.Nan(Number('=='))).toBe(true);
        expect(typeis.NaN(Number('=='))).toBe(true);
        expect(typeis.Nan()).toBe(false);
        expect(typeis.NaN()).toBe(false);
        expect(typeis(NaN)).toBe('nan');
        expect(typeis(Number('=='))).toBe('nan');
        expect(typeis()).not.toBe('nan');
        done();
    });

    it('.Arguments', function (done) {
        (function () {
            expect(typeis.Arguments([])).toBe(false);
            expect(typeis.Arguments(arguments)).toBe(true);
            expect(typeis(arguments)).toBe('arguments');
        }());
        done();
    });

    it('.Date', function (done) {
        expect(typeis.Date(new Date())).toBe(true);
        expect(typeis(new Date())).toBe('date');
        done();
    });

    it('.Error', function (done) {
        expect(typeis.Error(new Error())).toBe(true);
        expect(typeis.Error(new TypeError())).toBe(true);
        expect(typeis.Error(new SyntaxError())).toBe(true);
        expect(typeis.Error(new RangeError())).toBe(true);
        expect(typeis(new Error(''))).toBe('error');
        done();
    });
});
