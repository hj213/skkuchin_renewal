/**
 * cli 类
 * @author ydr.me
 * @create 2018-08-16 10:19
 * @update 2018年08月21日08:11:08
 */


'use strict';

var Class = require('blear.classes.class');
var object = require('blear.utils.object');
var access = require('blear.utils.access');
var array = require('blear.utils.array');
var string = require('blear.utils.string');
var typeis = require('blear.utils.typeis');
var version = require('blear.utils.version');
var console = require('blear.node.console');
var request = require('blear.node.request');
var url = require('blear.utils.url');
var path = require('path');
var minimist = require('minimist');

var defaults = {
    /**
     * 检查仓库，用户版本号检测
     */
    registry: 'https://registry.npm.taobao.org',

    /**
     * 键单行显示的长度，超过的话值会顺延换行
     * @type number
     */
    breakLength: 30,

    /**
     * 命令名称
     * @type string
     */
    bin: '',

    /**
     * 命令模块的 package.json 描述
     * @type null | object
     */
    package: null
};
var Cli = Class.extend({
    constructor: function () {
        this.console = console;
        this.Cli = Cli;
        this[_bin] = null;
        this[_banner] = null;
        this[_rootCommander] = {
            root: true,
            default: true
        };
        this[_commanderMap] = {};
        this[_commanderList] = [];
        this[_guess] = function (command) {
            this[_slogan]();
            this.console.log('The `%s` command does not exist.' +
                ' Please pay attention to the spell check.', command);
        };
    },

    /**
     * 配置 banner 信息
     * @param banner {string}
     * @returns {Cli}
     */
    banner: function (banner) {
        this[_banner] = banner;
        return this;
    },

    /**
     * 新增命令
     * @param [command] {string} 命令
     * @param [description] {string} 描述
     * @returns {Cli}
     */
    command: function (command, description) {
        if (command) {
            if (this[_commanderMap][command]) {
                throw new Error('cannot add the `' + command + '` method with the same name');
            }

            this[_currentCommander] = {};
            this[_commanderMap][command] = this[_currentCommander];
        } else {
            if (this[_rootCommander].default === false) {
                throw new Error('the root command can only be executed once');
            }

            this[_currentCommander] = this[_rootCommander];
            this[_rootCommander].default = false;
        }

        this[_currentCommander].command = command;
        this[_currentCommander].commandOptions = this[_currentCommandOptions] = {};
        this[_currentCommander].commandOptionsAliases = {};
        this[_currentCommander].commandAction = function () {
            this.console.error('the %s command does nothing', command ? '`' + command + '`' : 'root');
        };
        this[_currentCommander].commandError = this[_error];
        this[_currentCommander].commandDescription = description || '';
        this[_currentCommander].commandUsageList = [];

        this[_currentCommander].methodOptionsMap = {};
        this[_currentCommander].methodOptionsAliasesMap = {};
        this[_currentCommander].methodActionsMap = {};
        this[_currentCommander].methodsMap = this[_currentMethodsMap] = {};
        this[_currentMethod] = null;
        this[_commanderList].push(this[_currentCommander]);

        return this;
    },

    /**
     * 版本配置
     * @param [description] {string}
     * @returns {Cli}
     */
    versioning: function (description) {
        return this.option('version', {
            alias: ['v', 'V'],
            description: description || 'print version information',
            _for: null,
            action: this.version
        });
    },

    /**
     * 帮助配置
     * @param [description] {string}
     * @returns {Cli}
     */
    helper: function (description) {
        return this.option('help', {
            alias: ['h', 'H'],
            description: description || 'print help information',
            _for: null,
            action: this.help
        });
    },

    /**
     * 添加用法
     * @param example {string}
     * @param [description] {string}
     * @returns {Cli}
     */
    usage: function (example, description) {
        this[_currentCommander].commandUsageList.push({
            example: example,
            description: description || ''
        });
        return this;
    },

    /**
     * 添加方法
     * @param method
     * @param [description]
     * @returns {Cli}
     */
    method: function (method, description) {
        if (this[_currentCommander].root) {
            throw new Error('cannot add method to root command');
        }

        this[_currentMethodsMap][method] = this[_currentMethod] = {
            method: method,
            description: description || ''
        };
        this[_currentCommander].methodOptionsMap[method] = {};
        this[_currentCommander].methodOptionsAliasesMap[method] = {};
        return this;
    },

    /**
     * 配置参数
     * @param key
     * @param [option] {string | object} 配置，或描述
     * @param [option.alias] {string | array} 别名，可以是多个
     * @param [option.default] {string} 默认值
     * @param [option.type] {string} 类型，目前仅支持 string、boolean、array
     * @param [option.transform] {function} 转换
     * @param [option.description] {string} 描述
     * @param [option.required=false] {boolean} 是否必填
     * @param [option.message] {string} 参数不符合要求时显示
     * @returns {Cli}
     */
    option: function (key, option) {
        if (typeis.String(option)) {
            option = {
                description: option
            };
        }

        option = option || {};
        option.key = key;

        this[_optionLimit](option);
        this[_optionFor](option);
        this[_optionAlias](option);
        return this;
    },

    /**
     * 执行动作
     * @param action {function} 动作
     * @returns {Cli}
     */
    action: function (action) {
        if (!typeis.Function(action)) {
            throw new Error('the `action` parameter must be a function');
        }

        var method = this[_currentMethod];

        if (method) {
            this[_currentCommander].methodActionsMap[method.method] = action;
        } else {
            this[_currentCommander].commandAction = action;
        }

        return this;
    },

    /**
     * 执行命令
     * @param command {string} 命令
     * @param [argv] {object} 配置
     * @param [params] {array} 参数
     * @returns {Cli}
     */
    exec: function (command, argv, params) {
        var args = access.args(arguments);
        var _0 = args[0];
        var _1 = args[1];
        var _2 = args[2];

        switch (args.length) {
            case 0:
                throw new Error('please specify the command to be executed');

            case 1:
                argv = {};
                params = [];
                break;

            case 2:
                if (typeis.Array(_1)) {
                    params = _1;
                    argv = {};
                } else if (typeis.Object(_1)) {
                    argv = _1;
                    params = [];
                } else {
                    throw new Error('the second parameter type must be an object or an array');
                }
                break;
        }

        if (!typeis.String(command)) {
            throw new Error('`command` parameter type must be a string');
        }

        this[_exec](command, argv, params);
        return this;
    },

    /**
     * 参数有错误
     * @param error
     * @returns {Cli}
     */
    error: function (error) {
        if (!typeis.Function(error)) {
            throw new Error('the `error` parameter must be a function');
        }

        this[_currentCommander].commandError = error;
        return this;
    },

    /**
     * 解析入参
     * @param [argv]
     * @param [options]
     * @param [options.registry]
     * @param [options.breakLength]
     * @param [options.bin]
     * @param [options.package]
     * @returns {Cli}
     */
    parse: function (argv, options) {
        // 根命令未配置
        if (this[_rootCommander].root && this[_rootCommander].default) {
            throw new Error('at least you need to configure the root command');
        }

        var args = access.args(arguments);

        if (args.length === 1) {
            if (typeis.Array(args[0])) {
                argv = args[0];
                options = {};
            } else {
                options = args[0];
                argv = process.argv;
            }
        }

        if (!options.package) {
            throw new TypeError('the `package` parameter cannot be empty');
        }

        this[_options] = object.assign({}, defaults, options);
        this[_bin] = this[_options].bin || path.basename(argv[1]);
        this[_argv] = minimist(argv.slice(2), {
            boolean: ['version', 'help'],
            alias: {
                version: ['v', 'V'],
                help: ['h', 'H']
            }
        });
        var command = this[_argv]._.shift();
        var params = this[_argv]._;
        this[_exec](command, this[_argv], params);
    },

    /**
     * 打印帮助信息
     * @param [command] {string | null} 命令
     * @param [params] {array} 其他参数
     * @returns {Cli}
     */
    help: function (command, params) {
        var the = this;
        var commander = command ? this[_commanderMap][command] : this[_rootCommander] || this[_rootCommander];
        var commanders = commander === this[_rootCommander] ? this[_commanderList] : [commander];
        var padding = 2;
        var titleColors = ['inverse'];
        var titleLength = 12;
        var titlePadding = string.repeat(' ', padding);
        var buildTitle = function (list, name) {
            var endding = ':';

            if (list.length > 1) {
                endding = 's:';
            }

            return the.console.pretty(
                string.padEnd(
                    titlePadding + name + endding,
                    titleLength
                ), titleColors
            );
        };
        params = params || [];
        var method = params[0];

        // print usage
        var usagePrints = [];
        array.each(commanders, function (index, commander) {
            array.each(commander.commandUsageList, function (index, usage) {
                usagePrints.push([usage.example, usage.description]);
            });
        });
        if (usagePrints.length) {
            this.console.log(buildTitle(usagePrints, 'Usage'));
            this[_print](padding, usagePrints);
        }

        // print commands
        var commandPrints = [];
        array.each(commanders, function (index, commander) {
            if (commander.root) {
                return;
            }

            commandPrints.push([commander.command, commander.commandDescription]);
        });
        if (commandPrints.length) {
            if (usagePrints.length) {
                this.console.log();
            }

            this.console.log(buildTitle(commandPrints, 'Command'));
            this[_print](padding, commandPrints);
        }

        // print methods
        var methodPrints = [];
        var methodDetail = null;
        if (method) {
            methodDetail = commander.methodsMap[method];

            if (methodDetail) {
                methodPrints.push([methodDetail.method, methodDetail.description]);
            }
        }

        if (!methodDetail) {
            object.each(commander.methodsMap, function (_, detail) {
                methodPrints.push([detail.method, detail.description]);
            });
        }

        if (methodPrints.length) {
            if (usagePrints.length || commandPrints.length) {
                this.console.log();
            }

            this.console.log(buildTitle(methodPrints, 'Method'));
            this[_print](padding, methodPrints);
        }

        // print options
        var optionsPrints = [];
        object.each(commander.commandOptions, function (key, option) {
            optionsPrints.push([option._keys.join(', '), option.description]);
        });
        if (method) {
            var methodOptions = commander.methodOptionsMap[method];
            object.each(methodOptions, function (key, option) {
                optionsPrints.push([option._keys.join(', '), option.description]);
            });
        }
        if (optionsPrints.length) {
            if (usagePrints.length || commandPrints.length || methodPrints.length) {
                this.console.log();
            }

            this.console.log(buildTitle(optionsPrints, 'Option'));
            this[_print](padding, optionsPrints);
        }

        return this;
    },

    /**
     * 输出版本并进行版本比较
     * @returns {Cli}
     */
    version: function () {
        this[_checkVersion]();
        return this;
    },

    /**
     * 命令猜想
     * @param guess
     * @returns {Cli}
     */
    guess: function (guess) {
        if (typeis.Function(guess)) {
            this[_guess] = guess;
        }
        return this;
    }
});
var sole = Cli.sole;
var prot = Cli.prototype;
var _options = sole();
var _bin = sole();
var _banner = sole();
var _rootCommander = sole();
var _commanderMap = sole();
var _commanderList = sole();
var _currentCommander = sole();
var _currentMethod = sole();
var _currentMethodsMap = sole();
var _currentCommandOptions = sole();
var _argv = sole();
var _slogan = sole();
var _exec = sole();
var _print = sole();
var _error = sole();
var _optionLimit = sole();
var _optionFor = sole();
var _optionAlias = sole();
var _checkVersion = sole();
var _guess = sole();

