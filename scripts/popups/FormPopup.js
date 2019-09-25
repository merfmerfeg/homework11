class FormPopup extends Popup {
    //form
    //submitBtn

    _fieldList = [];

    constructor (id) {
        super(id);

        this.form = this.popupContainer.querySelector(".popup__form");
       
        //Создаем классы Field'ов
        const inputList = this.form.querySelectorAll("input");
        const pList = this.form.querySelectorAll("p");

        //Создаем список классов Field
        for (let i = 0; i < inputList.length; i++) {
            this._fieldList.push(new Field(inputList[i], pList[i]));
        }

        //Создаем класс кнопки
        this.submitBtn = new ButtonSubmit(this.form.elements.btnAdd);

        this.form.addEventListener('input', () => this.inputHandler());
    }

    inputHandler() {
        const isValidForm = this._fieldList.every(field => field.validate());

        if (!isValidForm)
            this.submitBtn.enable = false;
        else 
            this.submitBtn.enable = true;
    }

    setSubmitBtnHandler(handler) {
        this.form.addEventListener('submit', async (event) => {
            //Останавливаем выполнение кнопки
            event.preventDefault();
            this.submitBtn.isLoad = true;

            //Выполняем действие
            await handler();

            this.submitBtn.isLoad = false;
            //Закрываем окно
            this.close();
        });
    }

    setFieldValue(setValues) {
        let i = 0;
        for (let val of setValues) {
            this._fieldList[i++].inputField.value = val;
        }
    }

    close() {
        this.form.reset();
        super.close();
    }
}