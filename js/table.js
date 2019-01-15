class Table {
    constructor ({el}) {
        this.el = document.querySelector(el);

        this.templates = {
            content: document.querySelector('#table-with-content').innerHTML,
            noContent: document.querySelector('#table-no-content').innerHTML,
        }
    }

    render({ text, reports, scores }) {

        let filteredItems = this.filterItems({
            filters: {
                text,
                scores,
            },
            items: reports.items
        });

        let result = '';

        if (filteredItems.length) {
            const rows = filteredItems.map((item) => {
                const { rating, comment, computed_browser } = item;
                const { Browser: browser, Platform: platform, Version: version } = computed_browser;

                const dataToRender = {
                    rating,
                    comment,
                    browser,
                    version,
                    device: 'nao sei',
                    platform,
                };

                const row = this.templates.content.replace(/{{(.*?)}}/g, (match, match2) => {
                    return dataToRender[match2.trim()]
                });

                return row
            })

            result = rows.join('');
        } else {
            result = this.templates.noContent;
        }

        this.el.querySelector('tbody').innerHTML = result;
    }

    filterItems({ filters, items }) {

        let filteredItems = items.filter((item) => filters.scores[item.rating]);
        const text = filters.text.trim();

        if (text.length) {
            filteredItems = filteredItems.filter((item) => item.comment.indexOf(filters.text) != -1);
        }

        return filteredItems;
    }
}



export default Table
