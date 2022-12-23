/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var random = require('../src/index.js');

describe('index.js', function () {
    it('.number', function (done) {
        var min1 = 0;
        var max1 = 5;
        var i = 10000;

        while (i--) {
            var rn = random.number(max1, min1);
            expect(rn).toBeGreaterThan(0);
            expect(rn).toBeLessThan(6);
        }

        expect(random.number(0,0)).toEqual(0);

        done();
    });

    it('.string', function (done) {
        var str1 = random.string();
        var str2 = random.string('!@');
        var str3 = random.string(20, '!@');
        var str4 = random.string(20, 'a');
        var str5 = random.string(20, 'A');
        var str6 = random.string(20, '0');

        expect(str1.length).toEqual(6);
        expect(str1).toMatch(/^[a-zA-Z\d]{6}$/);

        expect(str2.length).toEqual(6);
        expect(str2).toMatch(/^[!@]{6}$/);

        expect(str3.length).toEqual(20);
        expect(str3).toMatch(/^[!@]{20}$/);

        expect(str4.length).toEqual(20);
        expect(str4).toMatch(/^[a-z]{20}$/);

        expect(str5.length).toEqual(20);
        expect(str5).toMatch(/^[A-Z]{20}$/);

        expect(str6.length).toEqual(20);
        expect(str6).toMatch(/^\d{20}$/);

        done();
    });

    it('.hexColor', function (done) {
        expect(random.hexColor()).toMatch(/^#[0-9a-f]{6}$/);
        expect(random.hexColor()).toMatch(/^#[0-9a-f]{6}$/);

        done();
    });

    it('.guid:default', function () {
        var t = 10000;
        var map = {};
        var findDupliate = false;

        while (t--) {
            var r = random.guid();
            map[r] = map[r] || 0;
            map[r]++;

            if (map[r] > 1) {
                findDupliate = true;
                break;
            }
        }

        expect(findDupliate).toBe(false);
    });

    it('.guid:timeStamp', function () {
        var t = 10000;
        var map = {};
        var findDupliate = false;
        var lastR = '';

        while (t--) {
            var r = random.guid(true);
            map[r] = map[r] || 0;
            map[r]++;

            if (map[r] > 1) {
                findDupliate = true;
                lastR = r;
                break;
            }
        }

        var timeStamp = lastR.slice(0, 13);
        var date = new Date(timeStamp * 1);

        expect(findDupliate).toBe(false);
        expect(date.getTime()).not.toBe(NaN);
        expect(date.getTime()).toBeLessThan(new Date().getTime());
    });

    it('.guid:maxLength', function () {
        var t = 10000;
        var map = {};
        var findDupliate = false;
        var lastR = '';

        while (t--) {
            var r = random.guid(20);
            map[r] = map[r] || 0;
            map[r]++;

            if (map[r] > 1) {
                findDupliate = true;
                lastR = r;
                break;
            }
        }
        expect(findDupliate).toBe(false);
    });
});
