<template>
  <div class="practice-pair-container">
    <div class="header-text matching-pair-header">
<!--      <div class="pairs-practice-header">
        Find <span class="color-header">Matching</span> Pairs
      </div>-->

      <div :class="'timer  ' + (this.finishedGuessing() ? ' green' : '')" >{{timerValue()}}</div>
    </div>

    <div v-if="this.finishedGuessing()" id="play-again-button-pairs">
      <AppButton text="PLAY AGAIN" :action="this.startGame"/>
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
import AppButton from "@/app/component/button/AppButton";

export default {
name: "PairPracticePage",
  components: {AppButton, CardPairPractice},
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

    milliseconds: 0,

    pairsGuessed: 0,
    finishedSeconds: 0,

    start: Date
  }
},

async beforeCreate() {
 },

async created()  {
  console.log("created");
  await this.startGame();

    /*setInterval(  ()  => {
      if (!this.finishedGuessing) {
        // this.milliseconds++;
        this.milliseconds = new Date().getTime() - this.start;
      }
  }, 1);*/



},

computed:  {

},

methods:  {
  finishedGuessing: function()  {
    return this.pairsGuessed >= this.shuffledPairs.length;
  },

  updateTime()  {
    if (!this.finishedGuessing()) {
      this.milliseconds = new Date().getTime() - this.start;

      requestAnimationFrame(this.updateTime);
    }
  },

  startGame: async function()  {
    console.log("startGame");


    this.errorMessage = "";

    this.pairsGuessed = 0;

    // resetting the timer
    this.start = new Date().getTime();
    this.milliseconds = 0;

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

    this.updateTime();
  },

  foreignCardClicked(index)  {
    console.log('foreignCardClicked, index = ' + index);

    if (this.foreignSelectedStatuses[index])  {
      this.foreignSelectedStatuses[index] = false;
      return;
    }

    /*
     if any other foreign cards
     are selected, deselect them
     */
    this.foreignSelectedStatuses = this.foreignSelectedStatuses.map(() => false);
    this.foreignSelectedStatuses[index] = true;

    // remove invalid statuses from all cards
    this.foreignInvalidStatuses = this.foreignInvalidStatuses.map(() => false);
    this.translationInvalidStatuses = this.translationInvalidStatuses.map(() => false);

    // check if there is a translation card selected
    let translationCardIndex = this.translationSelectedStatuses.findIndex((status) =>  status);
    console.log("other translationCardIndex = " + translationCardIndex);

    // if there is a selected translation
    if (translationCardIndex !== -1)  {
      // get the translation card
      let translationCard = this.shuffledPairs[translationCardIndex];
      if (this.isGuessedTranslationStatuses[translationCardIndex])  {
        return;
      }

      console.log("other translation card = " + JSON.stringify(translationCard));

      // check if the translation matches
      let foreignCard = this.practicePairs[index];
      console.log("foreign card = " + JSON.stringify(foreignCard));

      if (foreignCard.translation === translationCard.translation)  {
        this.isGuessedForeignStatuses[index] = true;
        this.isGuessedTranslationStatuses[translationCardIndex] = true;

        let f = this.foreignHiddenStatuses;
        let t = this.translationHiddenStatuses;

        this.pairsGuessed++;
        setTimeout(() =>  {
          console.log("hiding " + index + ", " + translationCardIndex)
          f[index] = true;
          t[translationCardIndex] = true;

          // remove selection from these cards
          this.translationSelectedStatuses[translationCardIndex] = false;
          this.foreignSelectedStatuses[index] = false;

          // remove invalid statuses from all cards
       /*   this.foreignInvalidStatuses = this.foreignInvalidStatuses.map(() => false);
          this.translationInvalidStatuses = this.translationInvalidStatuses.map(() => false);*/
        }, '1000');
      } else  {
        // display an error
        this.foreignInvalidStatuses[index] = true;
        this.translationInvalidStatuses[translationCardIndex] = true;
      }
    }
  },

  translationCardClicked(index)  {
    console.log('translationCardClicked, index = ' + index);

    // if already selected, unselect
    if (this.translationSelectedStatuses[index])  {
      this.translationSelectedStatuses[index] = false;
      return;
    }


    // remove selection from any other translation card
    this.translationSelectedStatuses = this.translationSelectedStatuses.map(() => false);
    this.translationSelectedStatuses[index] = true;


    // remove invalid statuses from all cards
    this.foreignInvalidStatuses = this.foreignInvalidStatuses.map(() => false);
    this.translationInvalidStatuses = this.translationInvalidStatuses.map(() => false);

    // check if there is a foreign card selected
    let foreignCardIndex = this.foreignSelectedStatuses.findIndex((status) =>  status);
    console.log("other foreignCardIndex = " + foreignCardIndex);

    // if there is a selected foreign card
    if (foreignCardIndex !== -1)  {
      if (this.isGuessedForeignStatuses[foreignCardIndex])  {
        return;
      }

      // remove selection from all other foreign cards
      this.foreignSelectedStatuses = this.foreignSelectedStatuses.map(() => false);
      this.foreignSelectedStatuses[foreignCardIndex] = true;

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

        this.pairsGuessed++;
        setTimeout(() => {
          console.log("hiding " + foreignCardIndex + ", " + index)

          f[foreignCardIndex] = true;
          t[index] = true;

          // remove selection from these cards
          this.translationSelectedStatuses[index] = false;
          this.foreignSelectedStatuses[foreignCardIndex] = false;

          // remove invalid statuses from all cards
          /*this.foreignInvalidStatuses = this.foreignInvalidStatuses.map(() => false);
          this.translationInvalidStatuses = this.translationInvalidStatuses.map(() => false);*/
        }, '1000');
      } else  {
        // display an error
        console.log("bad translation card clicked")
        this.translationInvalidStatuses[index] = true;
        this.foreignInvalidStatuses[foreignCardIndex] = true;

      }
    }
  },

  duration(millisecondsData) {
    let milliseconds = millisecondsData % 1000;
    millisecondsData = (millisecondsData - milliseconds) / 1000;

    let seconds = millisecondsData % 60;
    millisecondsData = (millisecondsData - seconds) / 60;

    let minutes = millisecondsData % 60;
    let hours = (millisecondsData - minutes) / 60;

    return [
      this.format(hours),
      this.format(minutes),
      this.format(seconds),
      this.format(milliseconds)
    ].join(':');
  },

  format(n) {
    return (~~n).toString().padStart(2, '0')
  },

  timerValue: function()  {
    if (this.finishedGuessing())  {
      return this.duration(this.milliseconds);
    }

    /*this.finishedSeconds = JSON.parse(JSON.stringify(this.milliseconds));
    return this.duration(this.finishedSeconds);*/
    return this.duration(this.milliseconds);
  }
}

}
</script>

