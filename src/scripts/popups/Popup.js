class Popup {
    //popupContainer
    constructor (id) {
        this.popupContainer = document.getElementById(id);

        //Событие на закрытие popup
        this.popupContainer.querySelector(".popup__close")
            .addEventListener('click', () => this.close());
    }
    
    //Открыть
    open() {
        this.popupContainer.classList.add('popup_is-opened');
    }

    //Закрыть
    close() {
        this.popupContainer.classList.remove('popup_is-opened');
    }
}