prot[_slogan] = function () {
    switch (typeis(this[_banner])) {
        case 'string':
            this.console.log(this[_banner]);
            break;

        case 'function':
            this[_banner]();
            break;
    }
};

/**
 * 执行命令
 * @param command {string | undefined}
 * @param argv {object}
 * @param params {array}
 * @returns {*}
 */
prot[_exec] = function (command, argv, params) {
    var commander = command ? this[_commanderMap][command] : this[_rootCommander];
    object.each(argv, function (k, v) {
        if (typeis.Number(v)) {
            argv[k] = string.ify(v);
        }
    });

    // 子命令未配置
    if (!commander) {
        this[_guess].call(this, command, argv, params);
        return;
    }

    var args = {};
    var commanderOptions = commander.commandOptions;
    var helpOption = commanderOptions.help;
    var versionOPtion = commanderOptions.version;
    var the = this;
    var methodOptions;
    var method = params[0];

    if (method) {
        methodOptions = commander.methodOptionsMap[method];
    }

    if (argv.help && helpOption) {
        this[_slogan]();
        return helpOption.action.call(this, command, params);
    }

    if (argv.version && versionOPtion) {
        this[_slogan]();
        return versionOPtion.action.call(this, command, params);
    }

    var eachOptions = function (options) {
        if (!options) {
            return false;
        }

        var broken = false;
        object.each(options, function (key, option) {
            if (key === 'help' || key === 'version') {
                return;
            }

            var val = undefined;
            var expectType = option.type;

            array.each(option.keys, function (index, k) {
                var v1 = argv[k];
                var v2 = v1;
                var actualType = typeis(v1);

                if (actualType === 'undefined') {
                    return;
                }

                switch (expectType) {
                    case 'boolean':
                        v2 = Boolean(v1);
                        break;

                    case 'string':
                        switch (actualType) {
                            case 'array':
                                v2 = v1[0];
                                break;

                            case 'boolean':
                                v2 = option.default;
                                break;
                        }
                        v2 = string.ify(v2);
                        break;

                    case 'array':
                        switch (actualType) {
                            case 'string':
                                v2 = [v1];
                                break;

                            case 'boolean':
                                v2 = option.default;
                                break;
                        }
                        break;
                }

                if (typeis(v2) === expectType) {
                    key = option._keyMap[k];
                    val = v2;
                    return false;
                }
            });

            val = val === undefined ? option.default : val;
            val = option.transform(val, args, params);
            args[string.humprize(key)] = val;

            if (
                // 字符串 || 数组
                (expectType === 'string' || expectType === 'array') &&
                // 空字符串 || 空数组
                option.required === true && val.length === 0
            ) {
                broken = true;
                commander.commandError.call(the, key, args, option, params);
                return false;
            }
        });
        return broken;
    };

    if (eachOptions(commanderOptions)) {
        return false;
    }

    if (eachOptions(methodOptions)) {
        return false;
    }

    if (method) {
        var methodAction = commander.methodActionsMap[method];

        if (typeis.Function(methodAction)) {
            this[_slogan]();
            methodAction.call(this, args, params);
            return;
        }
    }

    this[_slogan]();
    commander.commandAction.call(this, args, params);
};

