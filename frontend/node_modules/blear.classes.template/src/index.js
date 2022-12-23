/**
 * 指令类型模板引擎
 *
 * @author ydr.me
 * @create 2016-05-01 13:20
 */


'use strict';


var Events = require('blear.classes.events');
var object = require('blear.utils.object');
var array = require('blear.utils.array');
var collection = require('blear.utils.collection');
var number = require('blear.utils.number');
var string = require('blear.utils.string');
var fun = require('blear.utils.function');
var random = require('blear.utils.random');
var typeis = require('blear.utils.typeis');

var Lexer = require('./_lexer');


var staticDirectives = {};
var staticStatements = {};
var reOriginal = /^=/;
var reSafeKey = /^[a-z_$][a-z\d$_]*$/i;
var reUnExp = /\\$/;
var reDoubleBackSlash = /\\\\$/;
var IGNORE_SEP = '•';
var reStatement = /^#/;
var reDirective = /^[@:]/;
var reExpression = /\{\{.*?}}/;
var reIgnore = /\{\{#ignore}}([\s\S]*?)\{\{\/ignore}}/g;
var reSlash = /\\\{\{.*?}}/g;


/**
 * 数组转对象
 * @param list
 * @returns {{}}
 */
var list2Map = function (list) {
    return array.reduce(list, function (prev, now) {
        prev[now] = true;
        return prev;
    }, {});
};

var singleTagList = "area base br col doctype embed hr img input keygen link menuitem meta param source track wbr".split(' ');
var booleanAttrList = 'selected checked disabled readonly required open autofocus controls autoplay compact loop defer multiple'.split(' ');
var singleTagMap = list2Map(singleTagList);
var booleanAttrMap = list2Map(booleanAttrList);

/**
 * 生成变量名
 * @returns {string}
 */
var generateVarName = (function () {
    var id = 0;
    return function () {
        return '__' + (id++) + '__';
    };
}());


/**
 * 字符化，双引号
 * @param value
 * @param noQuote
 */
var textify = function (value, noQuote) {
    var ret = string.textify(value);

    if (noQuote) {
        return ret;
    }

    return '"' + ret + '"';
};

var STATIC_METHODS = {};

var defaults = {
    /**
     * 方法
     * @type Object
     */
    methods: {},

    /**
     * 是否压缩产出
     * @type Boolean
     */
    compress: true,

    /**
     * 是否保留注释
     * @type Boolean
     */
    comment: false,

    /**
     * 是否调试模式，如果是，将插入 `debugger` 到编译后的函数内
     * @type Boolean
     */
    debug: false
};
var Template = Events.extend({
    className: 'Template',
    constructor: function (template, options) {
        var the = this;

        Template.parent(the);
        the[_options] = options = object.assign(true, {}, defaults, options);
        the[_instanceMethods] = object.assign({}, STATIC_METHODS, options.methods);
        the[_dataName] = generateVarName();
        the[_methodsName] = generateVarName();
        the[_thisName] = generateVarName();
        the[_outputName] = generateVarName();
        the[_protectionName] = generateVarName();
        the[_directives] = object.assign({}, staticDirectives);
        the[_statements] = object.assign({}, staticStatements);
        the[_directivesList] = initDirectives(the[_directives]);
        the[_temporary] = {};
        template = the[_processIgnoreStatement](template);
        template = the[_processSlashStatement](template);
        the[_tokens] = new Lexer(template).lex();

        if (typeof DEBUG !== 'undefined' && DEBUG === true) {
            console.log('_tokens', the[_tokens]);
        }

        the[_pos] = -1;
        the[_vTemplate] = the[_parse]();

        if (typeof DEBUG !== 'undefined' && DEBUG === true) {
            console.log('_vTemplate', the[_vTemplate]);
        }
    },


    /**
     * 添加实例方法
     * @param name
     * @param fn
     * @returns {Template}
     */
    method: function (name, fn) {
        var the = this;
        the[_instanceMethods][name] = fn;
        return the;
    },


    /**
     * 获取 this 的名称
     * @returns {String}
     */
    thisName: function () {
        return this[_thisName];
    },


    /**
     * 获取 data 的名称
     * @returns {String}
     */
    dataName: function () {
        return this[_dataName];
    },


    /**
     * 获取 protection 的名称
     * @returns {String}
     */
    protectionName: function () {
        return this[_protectionName];
    },


    /**
     * output name
     * @return String
     */
    outputName: function () {
        return this[_outputName];
    },


    /**
     * 生成随机名称
     * @return String
     */
    genVarName: function () {
        return generateVarName();
    },


    /**
     * 编译成函数
     * @returns {Template}
     */
    compile: function () {
        var the = this;
        var options = the[_options];
        var compilerStrList = [];
        var compile = function (children) {
            var blockList = [];
            var spliceWhich = function (index, whiches) {
                while (index--) {
                    var found = false;

                    array.each(whiches, function (_, which) {
                        if (children[index].directives && children[index].directives[which]) {
                            found = true;
                            return false;
                        }
                    });

                    if (found) {
                        break;
                    }

                    blockList.splice(index, 1);
                }
            };

            array.each(children, function (index, child) {
                var directiveRet = ['', ''];
                var sliceList = [];

                switch (child.type) {
                    case 'el':
                        if (child.directives['else']) {
                            spliceWhich(index, ['if']);
                        } else if (child.directives['else-if']) {
                            spliceWhich(index, ['if', 'else-if']);
                        }

                        var htmlStart = '<' + child.tag;
                        var htmlEnd = '</' + child.tag + '>';
                        directiveRet = the[_compileDirectives](child);
                        var htmlAttrs = the[_compileAttrs](child);
                        sliceList.push(directiveRet[0] + '');
                        sliceList.push(the[_outputName] + ' += ' + textify(htmlStart) + ';');
                        sliceList.push(htmlAttrs);
                        sliceList.push(the[_outputName] + ' += ">";');

                        // 非自闭标签
                        if (child.children) {
                            sliceList.push(compile(child.children));
                            sliceList.push(the[_outputName] + ' += ' + textify(htmlEnd) + ';');
                        }

                        break;

                    case 'text':
                        sliceList.push(the[_outputName] + ' += ' + textify(child.value) + ';');
                        break;

                    case 'exp':
                        var isOriginal = false;
                        var value = child.value.replace(reOriginal, function () {
                            isOriginal = true;
                            return '';
                        });

                        if (!isOriginal) {
                            value = the[_thisName] + '.escape(' + value + ')';
                        }

                        sliceList.push(the[_outputName] + ' += ' + value + ';');
                        break;

                    case 'statement':
                        sliceList.push(the[_compileStatement](child));
                        break;

                    case 'comment':
                        if (options.comment) {
                            sliceList.push(the[_outputName] + ' += ' + textify(child.value) + ';');
                        }
                        break;
                }
                sliceList.push(directiveRet[1]);
                blockList.push(sliceList.join('\n'));
            });

            return blockList.join('\n');
        };

        var evalStr = generateVarName();
        var forKeyName = generateVarName();

        if (options.debug) {
            compilerStrList.push('debugger;');
        }

        // 编译之前
        the.emit('beforeCompile', compilerStrList);

        // 定义变量
        compilerStrList.push('var ' + the[_thisName] + ' = this;');
        compilerStrList.push('var ' + the[_outputName] + ' = "";');
        compilerStrList.push('var ' + evalStr + ' = "";');
        compilerStrList.push('var ' + forKeyName + ' = null;');
        // for in methods
        compilerStrList.push('for (' + forKeyName + ' in ' + the[_methodsName] + ') {');
        compilerStrList.push('  if (' + the[_thisName] + '.isSafeKey(' + the[_methodsName] + ', ' + forKeyName + ')) {');
        compilerStrList.push('    ' + evalStr + ' += "var " + ' + forKeyName + ' + " = ' +
            the[_methodsName] + '[\\"" + ' + forKeyName + ' + "\\"];";');
        compilerStrList.push('  }');
        compilerStrList.push('}');
        // for in data
        compilerStrList.push('for (' + forKeyName + ' in ' + the[_dataName] + ') {');
        compilerStrList.push('  if (' + the[_thisName] + '.isSafeKey(' + the[_dataName] + ', ' + forKeyName + ')) {');
        compilerStrList.push('    ' + evalStr + ' += "var " + ' + forKeyName + ' + " = ' +
            the[_dataName] + '[\\"" + ' + forKeyName + ' + "\\"];";');
        compilerStrList.push('  }');
        compilerStrList.push('}');
        // eval data/methods
        compilerStrList.push('eval(' + evalStr + ');');
        compilerStrList.push(compile(the[_vTemplate]));
        // 编译之后
        the.emit('afterCompile', compilerStrList);
        compilerStrList.push('return ' + the[_outputName] + ';');

        // 编译之前

        var compilerStr = compilerStrList.join('\n');


        try {
            /* jshint evil: true */
            the[_compiler] = new Function(the[_dataName], the[_methodsName], the[_protectionName], compilerStr);

            if (typeof DEBUG !== 'undefined' && DEBUG === true) {
                console.log('_compiler', the[_compiler]);
            }
        } catch (err) {
            if (typeof DEBUG !== 'undefined' && DEBUG === true) {
                console.log('_compiler', compilerStr);
            }

            throw err;
        }

        return the;
    },


    /**
     * 渲染
     * @param data {Object} 渲染数据
     * @param [protection] {object} 外部传来的保护对象
     * @returns {*}
     */
    render: function (data, protection) {
        var the = this;
        var context = {
            isSafeKey: function (obj, key) {
                return object.hasOwn(obj, key) && reSafeKey.test(key);
            },
            typeis: typeis,
            each: collection.each,
            escape: string.escapeHTML,
            bind: fun.bind
        };

        if (!the[_compiler]) {
            the.compile();
        }

        var html = string.trim(the[_compiler].call(context, data, the[_instanceMethods], protection));

        // recover ignore
        object.each(the[_temporary], function (key, original) {
            html = html.replace(key, original);
        });

        return html;
    },


    /**
     * 增加指令
     * @param name {String} 指令名称
     * @param priority {Number} 优先级
     * @param install {Function} 安装函数
     */
    directive: function (name, priority, install) {
        var the = this;

        the[_directives][name] = {
            name: name,
            priority: priority,
            install: install
        };
        the[_directivesList] = initDirectives(the[_directives]);
    },


    /**
     * 添加实例声明
     * @param name
     * @param install
     * @returns {Template}
     */
    statement: function (name, install) {
        var the = this;
        var statement = {};

        statement[name] = install;
        object.assign(the[_statements], statement);

        return the;
    },

    /**
     * 解析表达式
     * @param expression
     * @param scape
     * @returns {String}
     */
    parseExpression: function (expression, scape) {
        var the = this;
        var tokens = new Lexer(expression).lex();
        var index = 0;
        var token = tokens[index++];
        var exp = '';
        var expList = [];
        var inExp = false;
        var expStart = false;
        var isOriginal = false;

        while (token.type !== 'EOF') {
            var value = token.value;

            switch (token.type) {
                case 'EXPR_OPEN':
                    inExp = true;
                    isOriginal = false;
                    expStart = true;
                    // 表达式使用括号包裹 开始
                    exp = '(';
                    break;

                case 'END':
                    inExp = false;

                    if (!isOriginal && scape) {
                        exp += ')';
                    }

                    // 表达式使用括号包裹 结束
                    exp += ')';
                    expList.push(exp);
                    break;

                case 'TEXT':
                    expList.push(textify(value));
                    break;

                case 'STRING':
                    exp += textify(value);
                    break;

                default:
                    if (inExp) {
                        if (expStart) {
                            value = value.replace(reOriginal, function () {
                                isOriginal = true;
                                return '';
                            });

                            if (!isOriginal && scape) {
                                exp += the[_thisName] + '.escape(';
                            }
                        }

                        exp += value;
                        expStart = false;
                    } else {
                        expList.push(textify(value));
                    }
                    break;
            }
            token = tokens[index++];
        }

        return expList.join(' + ');
    }

});
var _options = Template.sole();
var _instanceMethods = Template.sole();
var _tokens = Template.sole();
var _parse = Template.sole();
var _program = Template.sole();
var _pos = Template.sole();
var _next = Template.sole();
var _vTemplate = Template.sole();
var _directives = Template.sole();
var _statements = Template.sole();
var _directivesList = Template.sole();
var _TEXT = Template.sole();
var _TAG_OPEN = Template.sole();
var _EXPR_OPEN = Template.sole();
var _STATEMENT_OPEN = Template.sole();
var _COMMENT = Template.sole();
var _compileAttrs = Template.sole();
var _compileDirectives = Template.sole();
var _compileStatement = Template.sole();
var _temporary = Template.sole();
var _processIgnoreStatement = Template.sole();
var _processSlashStatement = Template.sole();
var _compiler = Template.sole();
var _outputName = Template.sole();
var _thisName = Template.sole();
var _dataName = Template.sole();
var _methodsName = Template.sole();
var _protectionName = Template.sole();
var pro = Template.prototype;


/**
 * 处理 ignore
 * @param template
 * @returns {String}
 */
pro[_processIgnoreStatement] = function (template) {
    var the = this;

    return template.replace(reIgnore, function (source, original) {
        var key = IGNORE_SEP + random.guid() + IGNORE_SEP;
        the[_temporary][key] = original.replace(/\$/g, '$$$$');
        return key;
    });
};


/**
 * 处理 \
 * @param template
 * @returns {String}
 */
pro[_processSlashStatement] = function (template) {
    var the = this;

    return template.replace(reSlash, function (source) {
        var key = IGNORE_SEP + random.guid() + IGNORE_SEP;
        var original = source.slice(1);
        the[_temporary][key] = original.replace(/\$/g, '$$$$');
        return key;
    });
};


/**
 * 初始化指令
 */
var initDirectives = function (directives) {
    var directivesList = [];

    object.each(directives, function (index, directive) {
        directivesList.push(directive);
    });

    // 按照优先级排序
    directivesList.sort(function (a, b) {
        return b.priority - a.priority;
    });

    return directivesList
};


/**
 * 解析碎片
 * @returns {Array}
 */
pro[_parse] = function () {
    var the = this;
    var slices = [];
    var token = the[_next]();

    while (token && token.type !== 'EOF' && token.type !== 'TAG_CLOSE') {
        var slice = the[_program]();

        if (slice.type === 'text') {
            slices.push(slice);
            token = the[_next]();
            continue;
        }

        slices.push(slice);
        token = the[_next]();
    }

    return slices;
};

/**
 * 解析片段
 */
pro[_program] = function () {
    var the = this;
    var token = the[_next](0);

    switch (token.type) {
        case 'TEXT':
            return the[_TEXT](token);

        case 'TAG_OPEN':
            return the[_TAG_OPEN](token);

        case 'EXPR_OPEN':
            return the[_EXPR_OPEN](token);

        case 'OPEN':
        case 'CLOSE':
            return the[_STATEMENT_OPEN](token);

        case 'COMMENT':
            return the[_COMMENT](token);

        default:
            throw new SyntaxError('未知 token' + token);
    }
};


/**
 * 纯文本
 * @param token
 */
pro[_TEXT] = function (token) {
    var options = this[_options];
    var text = token.value;

    if (options.compress) {
        text = text.trim();
    }

    return {
        type: 'text',
        value: text
    };
};


/**
 * 标签开始
 * @param token
 * @returns {{children: *, attrs: {}, tag: *}}
 */
pro[_TAG_OPEN] = function (token) {
    var the = this;
    var attrs = {};
    var directives = {};
    var classMap = {};
    var styleMap = {};
    var lastName = '';
    var type = token.value;
    var value = token.value;
    var tag = value.toLocaleLowerCase();
    var isDirective = false;
    var directiveName;

    var push = function () {
        if (!lastName) {
            return;
        }

        if (isDirective) {
            directives[lastName] = {
                name: lastName,
                value: true,
                filters: []
            };
        } else {
            attrs[lastName] = true;
        }

        isDirective = false;
        lastName = '';
    };


    while (type !== '>') {
        switch (type) {
            case 'NAME':
                push();
                lastName = value;
                // 指令
                directiveName = lastName.replace(reDirective, function () {
                    isDirective = true;
                    return '';
                });

                if (isDirective) {
                    lastName = directiveName;
                }

                break;

            case '=':
                break;

            case 'STRING':
                // 如果是指令的话，则不需要解析属性值
                if (isDirective) {
                    var directiveList = lastName.split('.');
                    directiveName = directiveList.shift();
                    directives[directiveName] = {
                        name: directiveName,
                        value: value,
                        filters: directiveList
                    };
                } else {
                    attrs[lastName] = value || (booleanAttrMap[lastName] ? '{{true}}' : '');
                }

                lastName = '';
                isDirective = false;
                break;
        }

        token = the[_next]();
        type = token.type;
        value = token.value;
    }

    push();

    var isSingle = singleTagMap[tag];
    var ret = {
        type: 'el',
        directives: directives,
        attrs: attrs,
        tag: tag,
        classMap: classMap,
        styleMap: styleMap
    };

    if (tag === 'doctype') {
        ret.tag = '!' + ret.tag;
    }

    if (!isSingle) {
        ret.children = the[_parse]();
    }

    return ret;
};


/**
 * 表达式开始
 * @returns {{type: string, value: String}}
 */
pro[_EXPR_OPEN] = function () {
    var the = this;
    var token = the[_next]();
    var lastToken;

    // 半个空值表达式，忽略之
    if (token.type === 'EXPR_OPEN') {
        the[_next](-1);
        return {
            type: 'text',
            value: '{{'
        };
    }

    var value = '';

    while (true) {
        if (token.type === 'STRING') {
            token.value = textify(token.value);
        }

        value += lastToken && lastToken.type === 'IDENT' && token.type === lastToken.type ? ' ' : '';
        value += token.value;
        lastToken = token;
        token = the[_next]();

        // {{varible
        // 半个有值表达式，忽略之
        if (token.type === 'EXPR_OPEN') {
            the[_next](-1);
            return {
                type: 'text',
                value: '{{' + value
            };
        }

        // 完整表达式
        if (token.type === 'END') {
            break;
        }
    }

    return {
        type: 'exp',
        value: value
    };
};


pro[_STATEMENT_OPEN] = function () {
    var the = this;
    var token = the[_next](0);
    var type = token.type;
    var values = [];
    var statement = {
        type: 'statement',
        open: type === 'OPEN',
        name: token.value,
        value: ''
    };

    if (type === 'CLOSE') {
        return statement;
    }

    token = the[_next]();

    while (token.type !== 'END') {
        var _value = token.value;

        switch (token.type) {
            case 'STRING':
                _value = textify(_value);
                break;
        }

        values.push(_value);
        token = the[_next]();
    }

    statement.value = values.join(' ');
    return statement;
};


pro[_COMMENT] = function () {
    var the = this;
    var token = the[_next](0);

    return {
        type: 'comment',
        value: token.value
    };
};

/**
 * 下一步
 * @param [step]
 */
pro[_next] = function (step) {
    var the = this;
    the[_pos] += number.parseInt(step, 1);
    return the[_tokens][the[_pos]];
};


/**
 * 编译属性
 * @param vnode
 * @returns {string}
 */
pro[_compileAttrs] = function (vnode) {
    var the = this;
    var arttsList = [];
    var attrs = vnode.attrs;

    // class=" + (class1 ? "class1" : "") + "class2" +"
    //           ^^^                         ^^^
    //           表达式求值                    常量
    object.each(vnode.classMap, function (value, exp) {
        vnode.attrs['class'] = (' ' + (vnode.attrs['class'] || '') + ' ').replace(' ' + value + ' ', '');
        vnode.attrs['class'] += ' {{(Boolean(' + exp + ') ? " ' + value + '" : "")}}';
    });

    // style=" + ("font-size:" + fontSize + "px;")
    vnode.attrs.style = vnode.attrs.style || '';
    object.each(vnode.styleMap, function (value, exp) {
        vnode.attrs.style += ' {{(";' + value + ':" + ' + exp + ' + ";")}}';
    });

    object.each(attrs, function (name, value) {
        if (!value) {
            return;
        }

        // 表达式求值
        if (reExpression.test(value) && value !== true) {
            value = the.parseExpression(value, false);

            // 布尔属性
            if (booleanAttrMap[name]) {
                arttsList.push(the[_outputName] + ' += " " + (Boolean(' + value + ') ? ' + textify(name) + ' : "");');
            } else {
                arttsList.push(the[_outputName] + ' += " " + ' + textify(name) + ' + "=\\"" + ' + value + ' + "\\"";');
            }
        }
        // 常量
        else {
            if (value && value !== true) {
                arttsList.push(the[_outputName] + ' += " " + ' + textify(name) + ' + "=\\"" + ' + textify(value) + ' + "\\"";');
            } else {
                arttsList.push(the[_outputName] + ' += " " + ' + textify(name) + ';');
            }
        }
    });

    return arttsList.join('\n');
};


/**
 * 编译指令
 * @param vnode
 */
pro[_compileDirectives] = function (vnode) {
    var the = this;
    var ret = ['', ''];
    var beforeList = [];
    var afterList = [];

    array.each(the[_directivesList], function (index, directive) {
        var registedDirectiveName = directive.name;

        // 实际指令
        if (registedDirectiveName in vnode.directives) {
            var instanceDirective = vnode.directives[registedDirectiveName];
            var _ret = directive.install.call(the, vnode, instanceDirective) || ret;

            instanceDirective.installed = true;
            beforeList.push(_ret[0]);
            afterList.unshift(_ret[1]);
        }
    });

    if (typeof DEBUG !== 'undefined' && DEBUG === true) {
        var unsupportNames = [];

        object.each(vnode.directives, function (index, directive) {
            if (!directive.installed) {
                unsupportNames.push(directive.name);
            }
        });

        if (unsupportNames.length) {
            console.warn('不支持该指令：@' + unsupportNames.join('/'));
        }
    }

    return [beforeList.join('\n'), afterList.join('\n')];
};


/**
 * 编译声明
 * @param vnode
 * @returns {*}
 */
pro[_compileStatement] = function (vnode) {
    var the = this;
    var statementName = vnode.name;
    var statement = the[_statements][statementName];

    if (typeof DEBUG !== 'undefined' && DEBUG === true) {
        if (!statement) {
            console.warn('不支持该声明：#' + statementName);
        }
    }

    if (!statement) {
        return '';
    }

    return statement.call(the, vnode);
};


/**
 * 增加指令
 * @param name {String} 指令名称
 * @param priority {Number} 优先级
 * @param install {Function} 安装函数
 */
Template.directive = function (name, priority, install) {
    staticDirectives[name] = {
        name: name,
        priority: priority,
        install: install
    };
};


/**
 * 添加静态方法
 * @param name
 * @param fn
 */
Template.method = function (name, fn) {
    STATIC_METHODS[name] = fn;
};


/**
 * 添加静态声明
 * @param name
 * @param install
 */
Template.statement = function (name, install) {
    staticStatements[name] = install;
};


/**
 * 字符化
 * @param value
 */
Template.textify = function (value) {
    return textify(value);
};


/**
 * 判断字符串是否为表达式
 * @param value
 * @returns {boolean}
 */
Template.isExpression = function (value) {
    return reExpression.test(value);
};


var BASE_PRIORITY = 10000;
Template.directive('if', BASE_PRIORITY, require('./_directives/if.js'));
Template.directive('else-if', BASE_PRIORITY - 1, require('./_directives/else-if.js'));
Template.directive('else', BASE_PRIORITY - 2, require('./_directives/else.js'));
Template.directive('show', BASE_PRIORITY - 3, require('./_directives/show.js'));
Template.directive('class', BASE_PRIORITY / 10, require('./_directives/class.js'));
Template.directive('style', BASE_PRIORITY / 10 - 1, require('./_directives/style.js'));
Template.directive('order', BASE_PRIORITY / 100, require('./_directives/order.js'));
Template.directive('for', BASE_PRIORITY / 100 - 1, require('./_directives/for.js'));
Template.directive('limit', BASE_PRIORITY / 100 - 2, require('./_directives/limit.js'));
Template.directive('filter', BASE_PRIORITY / 100 - 3, require('./_directives/filter.js'));

Template.statement('if', require('./_statements/if.js'));
Template.statement('else', require('./_statements/else.js'));
Template.statement('for', require('./_statements/for.js'));
Template.statement('set', require('./_statements/set.js'));

Template.defaults = defaults;
module.exports = Template;
