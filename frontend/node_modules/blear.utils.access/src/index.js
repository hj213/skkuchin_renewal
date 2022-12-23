'use strict';

var typeis = require('blear.utils.typeis');
var collection = require('blear.utils.collection');
var object = require('blear.utils.object');
var array = require('blear.utils.array');


/**
 * noop
 */
var noop = function () {
    // ignore
};

var getSetDefaults = exports.getSetDefaults = {
    /**
     * get
     * @type function
     */
    get: noop,

    /**
     * set
     * @type function
     */
    set: noop,

    /**
     * set 参数的个数，即 key，val
     * @type number
     */
    setLength: 2,

    /**
     * 是否遍历 set 参数
     * @type boolean
     */
    eachSet: true,

    /**
     * 是否遍历 get 参数
     * @type boolean
     */
    eachGet: true
};


/**
 * 修正参数传参，参数最末尾的 undefined 参数都将被舍去
 * @param args {Arguments} 参数
 * @returns {Array}
 */
var getArgs = exports.args = function (args) {
    args = array.from(args);
    var argL = args.length;

    while (argL >= 0 && typeis.Undefined(args[argL - 1])) {
        argL -= 1;
    }

    return array.from(args).splice(0, argL);
};


/**
 * 判断是否为集合类型
 * @param obj
 * @returns {*}
 */
var isCollection = function (obj) {
    return typeis.Object(obj) || typeis.Array(obj);
};


/**
 * getset 转换器
 * @param getSet {object} 获取与设置的 Map
 * @param getSet.get {Function} get
 * @param getSet.set {Function} set
 * @param getSet.setLength {Number} 设值时的参数个数
 * @param getSet.eachSet {Boolean} 是否遍历 set 操作
 * @param getSet.eachGet {Boolean} 是否遍历 get 操作
 * @param args {Object|Array} 参数
 * @returns {*}
 *
 * @example
 * var fn = function(key, val){
 *     return argument.getset({
 *         get: function(key){
 *             return 'get ' + key;
 *         },
 *         set: function(key, val){
 *             console.log('set ' + key + ' = ' + val);
 *         }
 *     }, arguments);
 * };
 *
 * fn('a');
 * // => "get a"
 *
 * fn(['a', 'b']);
 * // => {a: "get a", b: "get b"}
 *
 * fn('a', 1);
 * // => set a = 1
 *
 * fn({a: 1, b: 2});
 * // => set a = 1
 * // => set b = 2
 */
exports.getSet = function (getSet, args) {
    getSet = object.assign({}, getSetDefaults, getSet);
    args = getArgs(args);

    var setLength = getSet.setLength;
    var eachSet = getSet.eachSet;
    var eachGet = getSet.eachGet;
    var argl = args.length;
    var arg0 = args[0];
    var ret = {};

    // .html();
    if (argl === 0 && setLength === 1) {
        return getSet.get();
    }

    // .hasAttr('id');
    // .hasAttr(['id', 'name']);
    if (argl === 1 && setLength === 0) {
        if (eachGet && isCollection(arg0)) {
            collection.each(arg0, function (index, key) {
                ret[key] = getSet.get(key);
            });
            return ret;
        }

        return getSet.get(arg0);
    }

    // .removeAttr(['id', 'name'])
    if (argl === 1 && setLength === 1 && eachSet) {
        if (typeis.Array(arg0)) {
            return array.each(arg0, function (index, key) {
                getSet.set(key);
            });
        }

        return getSet.set(arg0);
    }

    // .html(html);
    if (argl === 1 && setLength === 1 && !eachSet) {
        return getSet.set(arg0);
    }

    // .css({width: 100});
    // .css(['width', 'height']);
    // .css('width');
    if (argl === 1 && setLength === 2) {
        if (typeis.Object(arg0) && eachSet) {
            return object.each(arg0, function (key, val) {
                getSet.set(key, val);
            });
        }

        if (typeis.Array(arg0)) {
            array.each(arg0, function (index, key) {
                ret[key] = getSet.get(key);
            });

            return ret;
        }

        return getSet.get(arg0);
    }

    // .css('width', 100);
    if (argl === 2 && setLength === 2) {
        return getSet.set(arg0, args[1]);
    }
};