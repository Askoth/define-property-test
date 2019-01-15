class Store {
    constructor (data) {

        this.data = createObservers(data, this)

        this.callbacks = new Set();
    }

    watch(cb) {
        this.callbacks.add(cb);
    }

    stateChanged() {
        const data = this.removeObservers(this.data);
        this.callbacks.forEach(cb => cb(data))
    }

    removeObservers() {
        return JSON.parse(JSON.stringify(this.data))
    }
}

function createObservers(data, instance) {
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
                instance.stateChanged()
            }
        });
    })

    return obj
}

export default Store
