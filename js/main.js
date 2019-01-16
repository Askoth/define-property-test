import Store from './store.js';
import Table from './table.js';
import { getScoreValues, bindInputs } from './dom-utils.js';
import ajax from './ajax.js';

ajax.fetchJson({
    url: 'https://static.usabilla.com/recruitment/apidemo.json',
    page: 1
}).then(function (reports) {
    const checkBoxes = document.querySelectorAll('.js-score__checkbox');
    const inputText = document.querySelector('.js-search-text__input');

    const table = new Table({
        el: '.js-report-table'
    });

    const store = new Store({
        reports,
        scores: getScoreValues(checkBoxes),
        text: inputText.value,
    });

    table.render(store.data);

    store.watch((data) => {
        table.render(data);
    })

    bindInputs({
        checkBoxes,
        inputText,
        store
    });
}).catch((err) => {
    throw new Error(err);
});
