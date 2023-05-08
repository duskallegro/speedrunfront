import api from './api';


export default {
    getVoice(username)  {
        return api().get('speech',
            {
                params:
                    {

                    }
            }).then((res) =>  {
                return res;
        });
    },

    getUrl()  {
        return api().get('speech');
    }
}