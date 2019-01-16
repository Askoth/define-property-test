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

export { getScoreValues };
export { bindInputs };
