const { registerEvent, emitEvent } = require('./event-emitter');

const events = [
    (callback, ...args) => {
        console.log('1');
        return callback(...args);
    },
    (callback, ...args) => {
        console.log('2');
        return callback(...args);
        // return console.log('Enough!');
    },
    (callback, ...args) => {
        console.log('3');
        return callback(...args);
    }
];

events.forEach((handler) => registerEvent('test', handler))

const callback = emitEvent('test', console.log);

callback('Just passing through');