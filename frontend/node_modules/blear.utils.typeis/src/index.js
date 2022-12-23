'use strict';

var UNDEFINED = 'undefined';
var FUNCTION = 'function';
var NUMBER = 'number';
var GLOBAL = 'global';
var WINDOW = 'window';
var DOCUMENT = 'document';
var ELEMENT = 'element';
var NAN = 'nan';
var ARGUMENTS = 'arguments';
var DATE = 'date';
var ERROR = 'error';
var NULL = 'null';
var OBJECT = 'object';
var STRING = 'string';
var ARRAY = 'array';
var REGEXP = 'regexp';
var BOOLEAN = 'boolean';


//ELEMENT_NODE:1
//ATTRIBUTE_NODE:2
//TEXT_NODE:3
//CDATA_SECTION_NODE:4
//ENTITY_REFERENCE_NODE:5
//ENTITY_NODE:6
//PROCESSING_INSTRUCTION_NODE:7
//COMMENT_NODE:8
//DOCUMENT_NODE:9
//DOCUMENT_TYPE_NODE:10
//DOCUMENT_FRAGMENT_NODE:11
//NOTATION_NODE:12
//
//DOCUMENT_POSITION_DISCONNECTED:1
//DOCUMENT_POSITION_PRECEDING:2
//DOCUMENT_POSITION_FOLLOWING:4
//DOCUMENT_POSITION_CONTAINS:8
//DOCUMENT_POSITION_CONTAINED_BY:16
//DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:32


/**
 * 测试 arguments
 * @returns {boolean}
 */
var testArguments = function (args) {
    /* istanbul ignore next */
    return args !== undefined;
};


/**
 * 判断对象类型
 * @type {Function}
 * @param any {*} 待判断对象
 * @returns {string}
 */
var typeis = module.exports = function (any) {
    if (typeof any === UNDEFINED) {
        return UNDEFINED;
    }

    if (typeof window !== UNDEFINED && any === window) {
        return WINDOW;
    }

    if (typeof global !== UNDEFINED && any === global) {
        return GLOBAL;
    }

    if (typeof document !== UNDEFINED && any === document) {
        return DOCUMENT;
    }

    if (any === null) {
        return NULL;
    }

    // -1 !== +1
    // NaN !== NaN
    if (any !== any) {
        return NAN;
    }

    var ret = Object.prototype.toString.call(any).slice(8, -1).toLowerCase();

    // android 5.0+ element 对象的 toString 不为 [Object HTMLElement...]
    if (any.nodeType === 1 && any.nodeName) {
        return ELEMENT;
    }

    try {
        // @fuckie arguments 返回的是 object
        /* istanbul ignore next */
        if (ret === OBJECT && 'callee' in any && testArguments(any)) {
            return ARGUMENTS;
        }
    } catch (err) {
        // ignore
    }

    return ret;
};


/**
 * 创建出口
 * @param type
 * @returns {Function}
 */
var makeExports = function (type) {
    return function (any) {
        return typeis(any) === type;
    };
};


/**
 * 判断是否 string
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.String = makeExports(STRING);

/**
 * 判断是否为 number
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Number = makeExports(NUMBER);

/**
 * 判断是否为 array
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Array = makeExports(ARRAY);

/**
 * 判断是否为 object
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Object = makeExports(OBJECT);

/**
 * 判断是否为 function
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Function = makeExports(FUNCTION);

/**
 * 判断是否为 null
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Null = makeExports(NULL);

/**
 * 判断是否为 undefined
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Undefined = makeExports(UNDEFINED);

/**
 * 判断是否为 regexp
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Regexp = typeis.RegExp = makeExports(REGEXP);

/**
 * 判断是否为 boolean
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Boolean = makeExports(BOOLEAN);

///**
// * 判断是否为 global
// * @param any {*} 待判断对象
// * @type {Function}
// */
//typeis.Global = makeExports('global');

/**
 * 判断是否为 window
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Window = makeExports(WINDOW);

/**
 * 判断是否为 document
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Document = makeExports(DOCUMENT);

/**
 * 判断是否为 element
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Element = makeExports(ELEMENT);

/**
 * 判断是否为 nan
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Nan = typeis.NaN = makeExports(NAN);

/**
 * 判断是否为 arguments
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Arguments = makeExports(ARGUMENTS);

/**
 * 判断是否为 date
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Date = makeExports(DATE);

/**
 * 判断是否为 error
 * @param any {*} 待判断对象
 * @type {Function}
 */
typeis.Error = makeExports(ERROR);
