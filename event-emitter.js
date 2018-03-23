const { EventEmitter } = require('events');

const emitter = new EventEmitter();

function getArgs(func) {
    // First match everything inside the function argument parens.
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

    // Split the arguments string into an array comma delimited.
    return args
        .split(',')
        .map(function(arg) {
            // Ensure no inline comments are parsed and trim the whitespace.
            return arg.replace(/\/\*.*\*\//, '').trim();
        })
        .filter(function(arg) {
            // Ensure no undefined values are added.
            return arg;
        });
}

function hasFunctionArgument(func, argumentName) {
    return getArgs(func).indexOf(argumentName) >= 0;
}

module.exports = {
    registerEvent: (eventName, handler) => {
        emitter.on(eventName, handler);
    },
    emitEvent: (eventName, callback) =>
        emitter
            .listeners(eventName)
            .reduce((finalCallback, currentHandler) => {
                // is first argument called "callback?"
                if (!hasFunctionArgument(currentHandler, 'callback')) {
                    return (...args) => {
                        currentHandler(...args);
                        // manually run callback
                        return finalCallback(...args);
                    };
                }
                return (...args) => currentHandler(finalCallback, ...args);
            }, callback)
    }
