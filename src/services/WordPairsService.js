import api from './api';

export default  {
    getPairsByPadIdyPadId(padId) {
        return api().get('pairsbypadid', {params: {
                padId: padId
            }}).then((res) =>  {
           let pairs = res.data.message;
           console.log(pairs);
           return pairs;
        });
    }
}