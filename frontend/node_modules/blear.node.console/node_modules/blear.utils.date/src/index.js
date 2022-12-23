/**
 * 日期模块
 * @author ydr.me
 * @create 2016年5月18日13:45:44
 * @update 2016年11月26日14:29:44
 */

'use strict';

var array = require('blear.utils.array');
var access = require('blear.utils.access');
var number = require('blear.utils.number');
var string = require('blear.utils.string');
var typeis = require('blear.utils.typeis');

var weeks = '日一二三四五六';
var monthDates = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var defaultFormat = exports.defaultFormat = 'YYYY-MM-DD HH:mm:ss';
var SECOND_TIME = 1000;
var MINUTE_TIME = 60 * SECOND_TIME;
var HOUR_TIME = 60 * MINUTE_TIME;
var DAY_TIME = 24 * HOUR_TIME;
var WEEK_TIME = 7 * DAY_TIME;
var MONTH_TIME = 30 * DAY_TIME;
var YEAR_TIME = 12 * MONTH_TIME;


exports.SECOND_TIME = SECOND_TIME;
exports.MINUTE_TIME = MINUTE_TIME;
exports.HOUR_TIME = HOUR_TIME;
exports.DAY_TIME = DAY_TIME;
exports.WEEK_TIME = WEEK_TIME;


/**
 * 当前时间戳
 * @returns {number}
 */
exports.now = function () {
    return Date.now();
};


/**
 * 当前日期 ID
 * @param date {... Number|String|Date}
 * @returns {number}
 */
exports.id = function (date) {
    var d = parse.apply(null, arguments);
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var a = d.getDate();

    return [
            string.padStart(y, 4, '0'),
            string.padStart(m, 2, '0'),
            string.padStart(a, 2, '0')
        ].join('') * 1;
};


/**
 * 将 id 解析为日期对象
 * @param id
 * @returns {Date}
 */
exports.fromId = function (id) {
    var str = id + '';
    var year = number.parseInt(str.slice(0, 4));
    var month = number.parseInt(str.slice(4, 6)) - 1;
    var date = number.parseInt(str.slice(-2));

    return new Date(year, month, date);
};


/**
 * 包装 Date 实例
 * @param date
 * @returns {Date}
 */
var wrapDate = function (date) {
    if (typeis.NaN(date.getTime())) {
        return new Date();
    }

    return date;
};


/**
 * 解析 date
 * @param date {...Date|String|Number} date 信息
 * @returns {Date}
 */
var parse = exports.parse = function (date) {
    if (typeis.Date(date)) {
        return wrapDate(date);
    }

    var args = access.args(arguments);

    // 如果直接传数组也是可以的
    if (typeis.Array(args[0])) {
        args = args[0];
    }

    switch (args.length) {
        case 0:
            return new Date();

        case 1:
            // new Date(2016) => 1970
            return wrapDate(new Date(args[0]));

        case 2:
            return wrapDate(new Date(args[0], args[1]));

        case 3:
            return wrapDate(new Date(args[0], args[1], args[2]));

        case 4:
            return wrapDate(new Date(args[0], args[1], args[2], args[3]));

        case 5:
            return wrapDate(new Date(args[0], args[1], args[2], args[3], args[4]));

        case 6:
            return wrapDate(new Date(args[0], args[1], args[2], args[3], args[4], args[5]));

        default:
            return wrapDate(new Date(args[0], args[1], args[2], args[3], args[4], args[5], args[6]));
    }
    //
    // try {
    //     date = new Date(date);
    // } catch (err) {
    //     // @fuckie
    //     /* istanbul ignore next */
    //     date = new Date();
    // }
    //
    // return wrapDate(date);
};


/**
 * 左填充 0
 * @param str
 * @param [maxLength]
 * @returns {String}
 */
var padStartWithZero = function (str, maxLength) {
    maxLength = maxLength || 2;
    return string.padStart(str, maxLength, '0');
};


