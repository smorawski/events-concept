const { registerEvent, emitEvent } = require('./event-emitter');

const events = [
   function (callback, ...args) {
        console.log('1');
        return callback(...args);
    },
    function (...args) {
        console.log('I am 2 and I am not returning callback!');
    },
    function (callback, ...args) {
        console.log('3');
        return callback(...args);
        // return console.log('Enough!');
    },
    function (callback, ...args) {
        console.log('4');
        return callback(...args);
    }
];

events.forEach((handler) => registerEvent('test', handler))

const callback = emitEvent('test', console.log);

callback('Just passing through');