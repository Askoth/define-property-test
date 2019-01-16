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
           },
         })
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

        expect(filtered).toEqual([{"comment": "testing one two three four five six", "rating": 1}]);
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

        expect(filtered).toEqual([
            {
                "comment": "testing one two three",
                "rating": 1
            },
            {
                "comment": "testing one two three four five six",
                "rating": 1,
            }
        ]);
    })

    test('test preparation of data to template', () => {
        const mockedItem = {
            "comment": "belle offre de services",
            "computed_browser": {
                "Browser": "Chrome",
                "Version": "32.0",
                "Platform": "MacOSX",
                "FullBrowser": "Chrome"
            },
            "rating": 5,
        };

        const data = Table.prototype.prepareDataForTemplate(mockedItem);
        expect(data).toEqual({
            browser: 'Chrome',
            comment: 'belle offre de services',
            device: 'Desktop',
            platform: 'MacOSX',
            rating: 5,
            version: '32.0',
        });
    })
});



function getMockedItems () {
    return [
        {
            rating: 1,
            comment: 'testing one two three',
        },
        {
            rating: 2,
            comment: 'testing one two three four',
        },
        {
            rating: 1,
            comment: 'testing one two three four five six',
        }
    ];
}
