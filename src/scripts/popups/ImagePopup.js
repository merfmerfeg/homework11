class ImagePopup extends Popup {
    open(imageLink) {
        const image = this.popupContainer.querySelector('.popup__image');
        image.setAttribute('src', imageLink);

        super.open();
    }
}