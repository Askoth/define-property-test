import Store from './store.js';
import Table from './table.js';

fetch('https://static.usabilla.com/recruitment/apidemo.json', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
}).then((response) => {
    return response.json();
}).then(function(myJson) {
    init(myJson);
}).catch((err) => {
    throw new Error(err);
});

function init (reports) {
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
}

function getScoreValues(checkBoxes) {
    return Array.from(checkBoxes).reduce((prev, el) => {
        prev[el.value] = el.checked;

        return prev
    }, {});
}

function bindInputs ({ checkBoxes, inputText, store }) {
    Array.from(checkBoxes).forEach((el) => {
        el.addEventListener('change', (e) => {
            let scores = store.data.scores;

            scores[e.target.value] = e.target.checked;

            // forces defineProperty set
            store.data.scores = scores;
        })
    });


    inputText.addEventListener('keyup', (e) => {
        let text = store.data.text;

        if (text != e.target.value) {
            store.data.text = e.target.value;
        };
    })

}
