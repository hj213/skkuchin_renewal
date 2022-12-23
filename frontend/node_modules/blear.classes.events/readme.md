# blear.classes.events 事件的监听与派发类

[![npm module][npm-img]][npm-url]
[![build status][travis-img]][travis-url]
[![coverage][coveralls-img]][coveralls-url]

[travis-img]: https://img.shields.io/travis/blearjs/blear.classes.events/master.svg?maxAge=2592000&style=flat-square
[travis-url]: https://travis-ci.org/blearjs/blear.classes.events

[npm-img]: https://img.shields.io/npm/v/blear.classes.events.svg?maxAge=2592000&style=flat-square
[npm-url]: https://www.npmjs.com/package/blear.classes.events

[coveralls-img]: https://img.shields.io/coveralls/blearjs/blear.classes.events/master.svg?maxAge=2592000&style=flat-square
[coveralls-url]: https://coveralls.io/github/blearjs/blear.classes.events?branch=master


## `#emit(eventName, [arg, ...])`
发送事件。多个事件名，使用空格分开。如果接收事件有返回 false，则返回值为 false。
```
var events = new Events();

var preventDefault = events.emit('myEvent', 1, 2, 3) === false;
```

## `#on(eventName, function)`
监听事件。多个事件名，使用空格分开。

```
events.on('myEvents', function (a, b, c) {
    // a === 1
    // b === 2
    // c === 3
    
    return false;
});
```


## `#un([eventName], [function])`
取消事件监听。如果 function 为空，则取消所有该事件监听。如果都为空，则取消所有事件。
```
events.un('myEvent', fn1);
events.un('myEvent');
events.un();
```



## `#once(eventName, function)`
只监听一次。

```
events.once('myEvent', fn1);
```
