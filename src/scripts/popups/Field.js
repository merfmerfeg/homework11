class Field {
    constructor(inputField, pErrText) {
        this.inputField = inputField;
        this.pErrText = pErrText;
        this.type = (inputField.name === "link") ? "link" : "text";
    }

    validate() {
        const ERROR_REQ_FIELD = "Это обязательное поле";
        const ERROR_COUNT_SYMBOL = "Должно быть от 2 до 30 символов";
        const ERROR_LINK = "Здесь должна быть ссылка";

        let isValid = true;
        
        //Проверка ошибок валидации
        //Если обычное поле
        if (this.type === "text") {
            if (this.inputField.value.length === 0) {
                this.pErrText.textContent = ERROR_REQ_FIELD;
                isValid = false;
            }
            else if (this.inputField.value.length === 1 || this.inputField.value.length > 30) {
                this.pErrText.textContent = ERROR_COUNT_SYMBOL;
                isValid = false;
            }
            else {
                this.pErrText.textContent = "";
            }
        //Если ссылка
        } else {
            if (this.inputField.value.length === 0) {
                this.pErrText.textContent = ERROR_REQ_FIELD;
                isValid = false;
            } else if (!this.validateLink(this.inputField.value)) {
                this.pErrText.textContent = ERROR_LINK;
                isValid = false;
            } else {
                this.pErrText.textContent = "";
            }
        }

        return isValid;
    }

    //Честно взято со stackoverflow.com
    validateLink(str) {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }
}