<style scoped>
  #play-again-button-pairs  {
    margin-top: 2em;
  }



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

    /*display: grid;
    grid-template-columns: auto auto;
    !*grid-auto-rows: minmax(100px, auto);*!

    column-gap: 1em;
    row-gap: 2em;

    place-items: center;*/

    max-width: 100%;
    min-width: 70%;
    width: 70%;

    max-width: 55%;
    min-width: 55%;
    width: 55%;

/*
    background-color: red;
*/
  }

  .left-column  {


/*
    background-color: green;
*/

    margin: 0;
    padding: 0;

    max-width: 46%;
    min-width: 46%;
    width: 46%;

    float: left;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-end;

    align-items: center;
   }

  .right-column  {

/*
    background-color: yellow;
*/

    margin: 0;
    padding: 0;

    max-width: 46%;
    min-width: 46%;
    width: 46%;

    float: right;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;


    align-items: center;

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
    align-items: start;

    flex-direction: column;

    font-size: 1em !important;
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
     /* min-width: 30%;
      max-width: 30%;
*/

      column-gap: 1.5em;
      margin-left: 2em;
      margin-right: 2em;

      max-width: 65%;
      min-width: 65%;
      width: 65%;

    }

    .matching-pair-header {
      font-size: 1.7em;
      margin-bottom: 1em;
    }
  }

  @media screen and (max-width: 1200px) {
    .pair-container  {
      max-width: 75%;
      min-width: 75%;
      width: 75%;
    }
  }

  @media screen and (max-width: 1100px) {
    .pair-container  {
      max-width: 85%;
      min-width: 85%;
      width: 85%;
    }
  }


  @media screen and (max-width: 1000px) {
    .pair-container  {
      max-width: 90%;
      min-width: 90%;
      width: 90%;
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

      max-width: 93%;
      min-width: 93%;
      width: 93%;

      column-gap: 0.5em;

      margin-left: 1em;
      margin-right: 1em;
    }


    .matching-pair-header {
      font-size: 1.5em;
    }

    .left-column  {
      margin-left: 0.2em;
    }

    .right-column  {
      margin-right: 0.2em;
    }
  }


  @media screen and (max-width: 400px) {
    .practice-pair-container  {

/*
      background-color: blue;
*/


      width: 94% !important;
      max-width: 94%;
      min-width: 94%;

      overflow: hidden;;
    }

    .pair-container  {
      min-width: 100%;
      max-width: 100%;
      width: 100%;

      column-gap: 0.2em !important;
      row-gap: 0em;

      margin-left: 0.1em !important;
      margin-right: 0.1em !important;



    }

    .matching-pair-header{
      font-size: 0.9em;
    }

    .left-column, .right-column  {
      max-width: 47%;
      min-width: 47%;
      width: 47%;
    }

    .left-column  {
      margin-left: 0.1em;
    }

    .right-column  {
      margin-right: 0.1em;
    }
  }


  @media screen and (max-width: 300px) {
    .practice-pair-container  {
      width: 92%;
      min-width: 92%;

/*
      background-color: blue;
*/


      overflow: hidden;;
    }

    .pair-container  {
      min-width: 100%;
      max-width: 100%;
      width: 100%;

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


    .left-column  {
      margin-left: 0em;
    }

    .right-column  {
      margin-right: 0em;
    }
  }
</style>