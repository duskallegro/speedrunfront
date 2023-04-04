import api from './api';

export default {
    getPracticePairs(padId, userId) {
        return api().get('get-practice-pairs', {
            params: {
                padId: padId,
                userId: userId
            }
        }).then((res) => {
            let lang = res.data.message;
            console.log(lang);
            return lang;
        });
    },

    getSplitPair(padId, userId) {
        return api().get('get-split-pair', {
            params: {
                padId: padId,
                userId: userId
            }
        }).then((res) => {
            let lang = res.data.message;
            console.log(lang);
            return lang;
        });
    },
}