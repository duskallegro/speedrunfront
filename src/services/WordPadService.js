import api from './api';

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
}