/**
 * 加密
 * @author ydr.me
 * @create 2014-11-17 11:18
 */

'use strict';

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var random = require('blear.utils.random');
var typeis = require('blear.utils.typeis');


/**
 * 字符串的 MD5 计算
 * @param data {*} 待计算的数据
 * @returns {string}
 */
exports.md5 = function (data) {
    try {
        return crypto.createHash('md5').update(data).digest('hex');
    } catch (err) {
        /* istanbul ignore next */
        return '';
    }
};


/**
 * 字符串 sha1 加密
 * @param data {*} 实体
 * @param [secret] {*} 密钥，可选
 * @returns {*}
 */
exports.sha1 = function (data, secret) {
    if (arguments.length === 2) {
        try {
            return crypto.createHmac('sha1', String(secret)).update(data).digest('hex');
        } catch (err) {
            /* istanbul ignore next */
            return '';
        }
    } else {
        try {
            return crypto.createHash('sha1').update(data).digest('hex');
        } catch (err) {
            /* istanbul ignore next */
            return err.message;
        }
    }
};


/**
 * 文件内容的 etag 计算
 * @param file {String} 文件绝对路径
 * @param [callback] {Function} 读取文件流进行MD5计算
 * @returns {string}
 */
exports.etag = function (file, callback) {
    var md5;
    var stream;
    var data;

    if (typeis.Function(callback)) {
        md5 = crypto.createHash('md5');
        stream = fs.createReadStream(file);
        stream.on('data', function (d) {
            md5.update(d);
        });
        stream.on('end', function () {
            var d = md5.digest('hex');

            callback(null, d);
        });
        stream.on('error', callback);
    } else {
        try {
            data = fs.readFileSync(file);
        } catch (err) {
            /* istanbul ignore next */
            data = '';
        }

        return exports.md5(data);
    }
};


/**
 * 文件最后修改时间的 md5 计算
 * @param file {String} 文件绝对路径
 * @returns {string} md5 值
 */
exports.lastModified = function (file) {
    var stats;
    var ret;

    try {
        stats = fs.statSync(file);
    } catch (err) {
        /* istanbul ignore next */
        stats = null;
    }

    ret = stats ? String(new Date(stats.mtime).getTime()) : '0';

    return exports.md5(ret);
};


/**
 * 编码
 * @param data {String} 原始数据
 * @param secret {String} 密钥
 * @returns {String}
 */
exports.encode = function (data, secret) {
    var cipher = crypto.createCipher('aes192', String(secret));

    try {
        return cipher.update(String(data), 'utf8', 'hex') + cipher.final('hex');
    } catch (err) {
        /* istanbul ignore next */
        return '';
    }
};


/**
 * 解码
 * @param data {String} 编码后的数据
 * @param secret {String} 密钥
 * @returns {String}
 */
exports.decode = function (data, secret) {
    var decipher = crypto.createDecipher('aes192', String(secret));

    try {
        return decipher.update(String(data), 'hex', 'utf8') + decipher.final('utf8');
    } catch (err) {
        /* istanbul ignore next */
        return '';
    }
};

