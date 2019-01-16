class Store {
    constructor (data) {

        this.data = Store.createObservers(data, this)

        this.callbacks = new Set();
    }

    watch(cb) {
        this.callbacks.add(cb);
    }

    _stateChanged() {
        const data = this._removeObservers(this.data);
        this.callbacks.forEach(cb => cb(data))
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
                value = newValue;
                instance._stateChanged()
            }
        });
    })

    return obj
}

export default Store
