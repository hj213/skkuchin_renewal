/**
 * 对象相关
 * @author 云淡然
 * @updated 2016年11月26日15:47:34
 */


'use strict';

var typeis = require('blear.utils.typeis');


/**
 * 返回对象的键名
 * @param obj {object} 对象
 * @returns {Array}
 */
exports.keys = function (obj) {
    return Object.keys(obj);
};


/**
 * 判断是否为纯对象
 * @ref jquery@1.x
 * @param obj
 * @returns {boolean}
 */
exports.isPlain = function (obj) {
    if (!obj || !typeis.Object(obj)) {
        return false;
    }

    try {
        for (var key in obj) {
            if (!hasOwn(obj, key)) {
                return false;
            }
        }
    }
    catch (e) {
        /* istanbul ignore next */
        return false;
    }

    return true;
};


/**
 * 判断对象是否有自身属性，即静态属性
 * @param object {Object} 对象
 * @param key {String} 键名
 * @returns {boolean}
 */
var hasOwn = exports.hasOwn = function (object, key) {
    // 因为 Object.create(null) 返回的对象是没有原型的，
    // 所以必须使用 Object.prototype.hasOwnProperty 来进行判断
    return Object.prototype.hasOwnProperty.call(object, key);
};


/**
 * 对象的遍历
 * @param object {*} 待遍历对象
 * @param callback {Function} 遍历回调，返回 false 时退出遍历
 * @returns {*}
 */
var each = exports.each = function (obj, callback) {
    for (var i in obj) {
        if (hasOwn(obj, i)) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }

    return obj;
};


/**
 * 定义一个对象的属性
 * @type {Function}
 * @param obj
 * @param key
 * @param desc
 */
var define = exports.define = function (obj, key, desc) {
    if (typeis.Object(key)) {
        each(key, function (_key, _desc) {
            define(obj, _key, _desc);
        });
    } else if (typeis.String(key)) {
        desc = supply(desc, defineDefaults);

        if (desc.get && !desc.set) {
            desc.set = function () {
                // empty
            };
        }

        // 不能同时有 set 和 writable
        if (desc.set && desc.writable) {
            delete desc.writable;
        }

        Object.defineProperty(obj, key, desc);
    }
};


var defineDefaults = define.defaults = {
    /**
     * 能否重写
     * @type Boolean
     */
    writable: true,

    /**
     * 能否枚举
     * @type Boolean
     */
    enumerable: false,

    /**
     * 能否配置，能否被删除
     * @type Boolean
     */
    configurable: true
};


/**
 * 对象的 map
 * @param obj {*} 待遍历对象
 * @param callback {Function} 遍历回调
 * @returns {*}
 */
exports.map = function (obj, callback) {
    var obj2 = {};

    each(obj, function (key, val) {
        obj2[key] = callback(val, key);
    });

    return obj2;
};


/**
 * 对象的 filter
 * @param obj {*} 待遍历对象
 * @param callback {Function|Array} 遍历回调或者是筛选数组，返回 true 被筛选
 * @returns {*}
 *
 * @example
 * object.filter({a:1, b:2}, cb:val, key);
 * object.filter({a:1, b:2}, [key1, key2]);
 */
exports.filter = function filter(obj, callback) {
    var obj2 = {};

    if (typeis.Array(callback)) {
        var arr = callback;
        var map = {};
        var len = arr.length;

        for (var i = 0; i < len; i++) {
            map[arr[i]] = 1;
        }

        callback = function (val, key) {
            return map[key];
        };
    }

    each(obj, function (key, val) {
        if (callback.call(val, val, key)) {
            obj2[key] = val;
        }
    });

    return obj2;
};


/**
 * 对象分配，将目标不为 undefined 的属性分配到 source 上
 * @param [_deep=false] {Boolean} 是否深度
 * @param _source
 * @param _target
 */
exports.assign = function assign(_deep, _source, _target) {
    var args = arguments;
    var length = args.length;
    var current = 0;
    var i;
    var obj;
    var sourceType;
    var objType;
    var deep = false;

    if (typeis.Boolean(args[0])) {
        current++;
        deep = args[0];
    } else {
        deep = false;
    }

    var source = args[current++];

    for (; current < length; current++) {
        obj = args[current];
        for (i in obj) {
            if (hasOwn(obj, i) && !typeis.Undefined(obj[i])) {
                sourceType = typeis(source[i]);
                objType = typeis(obj[i]);

                if (objType === 'object' && deep) {
                    source[i] = sourceType !== objType ? {} : source[i];
                    assign(deep, source[i], obj[i]);
                } else if (objType === 'array' && deep) {
                    source[i] = sourceType !== objType ? [] : source[i];
                    assign(deep, source[i], obj[i]);
                }
                // 赋值条件：target 不为 undefined
                else {
                    source[i] = obj[i];
                }
            }
        }
    }

    return source;
};


/**
 * 对象补充，将目标不为 undefined 的属性分配到 source 为 undefined 上
 * @param [_deep=false] {Boolean} 是否深度
 * @param _source
 * @param _target
 */
