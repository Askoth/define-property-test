import Store from '../js/store.js'

describe('Testing Store', () => {
    test('createObservers: create an object, change value and count', () => {

        let stateChangedCount = 0;

        const mockedInstance = {
            _stateChanged() {
                stateChangedCount++;
            }
        };

        let obj = Store.createObservers({
            test: true,
        }, mockedInstance);

        obj.test = false;

        expect(stateChangedCount).toBe(1);
    })

    test('watch adds callback and test Set', () => {

        const  store = new Store({
            test: true,
        });

        const cb = function () {
        };

        store.watch(cb);
        store.watch(cb);

        expect(store.callbacks.size).toBe(1);
    })

    test('watch triggers each callback only once', () => {

        let stateChangedCount = 0;

        const  store = new Store({
            test: true,
        });

        const cb = function () {
            stateChangedCount++;
        };

        store.watch(cb);

        store.data.test = false;

        expect(stateChangedCount).toBe(1);
        expect(store.data.test).toBe(false);
    })
})