/**
 * 格式化日期<br>
 * 主要参考ECMA规范定义：YYYY-MM-DDTHH:mm:ss.sssZ<br>
 * 其他参数参考自moment<br>
 *
 * @param {String} [format] 格式化字符串<br>
 * 假设当前时间为：2014年1月1日 19点9分9秒9毫秒 周三<br>
 * <strong>日期</strong><br>
 * 至少4位年份<code>YYYY</code> 2014<br>
 * 至少2位年份<code>YY</code> 14<br>
 * 至少2位月份<code>MM</code> 01<br>
 * 至少1位月份<code>M</code> 1<br>
 * 至少2位日期<code>DD</code> 01<br>
 * 至少1位日期<code>D</code> 1<br>
 *
 * <strong>时间</strong><br>
 * 至少2位24小时制小时<code>HH</code> 19<br>
 * 至少1位24小时制小时<code>H</code> 19<br>
 * 至少2位12小时制小时<code>hh</code> 07<br>
 * 至少1位12小时制小时<code>h</code> 7<br>
 * 至少2位分钟数<code>mm</code> 09<br>
 * 至少1位分钟数<code>m</code> 9<br>
 * 至少2位秒数<code>ss</code> 09<br>
 * 至少1位秒数<code>s</code> 9<br>
 * 至少3位毫秒数<code>SSS</code> 009<br>
 * 至少2位毫秒数<code>SS</code> 09<br>
 * 至少1位毫秒数<code>S</code> 9<br>
 *
 * <strong>时段</strong><br>
 * 星期<code>e</code> 三<br>
 * 上下午<code>a</code> 下午<br>
 *
 * @param {Date|Object|Number|String} [date] 日期
 * @returns {null|string}
 *
 * @example
 * // 默认的格式化
 * date.format('YYYY年MM月DD日 HH:mm:ss.SSS 星期e a');
 * // => "2014 年"
 * date.format('YYYY 年');
 * // => "2014 年"
 */
exports.format = function (format, date) {
    var formated = String(format || defaultFormat);
    date = parse(date);

    var Y = String(date.getFullYear());
    var M = String(date.getMonth() + 1);
    var D = String(date.getDate());
    var H = String(date.getHours());
    var h = H > 12 ? H - 12 : H;
    var a = H > 12 ? 0 : 1;
    var m = String(date.getMinutes());
    var s = String(date.getSeconds());
    var S = String(date.getMilliseconds());
    var e = String(date.getDay());
    var formater = [
        {
            k: 'YYYY',
            v: Y,
            s: 'Y'
        },
        {
            k: 'YY',
            v: Y.slice(-2),
            s: 'Y'
        },
        {
            k: 'MM',
            v: padStartWithZero(M),
            s: 'M'
        },
        {
            k: 'M',
            v: M,
            s: 'M'
        },
        {
            k: 'DD',
            v: padStartWithZero(D),
            s: 'D'
        },
        {
            k: 'D',
            v: D,
            s: 'D'
        },
        {
            k: 'HH',
            v: padStartWithZero(H),
            s: 'H'
        },
        {
            k: 'H',
            v: H,
            s: 'H'
        },
        {
            k: 'hh',
            v: padStartWithZero(h),
            s: 'h'
        },
        {
            k: 'h',
            v: h,
            s: 'h'
        },
        {
            k: 'mm',
            v: padStartWithZero(m),
            s: 'm'
        },
        {
            k: 'm',
            v: m,
            s: 'm'
        },
        {
            k: 'ss',
            v: padStartWithZero(s),
            s: 's'
        },
        {
            k: 's',
            v: s,
            s: 's'
        },
        {
            k: 'SSS',
            v: padStartWithZero(S, 3),
            s: 'S'
        },
        {
            k: 'SS',
            v: padStartWithZero(S, 2),
            s: 'S'
        },
        {
            k: 'S',
            v: S,
            s: 'S'
        },
        {
            k: 'e',
            v: weeks[e],
            s: 'e'
        },
        {
            k: 'a',
            v: a ? '上午' : '下午',
            s: 'a'
        }
    ];
    var hasFormat = {};

    // 年、月、日、时、分、秒、毫秒、星期、上下午
    // 只保证每个字段只被格式化一次，防止误操作
    array.each(formater, function (index, fmt) {
        var reg = new RegExp(fmt.k, 'mg');

        if (!hasFormat[fmt.s]) {

            if (reg.test(formated)) {
                hasFormat[fmt.s] = !0;
                formated = formated.replace(reg, fmt.v);
            }
        }
    });

    return formated;
};


