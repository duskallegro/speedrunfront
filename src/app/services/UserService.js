import api from './api';

import store from './store';


export default  {
    getAllUsers()  {
        return api().get('users').then((res) =>  {
            let users = res.data.message;
            console.log(users);
            return users;
        });

        /*return [{
            username: "John",
            discordId: "123456"
        },
        {
            username: "Tom",
            discordId: "891224"
        }];*/
    },

    getUserByUsername(username)  {
        return api().get('userbyusername',
            {params:
                    {
                        username: username
                    }
            }).then((res) =>  {
            let user = res.data.message;
            console.log(user);
            return user;
        });
    },

    createNormalUser(username, password, email)  {
        return api().post('create-normal-user',
            {
                username: username,
                password: password,
                email: email
            }).then((res) =>  {
                let result = res.data.message;
                console.log(result);
                return result;
        });
    },

    normalLogin(username, password)  {
        return api().post("normal-login",
            {
                username: username,
                password: password
            }).then((res) =>  {
                let result = res.data.message;
                console.log(result);
                return result;
        });
    }
}