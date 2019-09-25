class CardList {

    /* Можно лучше: когда много параметров, лучше обернуть их в объект, иначе легко запутаться в их последовательности */
    constructor(selector, initialCardList, userId, imagePopupClass, 
                onServerDeleteCard, onServerLikeCard, onServerUnlikeCard) {

        this.cardListContainer = document.querySelector(selector);
        this._imagePopupClass = imagePopupClass;
        this._userId = userId;

        this._onServerDeleteCard = onServerDeleteCard;
        this._onServerLikeCard = onServerLikeCard;
        this._onServerUnlikeCard = onServerUnlikeCard;
        
        this.render(initialCardList);

        this.cardListContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('place-card__delete-icon')) {
                this.removeCard(event.target.parentNode.parentNode);
            }
        })
    }

    addCard(card) {
        this.cardListContainer.appendChild(card.cardContainer);
    }

    removeCard(card) {
        try {
            if (window.confirm("Вы действительно хотите удалить эту карточку?")) { 
                this._onServerDeleteCard(card.getAttribute("id"));
                this.cardListContainer.removeChild(card);
            }
        } catch (error) {
            console.log(`Ошибка при попытке удаления карточки ${error}`);
        }
    }

    render(initialCardList) {
        initialCardList.forEach(item => {
            this.addCard(new Card(item._id, item.name, item.link, item.owner, item.likes, 
                                  this._userId, this._imagePopupClass, this._onServerLikeCard, this._onServerUnlikeCard));
        });
    }

    
}