/**
 * 是否为闰年
 * @param {Number} year 年份
 * @returns {boolean}
 *
 * @example
 * date.isLeapYear(2014);
 * // => false
 */
var isLeapYear = exports.isLeapYear = function (year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
};


/**
 * 获得某年某月的天数
 * @param {Number} year 年
 * @param {Number} month 月份，默认序列月，即1月为第0月
 * @returns {Number} 天数
 *
 * @example
 * // 获得10月份的天数
 * date.getDaysInMonth(2014, 9);
 * // => 31
 */
exports.getDaysInMonth = function (year, month) {
    month = new Date(year, month).getMonth();

    return month === 1 ? (isLeapYear(year) ? 29 : 28) : monthDates[month];
};


// 计算开始日期
var calStartDate = function (d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
};

// 计算结束日期
var calEndDate = function (d) {
    var tmpDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 0, 0);
    return new Date(tmpDate.getTime() - 1);
};


/**
 * 获得某年某月某日在当年的第几天
 * @param {Number} year 年份
 * @param {Number} month 默认序列月
 * @param {Number} date 日期
 * @returns {Number}
 */
exports.getDaysInYear = function (year, month, date) {
    var t1 = calStartDate(new Date(year, 0, 1));
    var t2 = calEndDate(new Date(year, month, date));
    // 超前 1 毫秒，保证同一天的两个时间不同
    var dt = t2.getTime() - t1.getTime() + 1;

    return Math.ceil(dt / DAY_TIME);
};


/**
 * 计算某年某月某日是周期内的第几周
 * @param {Number} type 1：年，2：当月
 * @param {Number} year 年
 * @param {Number} month 月
 * @param {Number} date 日
 * @param {Number} [weekStartDay=0] 一周的开始是星期几，默认为周日
 * @returns {number}
 */
var getWeeksInRange = function (type, year, month, date, weekStartDay) {
    weekStartDay = weekStartDay || 0;
    var t1;
    switch (type) {
        case 1:
            t1 = calStartDate(new Date(year, 0, 1));
            break;

        case 2:
            t1 = calStartDate(new Date(year, month, 1));
            break;
    }

    var t2 = calEndDate(new Date(year, month, date));
    // 第一周的填充
    var firstWeekPadding = t1.getDay() - weekStartDay;
    var dt = t2.getTime() - t1.getTime() + firstWeekPadding * DAY_TIME;
    return Math.ceil(dt / WEEK_TIME);
};


/**
 * 计算某年某月某日是当年的第几周
 * @param {Number} year 年
 * @param {Number} month 月
 * @param {Number} date 日
 * @param {Number} [weekStartDay=0] 一周的开始是星期几，默认为周日
 * @returns {number}
 *
 * @example
 * // 判断2014年10月24日是今年的第几周
 * date.getWeeksInYear(2014, 9, 24);
 * // => 43
 */
exports.getWeeksInYear = function (year, month, date, weekStartDay) {
    return getWeeksInRange(1, year, month, date, weekStartDay);
};


/**
 * 计算某年某月某日是当月的第几周
 * @param {Number} year 年
 * @param {Number} month 月
 * @param {Number} date 日
 * @param {Number} [weekStartDay=0] 一周的开始是星期几，默认为周日
 * @returns {number} 第一周值为 1
 *
 * @example
 * // 判断2014年10月24日是当月的第几周
 * date.getWeeksInMonth(2014, 9, 24);
 * // => 4
 */
exports.getWeeksInMonth = function (year, month, date, weekStartDay) {
    return getWeeksInRange(2, year, month, date, weekStartDay);
};


