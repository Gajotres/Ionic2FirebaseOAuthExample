import {Page} from 'ionic/ionic';

@Page({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
	messagesRef: Firebase;
	isLoggedIn: boolean;
	authData: any;

	authDataProfileName: string;	
	authDataProfileImage: string;
	authDataProfileDescription: string;	
	authDataProfileMemberSince: string;
	authDataProfileNoFollowers: int;
	authDataProfileLocation: string;


	constructor() {
		this.firebaseUrl = "https://gajotres.firebaseio.com/messages";
		this.messagesRef = new Firebase(this.firebaseUrl);
		this.messagesRef.onAuth((user) => {
			if (user) {
				this.authData = user;

				this.authDataProfileImage  = this.authData.twitter.profileImageURL.replace(/\_normal/,"");
				this.authDataProfileName = this.authData.twitter.displayName;
				this.authDataProfileDescription = this.authData.twitter.cachedUserProfile.description;
				this.authDataProfileMemberSince = this.authData.twitter.cachedUserProfile.created_at;
				this.authDataProfileNoFollowers = this.authData.twitter.cachedUserProfile.followers_count;
				this.authDataProfileLocation = this.authData.twitter.cachedUserProfile.location;

				this.isLoggedIn = true;
			}
		});
	}

	authWithTwitter() {
		this.messagesRef.authWithOAuthPopup("twitter", (error) => {
			if (error) {
				console.log(error);
			}
		}, {remember: "sessionOnly"});
	}  

	unauthWithTwitter() {
		this.messagesRef.unauth();
		this.isLoggedIn = false;
	}
}
