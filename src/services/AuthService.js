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
    }
}