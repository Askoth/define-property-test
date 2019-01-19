import View from './view.js'

class Modal extends View {
    constructor ({el}) {
        super();

        this.el = document.querySelector(el);

        this.templates = {
            modal: document.querySelector('#modal').innerHTML,
        }
    }

    render({ imageToModal }) {
        let html = '';
        if (imageToModal.length) {
            html = this.populateTemplate(this.templates.modal, {image: imageToModal});
        }

        this.el.innerHTML = html;
    }
}

export default Modal
