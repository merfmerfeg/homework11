class UserInfo {
	_id = undefined;
	_userName = undefined;
	_userJob = undefined;
	_userPhotoLink = undefined;

	constructor(id, userName, userJob, userPhotoLink) {
		this.userInfoContainer = document.querySelector(".user-info");

		this._id = id;
		this._userName = userName;
		this._userJob = userJob;
		this._userPhotoLink = userPhotoLink;

		this.renderUserData();
	}

	get userId() {
		return this._id;
	}
	set userId(value) {
		this._id = value;
	}

	get userName() {
		return this._userName;
	}
	set userName(value) {
		this._userName = value;
		this.renderUserData("name");
	}

	get userJob() {
		return this._userJob;
	}
	set userJob(value) {
		this._userJob = value;
		this.renderUserData("job");
	}

	get userPhotoLink() {
		return this._userPhotoLink;
	}
	set userPhotoLink(value) {
		this._userPhotoLink = value;
		this.renderUserData("photo");
	}

	renderUserData(render) {
		if (render === "name") {
			this.userInfoContainer.querySelector(".user-info__name").textContent = this._userName;
		} else if (render === "job") {
			this.userInfoContainer.querySelector(".user-info__job").textContent = this._userJob;
		} else if (render === "photo") {
			this.userInfoContainer.querySelector(".user-info__photo").setAttribute('style', `background-image: url(${this._userPhotoLink})`);
		} else {
			this.renderUserData("name");
			this.renderUserData("job");
			this.renderUserData("photo");
		}
	}

}

