import api from './api';

export default  {
    getLanguageById(id) {
        return api().get('get-language-by-id', {params: {
                langId: id
            }}).then((res) =>  {
            let lang = res.data.message;
            console.log(lang);
            return lang;
        });
    },

    getIdByLanguage(lang) {
        return api().get('get-id-by-language', {params: {
                language: lang
            }}).then((res) =>  {
                let id = res.data.message;
                console.log(id);
                return id;
        });
    }
}