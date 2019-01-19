class Store {
    constructor (data) {

        this.data = Store.createObservers(data, this)
        this._changeKeys = [];
        this._eventLoop = setInterval(() => {
            this._execCallbacks();
        }, 10)

        this.callbacks = new Set();
    }

    watch(props, cb) {
        const unsubscribeId = +(new Date());

        props.forEach((prop) => {
            this.callbacks[prop] = this.callbacks[prop] || {};

            this.callbacks[prop][unsubscribeId] = cb;
        })

        return unsubscribeId;
    }

    _logChangedStateKey(key) {
        this._changeKeys.push(key);
    }

    _execCallbacks() {

        if (this._changeKeys.length < 1) {
            return;
        }

        const changedKeys = [...this._changeKeys];
        this._changeKeys.length = 0;

        const data = this._removeObservers(this.data);
        const callbacksToExecute = new Set();

        changedKeys.forEach((key) => {
            if (!this.callbacks[key]) {
                // no callback assigned to this key change
                return;
            }

            Object.keys(this.callbacks[key]).forEach((id) => {
                const cb = this.callbacks[key][id];
                callbacksToExecute.add(cb);
            })
        })

        // Set guarantees a callback function will execute only once
        // even if it depends on more than one prop
        callbacksToExecute.forEach((cb) => {
            cb(data);
        })
    }

    _removeObservers() {
        return JSON.parse(JSON.stringify(this.data))
    }
}

Store.createObservers = function (data, instance) {
    let obj = {};

    Object.keys(data).forEach((key) => {
        let value = data[key];
        Object.defineProperty(obj, key, {
            enumerable: true,
            get() {
                return value;
            },
            set(newValue) {
                instance._logChangedStateKey(key);
                value = newValue;
            }
        });
    })

    return obj
}

export default Store
