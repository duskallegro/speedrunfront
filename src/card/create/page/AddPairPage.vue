<template>
  <EditCardForm :types="['text', 'text']" :placeholders="['Foreign Word', 'Translation']"
           button-name="ADD CARD" :form-action="createCardAction" form-title="Add Card"
          formTitle="Add Card" examplesTitle = "Add Examples"/>
</template>

<script>

import UserService from "@/app/services/UserService";
import AppForm from "@/app/component/form/AppForm";
import CardService from "@/app/services/CardService";
import DeckService from "@/app/services/DeckService";
import AddCardForm from "@/card/create/component/AddCardForm";
import EditCardForm from "@/card/edit/component/EditCardForm";
import ExampleService from "@/app/services/ExampleService";

export default {
  name: "AddPairPage",

  "components":  {
    EditCardForm,
    AddCardForm,
    AppForm
  },

  data() {
    return {

     }
  },

  created() {
    console.log(this.padId);
  },

  props:  {
    padId: Number,
    loggedInUsername: String,

  },

  methods: {
    async createCardAction(models, examples) {
      console.log("createCardAction");

      let foreign = models[0];
      let translation = models[1];


      console.log("foreign = " + foreign);
      console.log("translation = " + translation);
      console.log("examples = " + examples);

      let deckId = this.$route.params.padId;
      console.log("deckId = " + deckId);

      // create card
      let result =  await CardService.createWordPairByPadIdAndPair(deckId, foreign, translation);
      console.log(result);

      let card = await CardService.getCardByDeckIdAndForeign(deckId, foreign);
      console.log("the new card " + JSON.stringify(card));

      // set examples
      let cardId = card.pairId;
      let username = this.$route.params.username;

      result = await ExampleService.setExamplesForCard(cardId, deckId, examples);
      console.log("setexamplesresult = " + result);

      switch (result)  {
        case "EMPTY_PAD_ID":
          return "Empty pad id!";
        case "EMPTY_FOREIGN_WORD":
          return "Empty Foreign Word!";
        case "EMPTY_TRANSLATION":
          return "Empty Translation!";
        default:
          if (result)  {
            this.$router
                .push({ path: /*'/user/' + this.loggedInUsername + "/pad/" + this.padId*/
                      '/user/' + username + "/deck/" + this.padId })
                .then(() => { this.$router.go() })
          }
      }
    }
  }


}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto');
@import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'Roboto', sans-serif;
}

.wrapper {
  /* position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);*/
  width: 100%;
  max-width: 50%;
  background: var(--FORM_BACKGROUND);
  padding: 30px;
  border-radius: 5px;
}

.wrapper .title h1 {
  color: var(--LIGHT_FONT_COLOR);
  text-align: center;
  margin-bottom: 25px;
  font-weight: bold;
}

.contact-form {
  display: flex;
  flex-direction: column;

}

.input-fields {
  display: flex;
  flex-direction: column;
  margin-right: 4%;
}

.input-fields,
.msg {
  width: 100%;


}

input,  textarea  {
  background-color: var(--FORM_INPUT_BACKGROUND);
  border-radius: 0.3em;
  border: 2px solid var(--FORM_BORDER_LIGHT_GRAY);

  margin-top: 1em;

  margin: 10px 0;

  padding: 10px;
  color: var(--LIGHT_FONT_COLOR);
  width: 100%;

  cursor: pointer;
  font-size: 1em;
}



.msg textarea {
  height: 212px;
  border: 2px solid var(--FORM_BUTTON_BACKGROUND);
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: silver;
}

::-moz-placeholder {
  /* Firefox 19+ */
  color: silver;
}

:-ms-input-placeholder {
  /* IE 10+ */
  color: silver;
}

.btn {
  background: var(--FORM_BUTTON_BACKGROUND);
  text-align: center;
  padding: 15px;
  border-radius: 5px;

  color: var(--LIGHT_FONT_COLOR);
  font-weight: bold;

  cursor: pointer;
  text-transform: uppercase;

  margin-top: 1em;
}

@media screen and (max-width: 600px) {
  .contact-form {

  }

  .wrapper {
    max-width: 90%;
  }

  .msg textarea {
    height: 80px;
  }

  .input-fields,
  .msg {
    width: 100%;
  }
}

@media screen and (max-width: 400px) {
  .wrapper {
    max-width: 95%;
  }
}

@media screen and (max-width: 1000px) {
  .wrapper {
    max-width: 70%;
  }
}

@media screen and (min-width: 1000px) {
  .wrapper {
    max-width: 50%;
  }

  .input-fields, .msg {
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .wrapper {
    max-width: 40%;
  }

  .input-fields, .msg {
    width: 100%;
  }
}

@media screen and (min-width: 1500px) {
  .wrapper {
    max-width: 30%;
  }

  .input-fields, .msg {
    width: 100%;
  }
}


@media screen and (min-width: 2000px) {
  .wrapper {
    max-width: 1000px;
  }

  .input-fields, .msg {
    width: 100%;
  }
}

@media screen and (min-width: 4000px) {
  .contact-form {
    flex-direction: row;
  }
}
</style>