import api from './api';

export default  {
    getLoggedInUser() {
       return JSON.parse(localStorage.getItem("loggedInUser"));
    },

    isLoggedIn()  {

    },

    login(user)  {
        localStorage.setItem("loggedInUser", user);

    },

    logout()  {
        localStorage.setItem("loggedInUser", null);
    },

    isLoggedInUser(username)  {
        let user = this.getLoggedInUser();
        if (user === null || user === undefined)  {
            return false;
        }

        return user.username === username;
    },

    canAddDeck(username)  {
        return this.isLoggedInUser(username);
    },

    canAddCard(username)  {
        return this.isLoggedInUser(username);

    },

    canEditCard(username)  {
        return this.isLoggedInUser(username);

    },

    canDeleteCard(username)  {
        return this.isLoggedInUser(username);

    }
}