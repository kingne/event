class Util {
    static checkisRightName(eventName) {
        if (typeof eventName !== 'string') throw new Error('not support eventName');
    }
    
    static checkisRightListener(listener) {
        if (typeof listener !== 'function') throw new Error('listener must be a function');
    }
    
    static checkhasEvent(events, eventName) {
        const eventArr = events[eventName];
        if (!eventArr) return false;
        else return true; 
    }
}

module.exports = Util;