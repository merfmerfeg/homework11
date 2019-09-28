import Api from "../src/Api";
import ImagePopup from "./blocks/popup/ImagePopup.js";
import FormPopup from "./blocks/popup/FormPopup.js";
import Card from "./blocks/place-card/Card.js";
import UserInfo from "./blocks/user-info/UserInfo.js";
import CardList from "./blocks/places-list/CardList.js";

import "./index.css";

//const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/' : 'https://praktikum.tk/';
//const serverUrl = "http://95.216.175.5"

//=====Глобальные переменные====
loadAsync();

async function loadAsync() {
    const api = new Api("74c4de3e-5cbb-41c8-a92e-94c773d7de81", "2", serverUrl);
    const imagePopup = new ImagePopup("popup-image");
    const popupAddCard = new FormPopup("popup-edit-card");
    const popupEditProfile = new FormPopup("popup-edit-profile");
    const popupEditAvatar = new FormPopup("popup-edit-avatar");

    const userInfo = await loadUserData();
    const cardList = await loadCardListData();

    //======События=======
    //Событие на нажание edit
    document.querySelector(".user-info__edit-button").addEventListener("click", () => {
        popupEditProfile.setFieldValue([userInfo.userName, userInfo.userJob]);
        popupEditProfile.open();
    });
    //Событие на нажатие "+"
    document.querySelector(".user-info__button").addEventListener("click", () => {
        popupAddCard.open();
    });
    //Событие нажатие на аватар
    document.querySelector(".user-info__photo").addEventListener("click", () => {
        popupEditAvatar.open();
    });

    //Добавляем событие для попапа добавить карточку на кнопку Submit
    popupAddCard.setSubmitBtnHandler(async () => {
        //Добавляем карточку
        try {
            const addResult = await api.addNewCard(popupAddCard.form.elements.fullName.value, popupAddCard.form.elements.link.value);

            cardList.addCard(new Card(addResult._id, addResult.name, addResult.link, addResult.owner, addResult.likes, userInfo.userId, 
                                    imagePopup, (id) => api.likeCard(id), (id) => api.unLikeCard(id)));
        } catch (error) {
            console.log(`Ошибка добавления карточки: ${error}`);
        }
    });

    //Добавляем событие для попапа редактировать профиль на кнопку +
    popupEditProfile.setSubmitBtnHandler(async () => {
        //Изменяем данные пользователя
        try {
            await api.setUserData(popupEditProfile.form.elements.fullName.value, 
            popupEditProfile.form.elements.aboutOneself.value);

            userInfo.userName = popupEditProfile.form.elements.fullName.value; 
            userInfo.userJob = popupEditProfile.form.elements.aboutOneself.value;
        } catch (error) {
            console.log(`Ошибка изменения данных пользователя: ${error}`);
        }
    });

    //Добавляем событие для попапа редактировать аватар на кнопку Submit
    popupEditAvatar.setSubmitBtnHandler(async () => {
        //Изменяем данные пользователя
        try {
            await api.setAvatarUser(popupEditAvatar.form.elements.link.value);

            userInfo.userPhotoLink = popupEditAvatar.form.elements.link.value;
        } catch (error) {
            console.log(`Ошибка изменения аватара пользователя: ${error}`);
        }
    });

    async function loadUserData() {
        try {
            const userData = await api.getUserData();    
            return new UserInfo(userData._id, userData.name, userData.about, userData.avatar);
        } catch (error) {
            console.log(`Ошибка загрузки данных пользователя: ${error}`)
            return new UserInfo("", "<ошибка>", "", "");
        }
    }

    async function loadCardListData() {
        try {
            const cardsData = await api.getCardsList();
            return new CardList('.places-list', cardsData, userInfo.userId, imagePopup, 
                                (id) => api.deleteCard(id), (id) => api.likeCard(id), (id) => api.unLikeCard(id));
        } catch (error) {
            console.log(`Ошибка загрузки карточек: ${error}`);
            return "";
        }
    }
}


//==============================