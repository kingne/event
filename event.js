'use strict';
const Util = require('./util')

class EventEmitter {
    #maxEventListenerCount;
    #events;
    #count;
    constructor(opt={}) {
        this.maxEventListenerCount = opt.maxEventListener || 10;
        this.#events = opt.events || {};
        this.count = Object.keys(this.#events).length;
    }
    init(opt={}) {
        this.maxEventListenerCount = opt.maxEventListener || 10;
        this.#events = opt.events || {};
        this.count = Object.keys(this.#events);
    }

    addEventListener(eventName, listener) {
        Util.checkisRightName(eventName);
        Util.checkisRightListener(listener);
        if (Util.checkhasEvent(this.#events, eventName)) {
            const eventStore = this.#events[eventName];
            eventStore.addEventListener(listener);
        } else {
            if (this.#maxEventListenerCount > this.#count) return;
            this.#events[eventName] = new EventStore(eventName, listener);
            this.#count++;
        }
    }

    removeEventListener(eventName, listener) {
        Util.checkisRightName(eventName);
        Util.checkisRightListener(listener);
        if (Util.checkhasEvent(this.#events, eventName)) {
            const eventStore = this.#events[eventName];
            eventStore.removeEventListener(listener);
        }
    }

    removeAllEventListener() {
        this.#events = {};
    }

    emit(eventName) {
        Util.checkisRightName(eventName);
        if (Util.checkhasEvent(this.#events, eventName)) {
            const eventStore = this.#events[eventName];
            eventStore.emit();
        }
    }
}



class EventStore {
    #eventName;
    #eventArr;
    constructor(eventName, listener) {
        this.#eventName = eventName;
        this.#eventArr = [listener];
    }

    emit() {
        this.#eventArr.forEach(fn => {
            fn();
        })
    }

    removeEventListener(listener) {
        if (Util.checkhasEvent(this.#eventArr, this.#eventName)) {
            const index = this.#eventArr.indexOf(listener);
            this.#eventArr.splice(index, 1);
        }
    }

    addEventListener(listener) {
        if (!Util.checkhasEvent(this.#eventArr, this.#eventName)) {
            this.#eventArr.push(listener);
        }
    }
}

module.exports = EventEmitter;