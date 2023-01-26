<template>
  <div class="guess-practice-container">
    <div v-if="isLoaded" class="inner-outer">
      <div class="header-text guess-header">
        Guess and Rate
      </div>


      <div class="card-for-practice-container">
        <div class="rate-card"
             v-on:click.stop="rateAndNext"
             :class="this.showRates ? 'visible-rates' : 'invisible-rates'"
        >
          <div class="red-light">
            <span v-if="this.showRates">🙁</span>
          </div>

          <div class="yellow-light">
            <span v-if="this.showRates">🤔</span>
          </div>

          <div class="green-light">
            <span v-if="this.showRates">😎</span>
          </div>
        </div>

        <CardGuessComponent :foreignWord="this.currentCard.foreignWord"
              :translation="this.currentCard.translation"
              :examples = "this.currentCard.examples"

              :mode = "this.currentMode"
                            ref="currentCardObject"
                       v-on:click.stop="cardFlippedAction"
                            v-on:cardOpened="this.cardOpened($event)"
                            v-on:cardClosed="this.cardClosed($event)"
        />
      </div>



<!--      <div class="rate-card"
           v-on:click.stop="rateAndNext"
           :class="this.showRates ? 'visible-rates' : 'invisible-rates'"
      >
        <div class="red-light">
          <span v-if="this.showRates">🙁</span>
        </div>

        <div class="yellow-light">
          <span v-if="this.showRates">🤔</span>
        </div>

        <div class="green-light">
          <span v-if="this.showRates">😎</span>
        </div>
      </div>-->

    </div>

    <div v-if="!isLoaded">
      <AppSpinner/>
    </div>
  </div>
</template>

<script>
import DeckService from "@/app/services/DeckService";
import CardService from "@/app/services/CardService";
import CardGuessComponent from "@/deck/practice/guess/component/CardGuessComponent";
import util from "@/app/services/util";
import AppSpinner from "@/app/component/spinner/AppSpinner";
import ExampleService from "@/app/services/ExampleService";

export default {
  name: "GuessAndRatePracticePage",
  components: {CardGuessComponent, AppSpinner},

  data() {
    return {
      isLoaded: false,
      showRates: false,

      deck: [],
      cards: [],

      currentCard: null,
      currentIndex: -1,
      currentMode: ""
     }
  },

  props:  {
    padId: Number,
    loggedInUsername: String,

    mode: String
  },

  async beforeCreate() {
    this.deck = await DeckService.getPadById(this.padId);
    this.cards = await CardService.getPairsByPadId(this.padId);

    for (let i = 0; i < this.cards.length; i++) {
      this.cards[i].examples = await ExampleService.getExamplesByCardId(this.cards[i].pairId);
    }

    this.pickCard();

    this.isLoaded = true;
  },

  methods:  {
    createSpaces(s)  {
      let result = "";

      for (let i = 0; i < s.length; i++) {
        result += '\xa0';
      }

      return result;
    },

    pickCard()  {
      if (this.$refs.currentCardObject !== undefined) {
        this.$refs.currentCardObject.close();
      }

      this.currentIndex = util.getRandomInRange(0, this.cards.length - 1);
      this.currentCard = this.cards[this.currentIndex];
      if (this.mode === 'both')  {
        let dice = util.getRandomInRange(1, 2);
        if (dice === 1)  {
          this.currentMode = "translation";
        } else  {
          this.currentMode = "foreign";
        }
      } else  {
        this.currentMode = this.mode;
      }

      this.showRates = false;
      console.log(this.$refs);
    },

    cardOpened(event)  {
      console.log('cardOpenedEvent');

    },

    cardClosed(event)  {
      console.log('cardClosedEvent');
    },

    rateAndNext()  {
      if (this.showRates) {
        console.log("rateAndNext");
        this.pickCard();
      }
    },

    cardFlippedAction()  {
      console.log("cardFlippedAction");
      this.showRates = true;

    }
  },




}
</script>

<style scoped>

.card-for-practice-container  {
/*
  background-color: yellow;
*/
  min-width: 100%;
/*
  min-height: 80%;*/
/*
  height: 80%;
*/

/*  min-height: 40%;
  max-height: 40vh;*/
/*
  overflow: hidden;
*/
}

.guess-practice-container  {
/*
  background-color: red;
*/
  min-width: 30%;
  max-width: 30%;

  min-height: 40%;
  height: 40%;
  /*max-height: 40%;*/

   /* min-height: 150px;
  height: 150px;*/

 }

.inner-outer  {
  min-width: 100%;
  max-width: 100%;

  min-height: 100%;
  max-height: 100%;
  height: 100%;



/*
   background-color: green;
*/
}


/* Lights */

.rate-card  {
  display: flex;
  justify-content: space-between;

  min-height: 50%;
  height: 50%;

  border-radius: 1em !important;
}

/*.rate-card  {
  position: absolute;
  bottom: 0;
  left: 10vw;

  min-height: 150px;
  height: 150px;

  min-width: 80vw;
  width: 80vw;

  margin-top: 10vh;

}*/


.rate-card div  {
  cursor: pointer;
  font-size: 2.5em;

  display: flex;
  justify-content: center;
  align-items: center;

 /* filter: brightness(0.5);*/
}

.rate-card div:hover  {
  filter: brightness(1.05);
}

.red-light, .yellow-light, .green-light  {
  min-width: 33%;
  width: 33%;

  min-height: 100%;
  height: 100%;

}

.red-light   {
  background-color:  #991f00;
}

.yellow-light  {
  background-color:  #999900;


  width: 34%;
}

.green-light  {
  background-color:  #558000;
}

.invisible-rates div {
  background-color: transparent;
  background-color: transparent;
}

.invisible-rates  {
  display: none;
}

@media screen and (max-width: 1300px) {
  .guess-practice-container  {

      min-width: 70%;
      max-width: 70%;
/*
      min-height: 150px;
      height: 150px;*/
  }

  .guess-header  {
    font-size: 1.7em;
    margin-bottom: 1em;
  }
}

@media screen and (max-width: 600px) {
  .guess-practice-container  {

    min-width: 80%;
    max-width: 80%;
/*
    min-height: 150px;
    height: 150px;*/
  }


  .guess-header  {
    font-size: 1.5em;
  }
}


@media screen and (max-width: 400px) {
  .guess-practice-container  {

    min-width: 90%;
    max-width: 90%;
/*
    min-height: 150px;
    height: 150px;*/
  }

  .guess-header  {
    font-size: 1.2em;
  }
}


@media screen and (max-width: 300px) {
  .guess-practice-container  {

    min-width: 92%;
    max-width: 92%;
/*
    min-height: 150px;
    height: 150px;*/

    max-height: 100%;
  }

  .guess-header  {
    font-size: 1.2em;
  }
}
</style>