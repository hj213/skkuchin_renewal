/**
 * 文件描述
 * @author ydr.me
 * @create 2018-08-21 18:31
 * @update 2018-08-21 18:31
 */


'use strict';

var array = require('blear.utils.array');
var typeis = require('blear.utils.typeis');



/**
 * 行匹配
 * @param fakeConsole
 * @param rules
 */
module.exports = function matchHelper(fakeConsole, rules) {
    var lines = fakeConsole.get().split(/\n/);

    array.each(rules, function (index, rule) {
        var line = lines[index];

        if (typeis.RegExp(rule)) {
            expect(line).toMatch(rule);
        } else {
            expect(line).toEqual(rule);
        }
    });

    fakeConsole.clear();
}

