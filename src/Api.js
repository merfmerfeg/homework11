export default class Api {
    _tokenId = undefined;
    _cohortNum = undefined;
    _serverAddress = undefined;
    constructor(tokenId, cohortNum, serverAddress) {
        this._tokenId = tokenId;
        this._cohortNum = cohortNum;
        this._serverAddress = serverAddress;
    }
    async getUserData() {
        const url = `${this._getUrlCohort()}users/me`;
        return await this._requestToServer(url);
    }
    async setUserData(name, about) {
        const url = `${this._getUrlCohort()}users/me`;
        return await this._requestToServer(url, "PATCH", { name: name, about: about });
    }
    async getCardsList() {
        const url = `${this._getUrlCohort()}cards`;
        return await this._requestToServer(url);
    }
    async addNewCard(name, link) {
        const url = `${this._getUrlCohort()}cards`;
        return await this._requestToServer(url, "POST", { name: name, link: link });
    }
    async deleteCard(id) {
        const url = `${this._getUrlCohort()}cards/${id}`;
        return await this._requestToServer(url, "DELETE");
    }
    async likeCard(id) {
        const url = `${this._getUrlCohort()}cards/like/${id}`;
        return await this._requestToServer(url, "PUT");
    }
    async unLikeCard(id) {
        const url = `${this._getUrlCohort()}cards/like/${id}`;
        return await this._requestToServer(url, "DELETE");
    }
    async setAvatarUser(avatarLink) {
        const url = `${this._getUrlCohort()}users/me/avatar`;
        return await this._requestToServer(url, "PATCH", { avatar: avatarLink });
    }
    async _requestToServer(url, methodParam = "GET", bodyParam = "") {
        try {
            const res = await fetch(url, (!!bodyParam) ? {
                method: methodParam,
                headers: {
                    authorization: this._tokenId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyParam)
            }
                : {
                    //а тут выполняется код, если не указан body
                    method: methodParam,
                    headers: {
                        authorization: this._tokenId,
                        'Content-Type': 'application/json'
                    }
                });
            if (res.ok) {
                return res.json();
            }
            const result = await Promise.reject(`Ошибка: ${res.status}`);
            return result;
        }
        catch (err) {
            console.log(`Ошибка при выполнении запроса к серверу: ${err}`); // выведем ошибку в консоль
            throw err; // пробрасываем ошибку дальше  //Отлично! Это хорошее решение
        }
    }
    _getUrlCohort() {
        return `${this._serverAddress}/cohort${this._cohortNum}/`;
    }
}
