import api from './api';

export default  {
    getExamplesByCardId(cardId)  {
        return api().get('get-examples-by-card-id',
            {params:
                    {
                        cardId: cardId
                    }
            }).then((res) =>  {
            let pads = res.data.message;
            console.log(pads);
            return pads;
        });
    },

    setExamplesForCard(cardId, deckId, examples)  {
        return api().post('set-examples-to-card',
            {
                cardId: cardId,
                deckId: deckId,
                examples: examples
            }).then((res) =>  {
            let result = res.data.message;
            console.log(result);
            return result;
        });
    }
}