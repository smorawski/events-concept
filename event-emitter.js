const { EventEmitter } = require('events');

const emitter = new EventEmitter();
module.exports = {
    registerEvent: (eventName, handler) => {
        emitter.on(eventName, handler);
    },
    emitEvent: (eventName, callback) =>
        emitter
            .listeners(eventName)
            .reduce((finalCallback, callback) => (...args) => callback(finalCallback, ...args), callback),
}
