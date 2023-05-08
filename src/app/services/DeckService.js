import api from './api';
import CardService from "@/app/services/CardService";

export default  {
    getPadsByDiscordId(discordId)  {
        return api().get('userwordpads',
            {params:
                    {
                        discordId: discordId
                    }
            }).then((res) =>  {
            let pads = res.data.message;
            console.log(pads);
            return pads;
        });
    },

    getPadsByUsername(username)  {
        return api().get('get-pads-by-username',
            {params:
                    {
                        username: username
                    }
            }).then(async (res) =>   {
            let pads = res.data.message;
            console.log(pads);
            return pads;
        });
    },


    getPadsByUserId(userId)  {
        return api().get('get-pads-by-user-id',
            {params:
                    {
                        userId: userId
                    }
            }).then(async (res) =>   {
            let pads = res.data.message;
            console.log(pads);
            return pads;
        });
    },

    getPadById(id)  {
        return api().get('get-pad-by-id',
            {params:
                    {
                        padId: id
                    }
            }).then(async (res) =>   {
            let pads = res.data.message;
            console.log(pads);
            return pads;
        });
    },

    createPad(name, foreign, translation, username)  {
        return api().post('create-pad',
            {
                name: name,
                foreignLanguage: foreign,
                translationLanguage: translation,
                username: username
            }).then((res) =>  {
                let result = res.data.message;
                console.log(result);
                return result;
        });
    }


}