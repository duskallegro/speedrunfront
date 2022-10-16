import api from './api';

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
    }
}