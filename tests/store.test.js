import Store from '../js/store.js'

jest.useFakeTimers();

describe('Testing Store', () => {
    test('createObservers: create an object, change value and count', () => {

        let stateChangedCount = 0;

        const mockedInstance = {
            _logChangedStateKey() {
                stateChangedCount++;
            }
        };

        let obj = Store.createObservers({
            test: true,
        }, mockedInstance);

        obj.test = false;

        expect(stateChangedCount).toBe(1);
    })

    test('watch triggers each callback only once', () => {

        let stateChangedCount = 0;

        const  store = new Store({
            test: true,
        });

        const cb = function () {
            stateChangedCount++;
        };

        store.watch(['test'], cb);

        store.data.test = false;

        // store event loop
        jest.advanceTimersByTime(200);

        expect(stateChangedCount).toBe(1);
        expect(store.data.test).toBe(false);
    })

    test(`watch doesn't trigger cb when prop doesn't match`, () => {

        let stateChangedCount = 0;

        const  store = new Store({
            test: true,
            test2: true,
        });

        const cb = function () {
            stateChangedCount++;
        };

        store.watch(['test'], cb);

        store.data.test2 = false;

        // store event loop
        jest.advanceTimersByTime(200);

        expect(stateChangedCount).toBe(0);
        expect(store.data.test).toBe(true);
    })

    test(`executeCallbacksFunction key "prop" has not changed`, () => {
        let stateChangedCount = 0;
        const mockedObj = {
            _changeKeys: [],
            callbacks: {
                prop: {
                    id: function () {
                        stateChangedCount++;
                    }
                }
            }
        };

        Store.prototype._execCallbacks.apply(mockedObj, [])
        expect(stateChangedCount).toBe(0);
    })

    test(`executeCallbacksFunction key "prop" has changed`, () => {
        let stateChangedCount = 0;
        let removeObserversData;
        const data = { prop: 1 };

        const mockedObj = {
            data,
            _changeKeys: ['prop'],
            callbacks: {
                prop: {
                    id: function () {
                        stateChangedCount++;
                    }
                }
            },
            _removeObservers (data) {
                removeObserversData = data;
                return data
            }
        };

        Store.prototype._execCallbacks.apply(mockedObj, [])
        expect(stateChangedCount).toBe(1);
        expect(removeObserversData).toEqual(data);
    })

    test(`executeCallbacksFunction key "prop" has changed but no watcher`, () => {
        let stateChangedCount = 0;
        let removeObserversData;
        const data = { prop: 1 };

        const mockedObj = {
            data,
            _changeKeys: ['prop'],
            callbacks: {
                prop2: {
                    id: function () {
                        stateChangedCount++;
                    }
                }
            },
            _removeObservers (data) {
                removeObserversData = data;
                return data
            }
        };

        Store.prototype._execCallbacks.apply(mockedObj, [])
        expect(stateChangedCount).toBe(0);
        expect(removeObserversData).toEqual(data);
    })

    test(`executeCallbacksFunction _changeKeys should be cleaned before executing callbacks`, () => {
        // avoids issue when event loop will keep trying to render because is never empty
        const data = { prop: 1 };

        const mockedObj = {
            data,
            _changeKeys: ['prop'],
            callbacks: {
                prop: {
                    id: function () {
                        throw new Error();
                    }
                }
            },
            _removeObservers (data) {
                return data
            }
        };

        const errorCode = function(){
            Store.prototype._execCallbacks.apply(mockedObj, [])
        };

        expect(errorCode).toThrow();
        expect(mockedObj._changeKeys).toEqual([]);
    })
})
