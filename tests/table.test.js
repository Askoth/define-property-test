import Table from '../js/table.js'

describe('Testing Table view', () => {
    test('create instance', () => {
        document.querySelector = (sel) => {
            return {
                innerHTML: `${sel}`
            }
        }

        const obj = new Table({
            el: '#test'
        })

        expect(obj).toEqual({
           el: {
             innerHTML: '#test',
           },
           templates: {
             content: '#table-with-content',
             noContent: '#table-no-content',
             reportLabel: '#report-label',
           },
         })
    })

    test('test preparation of data to template', () => {
        const mockedItems = [{
            "comment": "belle offre de services",
            "computed_browser": {
                "Browser": "Chrome",
                "Version": "32.0",
                "Platform": "MacOSX",
                "FullBrowser": "Chrome"
            },
            "rating": 5,
            "labels": ["bug"],
        }];

        let data = Table.prototype.prepareDataForTemplate(mockedItems);

        const toEqualArr = [{
            browser: 'Chrome',
            comment: 'belle offre de services',
            device: 'Desktop',
            labels: ['bug'],
            platform: 'MacOSX',
            rating: 5,
            version: '32.0',
        }];

        // jest fails to find keys that are undefined
        data[0] = Object.keys(data[0]).reduce((prev, key) => {
            const value = data[0][key];

            prev[key] = typeof value !== 'undefined' ? value : 'undefined';

            return prev;
        }, {})

        expect(data).toEqual(toEqualArr);

    })

    test('filter data score and text', () => {
        const mockedFilters = {
            scores: {
                1: true,
                2: false,
            },
            text: 'four'
        };

        const filtered = Table.prototype.filterItems.apply(null, [{
            filters: mockedFilters,
            items: getMockedItems(),
        }]);

        expect(filtered).toEqual([{"browser": "Firefox", "comment": "testing one two three four five six", "device": "Desktop", "labels": ["bug", "marc"], "platform": "MacOSX", "rating": 1, "version": "28.0"}]);
    })

    test('filter data score but text is empty', () => {
        const mockedFilters = {
            scores: {
                1: true,
                2: false,
            },
            text: ''
        };

        const filtered = Table.prototype.filterItems.apply(null, [{
            filters: mockedFilters,
            items: getMockedItems(),
        }]);

        expect(filtered).toEqual([{"browser": "Chrome", "comment": "testing one two three", "device": "Desktop", "labels": ["bug"], "platform": "MacOSX", "rating": 1, "version": "32.0"}, {"browser": "Firefox", "comment": "testing one two three four five six", "device": "Desktop", "labels": ["bug", "marc"], "platform": "MacOSX", "rating": 1, "version": "28.0"}]);
    })

    test('filter data text on browser', () => {
        const mockedFilters = {
            scores: {
                1: true,
                2: true,
            },
            text: 'Chrome'
        };

        const filtered = Table.prototype.filterItems.apply(null, [{
            filters: mockedFilters,
            items: getMockedItems(),
        }]);

        expect(filtered).toEqual([{"browser": "Chrome", "comment": "testing one two three", "device": "Desktop", "labels": ["bug"], "platform": "MacOSX", "rating": 1, "version": "32.0"}]);
    })

    test('filter data text on version', () => {
        const mockedFilters = {
            scores: {
                1: true,
                2: true,
            },
            text: '7.0'
        };

        const filtered = Table.prototype.filterItems.apply(null, [{
            filters: mockedFilters,
            items: getMockedItems(),
        }]);

        expect(filtered).toEqual([{"browser": "Safari", "comment": "testing one two three four", "device": "Mobile", "labels": ["compliment"], "platform": "iOS", "rating": 2, "version": "7.0"}]);
    })

    test('filter data text on platform', () => {
        const mockedFilters = {
            scores: {
                1: true,
                2: true,
            },
            text: 'iOS'
        };

        const filtered = Table.prototype.filterItems.apply(null, [{
            filters: mockedFilters,
            items: getMockedItems(),
        }]);

        expect(filtered).toEqual([{"browser": "Safari", "comment": "testing one two three four", "device": "Mobile", "labels": ["compliment"], "platform": "iOS", "rating": 2, "version": "7.0"}]);
    })

    test('filter data text on device', () => {
        const mockedFilters = {
            scores: {
                1: true,
                2: true,
            },
            text: 'Mobile'
        };

        const filtered = Table.prototype.filterItems.apply(null, [{
            filters: mockedFilters,
            items: getMockedItems(),
        }]);

        expect(filtered).toEqual([{"browser": "Safari", "comment": "testing one two three four", "device": "Mobile", "labels": ["compliment"], "platform": "iOS", "rating": 2, "version": "7.0"}]);
    })

    test('filter data text on labels', () => {
        const mockedFilters = {
            scores: {
                1: true,
                2: true,
            },
            text: 'marc'
        };

        const filtered = Table.prototype.filterItems.apply(null, [{
            filters: mockedFilters,
            items: getMockedItems(),
        }]);

        expect(filtered).toEqual([{"browser": "Firefox", "comment": "testing one two three four five six", "device": "Desktop", "labels": ["bug", "marc"], "platform": "MacOSX", "rating": 1, "version": "28.0"}]);
    })
});



function getMockedItems () {
    return Table.prototype.prepareDataForTemplate([
        {
            rating: 1,
            comment: 'testing one two three',
            computed_browser: {
                Browser: 'Chrome',
                Version: '32.0',
                Platform: 'MacOSX',
                FullBrowser: 'Chrome'
            },
            labels: ['bug'],
        },
        {
            rating: 2,
            comment: 'testing one two three four',
            computed_browser: {
                Browser: 'Safari',
                Version: '7.0',
                Platform: 'iOS',
                FullBrowser: 'Safari'
            },
            labels: ['compliment'],
        },
        {
            rating: 1,
            comment: 'testing one two three four five six',
            computed_browser: {
                Browser: 'Firefox',
                Version: '28.0',
                Platform: 'MacOSX',
                FullBrowser: 'Firefox'
            },
            labels: ['bug', 'marc'],
        }
    ]);
}
