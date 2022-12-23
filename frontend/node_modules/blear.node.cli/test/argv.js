/**
 * 组合成 argv
 * @author ydr.me
 * @create 2018-08-20 15:41
 * @update 2018-08-20 15:41
 */


'use strict';

var access  = require('blear.utils.access');


/**
 * 组合成 argv
 * @param arg...
 * @returns {array}
 */
module.exports = function (arg/*arguments*/) {
    var args = access.args(arguments);
    args.unshift('bin');
    args.unshift(process.execPath);
    return args;
};


