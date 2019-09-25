class ButtonSubmit {
    _enableFlag = false;
    _loadFlag = false;
    _textButton = undefined;

    constructor (button) {
        this.buttonContainer = button;
        this._textButton = this.buttonContainer.textContent;
    }


    get isLoad() {
        return this._loadFlag;
    }
    set isLoad(value) {
        if (value) {
            this.buttonContainer.textContent = "Загрузка...";
            this.buttonContainer.setAttribute('style', `font-size: 18px; line-height: 22px;`);
        } else {
            this.buttonContainer.textContent = this._textButton;
            this.buttonContainer.removeAttribute('style');
        }
    }

    get enable() {
        return this._enableFlag;
    }
    set enable(value) {
        if (value) {
            this.buttonContainer.removeAttribute('disabled');
            this.buttonContainer.classList.remove('popup__button_disable');
        } else {
            this.buttonContainer.setAttribute('disabled', true);
            this.buttonContainer.classList.add('popup__button_disable');
        }
        this._enableFlag = value;
    }
}