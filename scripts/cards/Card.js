class Card {
    /* Можно лучше: когда много параметров, лучше обернуть их в объект, иначе легко запутаться в их последовательности */
    constructor(id, name, link, owner, likes, userId, imagePopupClass, onServerLikeCard, onServerUnlikeCard) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.isOwner = owner._id === userId;
        this.likes = likes;
        this.userId = userId;
        this.isLike = likes.some((item) => item._id === userId);

        this._imagePopupClass = imagePopupClass;
        this._onServerLikeCard = onServerLikeCard;
        this._onServerUnlikeCard = onServerUnlikeCard;

        this.create();
    }

    create() {
        const cardItem = this._createEl('div', 'place-card');
        cardItem.setAttribute('id', this.id);

        const cardImage = this._createEl('div', 'place-card__image')
        cardImage.setAttribute('style', `background-image: url(${this.link})`);

        const btnDelCard = this._createEl('button', 'place-card__delete-icon');
        if (this.isOwner) btnDelCard.setAttribute('style', 'display: block;');
        const cardDescription = this._createEl('div', 'place-card__description');

        const cardName = this._createEl('h3', 'place-card__name');
        cardName.textContent = this.name;

        const likeContainer = this._createEl('div', 'place-card__like-container');
        const btnLikeCard = this._createEl('button', 'place-card__like-icon');
        const likeCount = this._createEl('p', 'place-card__like-count');

        cardImage.appendChild(btnDelCard);
        cardItem.appendChild(cardImage);
        likeContainer.appendChild(btnLikeCard);
        likeContainer.appendChild(likeCount);

        cardDescription.appendChild(cardName);
        cardDescription.appendChild(likeContainer);
        cardItem.appendChild(cardDescription);

        //Событие на клик по карточке
        cardItem.addEventListener('click', (event) => {
            //Если Like
            if (event.target.classList.contains('place-card__like-icon')) {
                this.like();
            //Если клик на картинку
            } else if (event.target.classList.contains('place-card__image')) {
                this._imagePopupClass.open(this.link);
            }
        });

        this.cardContainer = cardItem;
        //Отрисовываем лайк, если карточка лайкнута
        if (this.isLike) this._renderLike();
        //Отрисовываем количество лайков
        this._renderLikeCount();
    }

    _renderLikeCount() {
        this.cardContainer.querySelector('.place-card__like-count')
            .textContent = this.likes.length;
    }

    _renderLike() {
        //Визуальная часть лайка
        this.cardContainer.querySelector('.place-card__like-icon')
            .classList.toggle('place-card__like-icon_liked');
    }

    _createEl(type, className) {
        const el = document.createElement(type);
        el.classList.add(className);
        return el;
    }

    async like() {
        //Лайк ставим и снимаем мгновенно
        this._renderLike();

        try {
            if (this.isLike) {
                //Если карточка уже лайкнута, снимаем лайк
                this.isLike = false;
                //Ждем ответа сервера и отрисовываем новое количество лайков
                const reqResult = await this._onServerUnlikeCard(this.id);
                this.likes = reqResult.likes;
                //Обновление числа лайков
                this._renderLikeCount();
            } else {
                //Если карточка еще не лайкнута, ставим лайк
                this.isLike = true;
                //Ждем ответа сервера и отрисовываем новое количество лайков
                const reqResult = await this._onServerLikeCard(this.id);
                this.likes = reqResult.likes;
                //Обновление числа лайков
                this._renderLikeCount();
            }
        } catch (error) {
            //Возвращаем состояние лайка обратно
            this._renderLike();
            //Сообщаем об ошибке в консоль
            console.log(`Ошибка при попытке установить/снять лайк: ${error}`)
        }

    }
}