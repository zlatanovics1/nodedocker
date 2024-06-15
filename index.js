const EventEmitter = require("events");

class ExtendedEventEmitter extends EventEmitter {
  constructor() {
    super();
  }

  emitWithTimestamp(eventName, ...args) {
    const timestamp = new Date().toISOString();
    this.emit(eventName, ...args, timestamp);
  }

  onceWithTimeout(eventName, listener, timeout) {
    const wrapper = (...args) => {
      clearTimeout(timer);
      listener.apply(this, args);
    };

    const timer = setTimeout(() => {
      this.removeListener(eventName, wrapper);
    }, timeout);

    this.once(eventName, wrapper);
  }
}

module.exports = ExtendedEventEmitter;
