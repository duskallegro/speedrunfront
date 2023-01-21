<template>
  <div class="practice-pair-container">
    <div class="header-text matching-pair-header">
      Find Matching Pairs
    </div>

    <div class="error-message">
      {{errorMessage}}
    </div>

    <div class="pair-container">

      <div class="left-column">
        <CardPairPractice v-for="(types, i) in this.practicePairs"
                          :card = this.practicePairs[i] :key="i"
                          :is-foreign="true"
                          :is-selected="this.foreignSelectedStatuses[i]"
                          :is-guessed="this.isGuessedForeignStatuses[i]"
                          :index = i
                          :is-invalid="this.foreignInvalidStatuses[i]"
                          :is-hidden="this.foreignHiddenStatuses[i]"

                          v-on:cardClicked="this.foreignCardClicked($event)"

        />
      </div>


      <div class="right-column">
        <CardPairPractice v-for="(types, i) in this.shuffledPairs"
                          :card = this.shuffledPairs[i] :key="i"
                          :is-foreign="false"
                          :is-selected="this.translationSelectedStatuses[i]"
                          :is-guessed="this.isGuessedTranslationStatuses[i]"
                          :index = i
                          :is-invalid="this.translationInvalidStatuses[i]"
                          :is-hidden="this.translationHiddenStatuses[i]"

                          v-on:cardClicked="this.translationCardClicked($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PracticeService from "@/app/services/PracticeService";
import UserService from "@/app/services/UserService";
import CardPairPractice from "@/deck/practice/pair/component/CardPairPractice";

export default {
name: "PairPracticePage",
  components: {CardPairPractice},
  props: {
  padId: Number,
  username: String
},

data() {
  return {
    practicePairs: [],
    shuffledPairs: [],

    foreignSelectedStatuses: [],
    translationSelectedStatuses: [],

    isGuessedForeignStatuses: [],
    isGuessedTranslationStatuses: [],

    foreignInvalidStatuses: [],
    translationInvalidStatuses: [],

    errorMessage: " ",

    foreignHiddenStatuses: [],
    translationHiddenStatuses: [],

  }
},

async beforeCreate() {
  let userId = await UserService.getUserByUsername(this.username);

  let result = await PracticeService.getPracticePairs(this.padId, userId);

  this.practicePairs = result.practicePairs;
  this.shuffledPairs = result.shuffledPairs;

  console.log(this.practicePairs);
  console.log(this.shuffledPairs);

  this.foreignSelectedStatuses = this.practicePairs.map((p) => false);
  this.translationSelectedStatuses = this.shuffledPairs.map((p) => false);

  this.isGuessedForeignStatuses = this.practicePairs.map((p) => false);
  this.isGuessedTranslationStatuses = this.shuffledPairs.map((p) => false);

  this.foreignInvalidStatuses = this.practicePairs.map((p) => false);
  this.translationInvalidStatuses = this.shuffledPairs.map((p) => false);

  this.foreignHiddenStatuses = this.practicePairs.map((p) => false);
  this.translationHiddenStatuses = this.shuffledPairs.map((p) => false);
},

methods:  {
  foreignCardClicked(index)  {
    console.log('foreignCardClicked, index = ' + index);

    /*
     if any other foreign cards
     are selected, deselect them
     */
    this.foreignSelectedStatuses = this.foreignSelectedStatuses.map(() => false);
    this.foreignSelectedStatuses[index] = true;

    // check if there is a translation card selected
    let translationCardIndex = this.translationSelectedStatuses.findIndex((status) =>  status);
    console.log("other translationCardIndex = " + translationCardIndex);

    // if there is a selected translation
    if (translationCardIndex !== -1)  {
      // get the translation card
      let translationCard = this.shuffledPairs[translationCardIndex];
      console.log("other translation card = " + JSON.stringify(translationCard));

      // check if the translation matches
      let foreignCard = this.practicePairs[index];
      console.log("foreign card = " + JSON.stringify(foreignCard));

      if (foreignCard.translation === translationCard.translation)  {
        this.isGuessedForeignStatuses[index] = true;
        this.isGuessedTranslationStatuses[translationCardIndex] = true;

        let f = this.foreignHiddenStatuses;
        let t = this.translationHiddenStatuses;
        setTimeout(function()  {
          console.log("hiding " + index + ", " + translationCardIndex)
          f[index] = true;
          t[translationCardIndex] = true;
        }, '1000');
      } else  {
        // display an error
        this.foreignInvalidStatuses[index] = true;
      }
    }
  },

  translationCardClicked(index)  {
    console.log('translationCardClicked, index = ' + index);

    // remove selection from any other translation card
    this.translationSelectedStatuses = this.translationSelectedStatuses.map(() => false);
    this.translationSelectedStatuses[index] = true;

    // check if there is a foreign card selected
    let foreignCardIndex = this.foreignSelectedStatuses.findIndex((status) =>  status);
    console.log("other foreignCardIndex = " + foreignCardIndex);

    // if there is a selected foreign card
    if (foreignCardIndex !== -1)  {
      // get the foreign card
      let foreignCard = this.practicePairs[foreignCardIndex];
      console.log("other foreignCard = " + JSON.stringify(foreignCard));

      // check if the translation matches
      let translationCard = this.shuffledPairs[index];
      console.log("translationCard = " + JSON.stringify(translationCard));

      if (foreignCard.translation === translationCard.translation)  {
        this.isGuessedTranslationStatuses[index] = true;
        this.isGuessedForeignStatuses[foreignCardIndex] = true;

        let f = this.foreignHiddenStatuses;
        let t = this.translationHiddenStatuses;
        setTimeout(function()  {
          console.log("hiding " + foreignCardIndex + ", " + index)

          f[foreignCardIndex] = true;
          t[index] = true;
        }, '1000');
      } else  {
        // display an error
        this.translationInvalidStatuses[index] = true;

      }
    }
  }
}

}
</script>