/**
 * 人性化比较时间时间
 * @param {String|Number|Date} d1 比较时间
 * @param {String|Number|Date|Object} [d2] 被比较时间，默认为当前时间
 * @returns {string}
 *
 * @example
 * // 过去时间
 * date.from(Date.now() - 1);
 * // => "刚刚"
 * date.from(Date.now() - 10*1000);
 * // => "10秒前"
 * date.from(Date.now() - 61*1000);
 * // => "1分钟前"
 * date.from(Date.now() - 60*60*1000);
 * // => "1小时前"
 * date.from(Date.now() - 24*60*60*1000);
 * // => "1天前"
 * date.from(Date.now() - 30*24*60*60*1000);
 * // => "1个月前"
 * date.from(Date.now() - 12*30*24*60*60*1000);
 * // => "1年前"
 * date.from(Date.now() - 9*12*30*24*60*60*1000);
 * // => "9年前"
 * date.from(Date.now() - 10*12*30*24*60*60*1000);
 * // => "很久之前"
 *
 * // 将来时间
 * date.from(Date.now() + 1);
 * // => "即将"
 * date.from(Date.now() + 10*1000);
 * // => "10秒后"
 * date.from(Date.now() + 61*1000);
 * // => "1分钟后"
 * date.from(Date.now() + 60*60*1000);
 * // => "1小时后"
 * date.from(Date.now() + 24*60*60*1000);
 * // => "1天后"
 * date.from(Date.now() + 30*24*60*60*1000);
 * // => "1个月后"
 * date.from(Date.now() + 12*30*24*60*60*1000);
 * // => "11个月后"
 * date.from(Date.now() + 9*12*30*24*60*60*1000);
 * // => "9年后"
 * date.from(Date.now() + 200*12*30*24*60*60*1000);
 * // => "很久之后"
 */
exports.from = function (d1, d2) {
    d1 = parse(d1);
    d2 = parse(d2);

    var d1Time = d1.getTime();

    // 小于 1970年1月1日 08:00:00
    if (d1Time <= 0) {
        return '很久之前';
    }

    var diff = d2.getTime() - d1Time;
    var inFeature = diff < 0;
    diff = inFeature ? -diff : diff;
    var seconds = Math.floor(diff / SECOND_TIME);
    var minutes = Math.floor(diff / MINUTE_TIME);
    var hours = Math.floor(diff / HOUR_TIME);
    var days = Math.floor(diff / DAY_TIME);
    var months = Math.floor(diff / MONTH_TIME);
    var years = Math.floor(diff / YEAR_TIME);
    var suffix = inFeature ? '后' : '前';

    // < 10s
    if (seconds < 10) {
        return inFeature ? '即将' : '刚刚';
    }

    // < 1m
    if (minutes < 1 && seconds > 9) {
        return seconds + '秒' + suffix;
    }

    // < 1h
    if (hours < 1 && seconds > 59) {
        return minutes + '分钟' + suffix;
    }

    // < 1D
    if (days < 1) {
        return hours + '小时' + suffix;
    }

    // < 30D
    if (days < 30) {
        return days + '天' + suffix;
    }

    // < 12M
    if (months < 12) {
        return months + '个月' + suffix;
    }

    // < 10Y
    if (years < 10) {
        return years + '年' + suffix;
    }

    return '很久之' + suffix;
};


/**
 * 输出 ISO date string
 * @param [date] {...Date} 日期
 * @returns {string}
 */
exports.iso = function (date) {
    date = parse.apply(null, arguments);

    return padStartWithZero(date.getUTCFullYear(), 4) + '-' +
        padStartWithZero(date.getUTCMonth() + 1) + '-' +
        padStartWithZero(date.getUTCDate()) + 'T' +
        padStartWithZero(date.getUTCHours()) + ':' +
        padStartWithZero(date.getUTCMinutes()) + ':' +
        padStartWithZero(date.getUTCSeconds()) + '.' +
        padStartWithZero(date.getUTCMilliseconds(), 3) + 'Z';
};


/**
 * 开始时间（当天 0:0:0:0）
 * @param {...Date} d1
 * @returns {Date}
 */
var start = exports.start = function (d1) {
    var d2 = parse.apply(null, arguments);
    return new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), 0, 0, 0, 0);
};


/**
 * 结束时间（当天 23:59:59:999）
 * @param {...Date} d1
 * @returns {Date}
 */
exports.end = function (d1) {
    var d2 = start.apply(null, arguments);
    d2.setDate(d2.getDate() + 1);
    return new Date(d2.getTime() - 1);
};