var supply = exports.supply = function supply(_deep, _source, _target) {
    var args = arguments;
    var length = args.length;
    var current = 0;
    var i;
    var obj;
    var sourceType;
    var objType;
    var deep = false;

    if (typeis.Boolean(args[0])) {
        current++;
        deep = args[0];
    } else {
        deep = false;
    }

    var source = args[current++];

    for (; current < length; current++) {
        obj = args[current];
        for (i in obj) {
            if (hasOwn(obj, i) && !typeis.Undefined(obj[i])) {
                sourceType = typeis(source[i]);
                objType = typeis(obj[i]);

                if (objType === 'object' && deep) {
                    source[i] = sourceType !== objType ? {} : source[i];
                    supply(deep, source[i], obj[i]);
                } else if (objType === 'array' && deep) {
                    source[i] = sourceType !== objType ? [] : source[i];
                    supply(deep, source[i], obj[i]);
                }
                // 赋值条件：source 为 undefined
                else if (typeis.Undefined(source[i])) {
                    source[i] = obj[i];
                }
            }
        }
    }

    return source;
};


var isQuote = function (char) {
    return char === "'" || char === '"';
};
var BRACKET_START = '[';
var BRACKET_END = ']';
var BACKSLASH = '\\';
var POINT = '.';


/**
 * 根据路径获取路径数组
 * @param {String|Array} path 路径
 * @returns {Array}
 *
 * @example
 * object.path('a.b.c');
 * // => ['a', 'b', 'c']
 */
var parsePath = exports.path = function (path) {
    var pathList = [];

    if (typeis.Array(path)) {
        pathList = path;
    } else {
        // [~~~]
        var inBracket = false;
        // .~~~
        var inPoint = false;
        // "~~~"
        var inQuote = '';
        // \~~~
        var inEscape = false;
        var current = 0;
        var length = path.length;
        var lastPath = '';
        var lastChar = '';
        var push = function () {
            if (lastPath) {
                pathList.push(lastPath);
            }

            lastPath = '';
        };

        while (current !== length) {
            var char = path[current];

            // [=> ~~
            if (inBracket) {
                // [=>"
                if (!inQuote && isQuote(char)) {
                    inQuote = char;
                }
                // ["~~ \=>~ ~~"]
                else if (inEscape) {
                    // ["~~ \=>" ~~"}
                    if (char === inQuote) {
                        lastPath = lastPath.slice(0, -1);
                    }

                    lastPath += char;
                    inEscape = false;
                }
                // ["~~ =>"]
                else if (inQuote == char) {
                    inBracket = false;
                    inQuote = '';
                    current++;
                    push();
                }
                // [00000 =>]
                else if (!inQuote && char === BRACKET_END) {
                    inBracket = false;
                    push();
                }
                // ["~~ =>\ ~~"]
                else if (char === BACKSLASH) {
                    inEscape = true;
                    lastPath += char;
                } else {
                    lastPath += char;
                }
            }
            // .=> ~~
            else if (inPoint) {
                if (char === BRACKET_START) {
                    inBracket = true;
                    inPoint = false;
                    push();
                } else if (char === POINT) {
                    inPoint = true;
                    push();
                } else {
                    lastPath += char;
                }
            }
            // =>.
            else if (char === POINT) {
                inPoint = true;
            }
            // =>[
            else if (char === BRACKET_START) {
                inBracket = true;
            }
            // =>~
            else {
                inPoint = true;
                lastPath += char;
            }

            current++;
            lastChar = char;
        }

        push();
    }

    return pathList;
};


/**
 * 找到对应目标
 * @param obj
 * @param path
 * @param isSet
 * @returns {{t: Object, k: String, p: Array}}
 */
var findTarget = function (obj, path, isSet) {
    var _pathList = parsePath(path);
    var i = 0;
    var j = _pathList.length;
    var stack = [];
    var parent = obj;
    var lastParent = obj;
    var hasBreak = false;
    var key = '';
    var lastKey = '';

    for (; i < j; i++) {
        key = _pathList[i];

        try {
            if (key in parent) {
                lastParent = parent;
                stack.push(parent);
                parent = parent[key];
            } else {
                hasBreak = true;
                stack.push(parent);
                break;
            }
        } catch (err) {
            if (isSet) {
                // 如果目标无法 in 操作，则初始化为 {}
                parent = lastParent[lastKey] = {};
                stack.push(parent);
            }

            hasBreak = true;
            break;
        }

        lastKey = key;
    }

    // if (hasBreak) {
    //     stack.pop();
    // }

    return {t: stack.pop(), k: key, p: _pathList.slice(i)};
};


/**
 * 根据路径取值
 * @param {Object} obj 对象
 * @param {String|Array} path 路径
 * @returns {*}
 *
 * @example
 * object.get({a: 1}, 'a')
 * // => 1
 * object.get({a: {b: 2}}, 'a.b')
 * // => 2
 * object.get({a: {b: 2}}, ['a', 'b'])
 * // => 2
 */
exports.get = function (obj, path) {
    var target = findTarget(obj, path);
    return target.t[target.k];
};


/**
 * 根据路径设值
 * @param {Object} obj 对象
 * @param {String|Array} path 路径
 * @param {*} val 值
 * @returns {*}
 *
 * @example
 * object.set({a: 1}, 'a', 2)
 * // => {a: 2}
 * object.set({a: {b: 2}}, 'a.b', 3)
 * // => {a: {b: 3}}
 * object.set({a: {b: 2}}, ['a', 'b'], 3)
 * // => {a: {b: 3}}
 */
exports.set = function (obj, path, val) {
    var target = findTarget(obj, path, true);
    var parent = target.t;
    var key = target.k;
    var insertPath = target.p;

    if (insertPath.length) {
        while (insertPath.length !== 1) {
            key = insertPath.shift();
            parent = parent[key] = {};
        }

        key = insertPath.pop();
    }

    parent[key] = val;

    return target.t;
};