/**
 * 缩进打印
 * @param indentLength
 * @param list
 */
prot[_print] = function (indentLength, list) {
    var the = this;
    var lines = [];
    var breakLength = this[_options].breakLength;
    var space = '  ';
    var spaceLen = space.length;
    var indent = string.repeat(' ', indentLength);
    // indent + space + key + space + val;
    var valIndent = string.repeat(' ', indentLength + spaceLen + breakLength);

    array.each(list, function (index, line) {
        var key = line[0];
        var val = line[1];
        var keyLen = key.length;

        // key 过长
        if (keyLen > breakLength) {
            lines.push(
                [
                    indent,
                    the.console.colors.bold(key)
                ].join('')
            );

            if (val.length) {
                lines.push(indentText(valIndent, val, true));
            }
        } else {
            lines.push(
                [
                    indent,
                    the.console.colors.bold(string.padEnd(key, breakLength, ' ')),
                    space,
                    indentText(valIndent, val, false)
                ].join('')
            );
        }
    });

    this.console.log(lines.join('\n'));
};

/**
 * 打印错误信息
 * @param key
 * @param args
 * @param option
 * @param method
 */
prot[_error] = function (key, args, option, method) {
    this[_slogan]();
    this.console.error(option.message);
};

/**
 * 限制 option
 * @param option
 */
