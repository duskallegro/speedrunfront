<template>
  <div class="card-container">
    <CardFullComponent :card="this.card"/>
  </div>
</template>

<script>
import CardService from "@/app/services/CardService";
import ExampleService from "@/app/services/ExampleService";

import CardFullComponent from "@/card/view/component/CardFullComponent";

export default {

name: "ViewCardPage",
  components: {CardFullComponent},
  props:  {
  cardId: Number,
  deckId: Number
},

data() {
  return {
    card: Object
  }
},

async beforeCreate() {
  let card = await CardService.getCardById(this.cardId);
  this.card = card;
  console.log("viewing card page " + JSON.stringify(card));

  let examples = await ExampleService.getExamplesByCardId(this.cardId);
  console.log(examples);

  if (examples.length > 0) {
    this.card.examples = examples.map((example) => {
      return {
        example: example.example,
        translation: example.translation
      }
    });
  }  else  {
    this.card.examples = [];
  }
}
}
</script>

<style scoped>
  .card-container  {
    min-width: 400px;
  }
</style>