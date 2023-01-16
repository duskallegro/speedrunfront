import api from './api';
import LanguageService from "@/app/services/LanguageService";

export default  {
    getPairByPadIdAndForeignAndTranslation(padId, foreign, translation)  {
        return api().get('get-pairs-by-pad-id', {params: {
                padId: padId
            }}).then((res) =>  {
            let pairs = res.data.message;
            console.log(pairs);
            return pairs;
        });
    },

    getCard(padId, foreign)  {
        return api().get('get-pair', {params: {
                padId: padId,
                foreignWord: foreign
            }}).then((res) =>  {
            let pairs = res.data.message;
            console.log(pairs);
            return pairs;
        });
    },

    getCardById(id)  {
        console.log("getCardById, id = " + id);
        return api().get('get-card-by-id', {params: {
                cardId: id
        }}).then((res) =>  {
            let pairs = res.data.message;
            console.log(pairs);
            return pairs;
        });
    },

    getPairsByPadId(padId) {
        return api().get('get-pairs-by-pad-id', {params: {
                padId: padId
            }}).then((res) =>  {
           let pairs = res.data.message;
           console.log(pairs);
           return pairs;
        });
    },

    getNumberOfPairsByPadId(padId) {
        return api().get('get-number-of-pairs-by-pad-id', {params: {
                padId: padId
            }}).then((res) =>  {
            let pairs = res.data.message;
            console.log(pairs);
            return pairs;
        });
    },

    async getPairsByPadNameAndUsernameAndForeignLangAndTranslationLang(name, userId,
                                                                       foreignLang, translationLang)  {
        let foreignLangId = await LanguageService.getIdByLanguage(foreignLang);
        let translationLangId = await LanguageService.getIdByLanguage(translationLang);

        let pad = api().get('get-pad-by-name-and-user-id-and-foreign-id-and-translation-id', {params: {
                name: name,
                userId: userId,
                foreignLangId: foreignLangId,
                translationLangId: translationLangId,
            }}).then((res) =>  {
                let result = res.data.message;
                console.log(result);
                return result;
        });

        return await this.getPairsByPadId(pad.padId);
    },

    async createWordPairByPadIdAndPair(padId, foreignWord, translation)  {
        return api().post('create-pair',
            {
                padId: padId,
                foreignWord: foreignWord,
                translation: translation
            }).then((res) =>  {
                let result = res.data.message;
                console.log(result);
                return result;
        });
    },

    async deletePair(foreign, translation, padId)  {
        return api().post('delete-pair',
            {
                padId: padId,
                foreignWord: foreign,
                translation: translation
            }).then((res) =>  {
            let result = res.data.message;
            console.log(result);
            return result;
        });
    },

    async editPair(oldForeign, newForeign, translation, padId)  {
        console.log('editPair');

        return api().post('edit-pair',
            {
                oldForeignWord: oldForeign,
                newForeignWord: newForeign,
                translation: translation,
                padId: padId
            }).then((res) =>  {
            let result = res.data.message;
            console.log(result);
            return result;
        });
    }
}