prot[_optionLimit] = function (option) {
    var key = option.key;

    if (!typeis.Function(option.transform)) {
        option.transform = function (val, args, method) {
            return val;
        };
    }

    option.type = option.type || 'string';
    option.required = Boolean(option.required);
    option.message = option.message || '`' + key + '` parameter cannot be empty';
    option.description = option.description || '';

    if (typeis.Undefined(option.default)) {
        switch (option.type) {
            case 'boolean':
                option.default = false;
                break;

            case 'array':
                option.default = [];
                break;

            case 'string':
                option.default = '';
                break;
        }
    }
};

/**
 * 处理 option 指向
 * @param option
 */
prot[_optionFor] = function (option) {
    var commander = this[_currentCommander];
    var key = option.key;
    var commandName = commander.command;
    var optionFor = option._for = this[_currentMethod] && option._for === undefined
        ? this[_currentMethod].method
        : null;

    if (optionFor) {
        var method = this[_currentMethodsMap][optionFor];
        var methodName = method.method;
        var methodOptions = commander.methodOptionsMap[methodName];

        if (methodOptions[key]) {
            throw new Error('the `option` of the `' + methodName + '` method of ' +
                'the `' + commandName + '` command already exists');
        }

        // add option
        methodOptions[key] = option;
        return;
    }

    if (this[_currentCommandOptions][key]) {
        throw new Error('the `' + key + '` option of the `' +
            commandName + '` command already exists');
    }

    // add option
    this[_currentCommandOptions][key] = option;
};

