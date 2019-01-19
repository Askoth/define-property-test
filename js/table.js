import View from './view.js'

class Table extends View {
    constructor ({el}) {
        super();

        this.el = document.querySelector(el);

        this.templates = {
            content: document.querySelector('#table-with-content').innerHTML,
            noContent: document.querySelector('#table-no-content').innerHTML,
            reportLabel: document.querySelector('#report-label').innerHTML,
        }
    }

    render({ text, reports, scores }) {

        let filteredItems = this.filterItems({
            filters: {
                text,
                scores,
            },
            items: this.prepareDataForTemplate(reports.items)
        });

        let result = '';

        if (filteredItems.length) {
            const rows = filteredItems.map((dataToRender) => {

                // add sub template
                dataToRender.reportLabels = dataToRender.labels.reduce((prev, label) => {
                    prev += this.populateTemplate(this.templates.reportLabel, {label});
                    return prev;
                }, '')

                const row = this.populateTemplate(this.templates.content, dataToRender);

                return row
            })

            result = rows.join('');
        } else {
            result = this.templates.noContent;
        }

        this.el.querySelector('tbody').innerHTML = result;
    }

    prepareDataForTemplate (items) {
        return items.map((item, i) => {
            const { rating, comment, labels, images, computed_browser } = item;
            const { Browser: browser, Platform: platform, Version: version } = computed_browser;
            const device = ['Android', 'iOS'].indexOf(platform) != -1 ? 'Mobile' : 'Desktop';

            const image = this.selectImage(images);

            return {
                rating,
                comment,
                browser,
                image,
                labels,
                version,
                device,
                platform,
                i,
            };
        })
    }

    filterItems({ filters, items }) {

        let filteredItems = items.filter((item) => filters.scores[item.rating]);
        const text = filters.text.trim();

        if (text.length) {
            filteredItems = filteredItems.filter((item) => {
                const isLabelMatch = item.labels.some((label) => label.indexOf(filters.text) != -1);

                return isLabelMatch ||
                    item.comment.indexOf(filters.text) != -1 ||
                    item.browser.indexOf(filters.text) != -1 ||
                    item.version.indexOf(filters.text) != -1 ||
                    item.device.indexOf(filters.text) != -1 ||
                    item.platform.indexOf(filters.text) != -1
            });
        }

        return filteredItems;
    }

    selectImage(images) {
        return images.cropped.url
    }
}



export default Table
