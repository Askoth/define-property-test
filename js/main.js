import Store from './store.js';
import Table from './table.js';
import Modal from './modal.js';
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

    const modal = new Modal({
        el: '.js-modal__wrapper'
    })

    const store = new Store({
        reports,
        scores: getScoreValues(checkBoxes),
        text: inputText.value,
        imageToModal: '',
    });

    table.render(store.data);

    store.watch(['reports', 'scores', 'text'], (data) => {
        table.render(data);
    })

    store.watch(['imageToModal'], (data) => {
        modal.render(data);
    })

    delegate(table.el, 'click', 'report-image-icon', ({ target }) => {
        store.data.imageToModal = target.getAttribute('data-image');
    })

    // simple implementation for a non interactable modal
    document.querySelector('.js-modal__wrapper').addEventListener('click', () => {
        store.data.imageToModal = '';
    })

    bindInputs({
        checkBoxes,
        inputText,
        store,
    });
}).catch((err) => {
    throw err;
});

function delegate(el, evt, className, callback) {
    el.addEventListener(evt, (e) => {
        const delegatedEl = closest({ el: e.target, className });

        if (delegatedEl != null) {
            callback({target: delegatedEl})
        }

    })
}

function closest ({ el, className }) {
    if (typeof el != 'object' || typeof el.classList == 'undefined') {
        return null
    }

    if (el.classList.contains(className)) {
        return el
    } else {
        return closest({el: el.parentNode, className })
    }
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