<style scoped>
  .practice-pair-container  {
    margin: 0;
    width: 90%;
    min-width: 90%;

    display: flex;
    flex-direction: column;

    justify-content: start;
    align-items: center;
    align-content: center;
  }

  .pair-container  {
    margin-top: 2em;

    margin-left: 0.2em;
    margin-right: 0.2em;

    display: grid;
    grid-template-columns: auto auto;
    /*grid-auto-rows: minmax(100px, auto);*/

    column-gap: 2em;
    row-gap: 2em;



/*
    background-color: red;
*/
  }

  .left-column  {


/*
    background-color: green;
*/
  }

  .right-column  {

/*
    background-color: yellow;
*/
  }

  .left-column div, .right-column div  {
    margin-bottom: 1em;
  }

  .error-message  {
    color: red;
    font-weight: bold;
  }

  .matching-pair-header  {
    display: flex;
    justify-content: center;
   }


  /* Media */


  @media screen and (max-width: 1300px) {
    .practice-pair-container  {
/*
      background-color: aqua;
*/
      width: 100%;

    }

    .pair-container  {
      min-width: 70%;
      max-width: 70%;

      column-gap: 1.5em;
      margin-left: 2em;
      margin-right: 2em;
    }

    .matching-pair-header {
      font-size: 1.7em;
      margin-bottom: 1em;
    }
  }

  @media screen and (max-width: 600px) {
    .practice-pair-container {
/*
      background-color: silver;
*/
      width: 100%;

    }

    .pair-container  {
/*
      background-color: purple;
*/

      min-width: 80%;
      max-width: 80%;

      column-gap: 0.5em;

      margin-left: 1em;
      margin-right: 1em;
    }


    .matching-pair-header {
      font-size: 1.5em;
    }
  }


  @media screen and (max-width: 400px) {
    .practice-pair-container  {

/*
      background-color: blue;
*/


      width: 90% !important;
      max-width: 90%;
      min-width: 90%;

      overflow: hidden;;
    }

    .pair-container  {
      min-width: 100%;
      max-width: 100%;

      column-gap: 0.2em !important;
      row-gap: 0em;

      margin-left: 0.5em !important;
      margin-right: 0.5em !important;

/*
      background-color: yellow;
*/
    }

    .matching-pair-header{
      font-size: 0.9em;
    }
  }


  @media screen and (max-width: 300px) {
    .practice-pair-container  {
      width: 95%;
      min-width: 95%;

/*
      background-color: blue;
*/

      width: 100%;

      overflow: hidden;;
    }

    .pair-container  {
      min-width: 100%;
      max-width: 100%;

      column-gap: 0.1em !important;
      row-gap: 0em;

      margin-left: 0.2em !important;
      margin-right: 0.2em !important;

/*
      background-color: yellow;
*/
    }

    .matching-pair-header{
      font-size: 0.9em;
    }
  }
</style>