/**
 * 处理 option.alias
 * @param option
 */
prot[_optionAlias] = function (option) {
    var key = option.key;
    var optionFor = option._for;
    var commander = this[_currentCommander];

    if (typeis.String(option.alias)) {
        option.alias = [option.alias];
    }

    var aliases = option.alias || [];
    option.keys = [key].concat(aliases);
    option._keys = ['--' + key].concat(aliases.map(function (key) {
        return '-' + key;
    }));
    option._keyMap = array.reduce(option.keys, function (p, c, i) {
        p[c] = key;
        return p;
    }, {});

    // for command
    var commandName = commander.command;
    if (optionFor === null) {
        aliases = commander.commandOptionsAliases;
    }
    // for methods
    else {
        aliases = commander.methodOptionsAliasesMap[optionFor];
    }

    object.each(option._keyMap, function (alias) {
        if (aliases[alias]) {
            throw new Error('the `' + alias + '` alias of the `' + option.key + '` option ' +
                'of the `' + commandName + '` command already exists');
        }

        aliases[alias] = true;
    });
};

/**
 * 版本检查
 */
prot[_checkVersion] = function () {
    var the = this;
    var pkg = this[_options].package;

    this.console.log('The local version is %s.', pkg.version);
    this.console.loading();
    request({
        url: url.join(this[_options].registry, pkg.name)
    }, function (err, body) {
        /* istanbul ignore if */
        if (err) {
            the.console.loadingEnd();
            return
        }

        try {
            var json = JSON.parse(body);
        } catch (err) {
            /* istanbul ignore next */
            the.console.loadingEnd();
            /* istanbul ignore next */
            return;
        }

        var latestVersion = json['dist-tags'] && json['dist-tags'].latest || '';

        if (!latestVersion) {
            the.console.loadingEnd();
            return;
        }

        the.console.loadingEnd();
        var currentVersion = pkg.version;
        if (version.lt(currentVersion, latestVersion)) {
            the.console.log(
                the.console.pretty(
                    'Update available %s → %s.',
                    currentVersion,
                    latestVersion,
                    [
                        'bold'
                    ]
                )
            );
            the.console.log('Run `' +
                the.console.pretty('npm install %s --global --registry=%s', [
                    'bold'
                ]) +
                '` to update.', pkg.name, the[_options].registry);
        } else {
            the.console.log('The local version is up to date.');
        }
    });
};

/**
 * 私有方法，专为单元测试用
 * 注入 console，以便单元测试可以捕获打印信息
 * @param _console
 */
prot.$$injectConsole$$ = function (_console) {
    this.console = _console;
};

Cli.defaults = defaults;

module.exports = Cli;

// =============================


/**
 * 文本缩进
 * @param indent
 * @param text
 * @param indentFirstLine
 * @returns {string}
 */
function indentText(indent, text, indentFirstLine) {
    var lines = text.split(/[\n\r]/g);
    var list = [];

    array.each(lines, function (index, line) {
        if (index === 0 && !indentFirstLine) {
            list.push(line);
            return;
        }

        list.push(
            indent + line
        );
    });

    return list.join('\n');
}


