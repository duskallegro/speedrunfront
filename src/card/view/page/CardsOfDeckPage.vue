<template>
  <div class="word-pairs-of-pad-container">
    <div id="add-practice-buttons-container" >
      <NavbarButton id="add-card-button" text="Add Card" v-if="this.canEdit()"
                    :link="this.$route.fullPath.substring(1) + '/add-pair'"
                    :elements="[this.$route.params.padId]"/>
      <NavbarButton id="practice-button" text="Practice" class="bright-blue"
                    :link="this.$route.fullPath.substring(1) + '/practice'"
                    :elements="[this.$route.params.padId]"/>

    </div>

    <div v-if="isLoaded" class="wrapper-around-table">
      <AppTable id="cards-of-deck-component-pc" class="pairs-table" :table-title= "'Words of ' + this.padName + ' Deck'"
                :header="['#', 'Foreign Word', 'Translation', 'Progress', 'Edit', 'Delete']"
                :rows="this.rows" :row-classes="rowClasses"
                :row-actions="this.rowActions"
                :cell-actions="this.cellActions"
      />

      <CardsOfDeckComponentMobile :cards="this.wordpairs" :actions="this.rowActions"
            :editAction = "this.editCard" :deleteAction = "this.deleteCard"/>
    </div>

    <div v-if="!isLoaded">
      <AppSpinner/>
    </div>

  </div>
</template>

<script>
import CardService from "@/app/services/CardService";
import AppTable from "@/app/component/table/AppTable";
import NavbarButton from "@/app/component/button/NavbarButton";
import AppSpinner from "@/app/component/spinner/AppSpinner";
import DeckService from "@/app/services/DeckService";
import AuthService from "@/app/services/AuthService";
import CardsOfDeckComponentMobile from "@/card/view/component/CardsOfDeckComponentMobile";

export default {
  name: "CardsOfDeckPage",
  components: {CardsOfDeckComponentMobile, AppSpinner, NavbarButton, AppTable},
  data()  {
    return {
      wordpairs: [],
      rows: [],
      rowClasses: [],

      isLoaded: false,

      padName: "",

      cellActions: [],
      rowActions: []

    }
  },

  async created()  {
    let padId = this.$route.params.padId;

    let start = new Date();

    console.log("padId = " + padId);
    let pad = await DeckService.getPadById(padId);
    this.padName = pad.name;

    this.getPairsByPadId(padId).then(() =>  {
      console.log("Got pairs: " + this.wordpairs.length + "!");
      if (this.wordpairs.length === 0)  {
        this.isLoaded = true;
        return;
      }

      this.rows = [];
      this.rowClasses = [];

      for (let i = 0; i < this.wordpairs.length; i++) {
        let pair = this.wordpairs[i];
        console.log("pair = " + JSON.stringify(pair));

        let progressString = new Intl.NumberFormat('en-IN', {
          maximumFractionDigits: 2
        }).format(100 * pair.progress) + "%";
        this.wordpairs[i].progressString = progressString;

        this.rows.push([i + 1, pair.foreignWord, pair.translation,  progressString, '🖊️️', '❌']);

        this.rowClasses.push(["", "", "", "very-bright-blue-text bold", "", ""]);
        this.cellActions.push([this.viewCardAction, this.viewCardAction, this.viewCardAction,
          this.viewCardAction, this.editCard, this.deleteCard]);

        let end = new Date();
        let elapsed = end - start; // ms

        let neededWait = 700;
        let remainingWait = neededWait - elapsed;

        console.log("remainingWait = " + remainingWait);
       /* setTimeout(() =>  {
          this.isLoaded = true;
        }, 1200);*/
        this.isLoaded = true;

        this.rowActions.push(this.viewCardAction);
      }
    }).catch((e) => {
      console.log(e);
      this.isLoaded = true;
    });
  },


  methods:  {
    canEdit()  {
        return AuthService.isLoggedInUser(this.$route.params.username);
    },

    async viewCardAction(rowIndex)  {
      console.log("viewCardAction " + rowIndex);

      let padId = this.$route.params.padId;
      let card = this.wordpairs[rowIndex];
      console.log("viewing... " + JSON.stringify(card));

      this.$router
          .push({ path: "/user/" +  this.$route.params.username + "/deck/" + padId +
                '/card/' + card.pairId})
          .then(() => { this.$router.go() })
    },

    async getPairsByPadId(padId)  {
      let result = await CardService.getPairsByPadId(padId);


      this.wordpairs = result;
      console.log(this.wordpairs);
    },

    async deleteCard(i, j)  {
      console.log("deleteCard " + i + ", " + j);

      console.log("deleteCard");

      let card = this.wordpairs[i];

      let padId = this.$route.params.padId;
      let foreign = card.foreignWord;
      let translation = card.translation;

      let result = await CardService.deletePair(foreign, translation, padId);
      if (result)  {
     /*   this.$router
            .push({ path: this.$route.path })
            .then(() => { this.$router.go() })*/
        this.$router.go();
      }
    },


    async editCard(i, j)  {
      console.log("editCard " + i + ", " + j);
      let card = this.wordpairs[i];

    /*  let card = this.wordpairs[i];

      let padId = this.$route.params.padId;
      let foreign = card.foreignWord;
      let translation = card.translation;

      let result = await CardService.deletePair(foreign, translation, padId);
      if (result)  {
        /!*   this.$router
               .push({ path: this.$route.path })
               .then(() => { this.$router.go() })*!/
        this.$router.go();
      }
*/
      let padId = this.$route.params.padId;
      this.$router.push({ path: '/user/' + AuthService.getLoggedInUser().username + '/deck/' +
        padId + "/card/" + card.pairId + '/edit-card'});
    }
  }
}
</script>

<style scoped>
#add-practice-buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

/*
  margin-left: 4em;
*/

 }


.word-pairs-of-pad-container  {
    margin: 2em;

    width: 40%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  #add-card-button  {
/*
    margin-top: 2em !important;
*/

  }

  .pairs-table  {
    margin-top: 2em;
  }

  /* Media mobile */


  /* Mobile decks */
  @media (max-width: 2500px) {
    .word-pairs-of-pad-container  {
      width: 60%;
    }
  }

  @media (max-width: 2300px) {
    .word-pairs-of-pad-container  {
      width: 70%;
    }
  }


  @media (max-width: 1400px) {
    .word-pairs-of-pad-container  {
      width: 80%;
    }

    .wrapper-around-table  {
      width: 75%;
      min-width: 75%;
      max-width: 75%;
    }

    .wrapper-around-table  {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 1200px) {
    .word-pairs-of-pad-container  {
      width: 90%;
      min-width: 90%;
      max-width: 90%;

       margin: 1.5em;
    }

    .wrapper-around-table  {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }

  @media (max-width: 850px) {
    .word-pairs-of-pad-container  {
      width: 95%;
      min-width: 95%;
      max-width: 95%;

       margin: 1.2em;
    }
  }

  @media (min-width: 800px) {
    #cards-of-deck-component-mobile  {
      display: none !important;
    }
  }


  @media screen and (max-width: 800px) {
    #cards-of-deck-component-pc {
      display: none;
    }

    #cards-of-deck-component-mobile  {
      display: revert;

    }

    .word-pairs-of-pad-container  {
      width: 65%;
      min-width: 65%;
      max-width: 65%;
    }

    .wrapper-around-table  {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }

  @media screen and (max-width: 600px) {
    .word-pairs-of-pad-container  {
      width: 75%;
      min-width: 75%;
      max-width: 75%;
    }

    .wrapper-around-table  {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }

  @media screen and (max-width: 500px) {
    .word-pairs-of-pad-container  {
      width: 85%;
      min-width: 85%;
      max-width: 85%;
    }


    .wrapper-around-table  {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }

  @media screen and (max-width: 400px) {
    .word-pairs-of-pad-container  {
      width: 92%;
      min-width: 92%;
      max-width: 92%;
    }


    .wrapper-around-table  {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }

  @media screen and (max-width: 1100px) {

  }

  @media screen and (max-width: 1100px) {
    .word-pairs-of-pad-container  {
      width: 60%;
    }



  }

  @media screen and (max-width: 800px) {
    .word-pairs-of-pad-container  {
      width: 70%;
    }



  }

  @media screen and (max-width: 700px) {
    #add-card-button, #practice-button  {
      margin: 0.2em;


      font-size: 1em;
    }

    #practice-button  {
      margin-right: 0 !important;;
      margin-top: 0.5em;
      margin-bottom: 0;
    }

    #add-practice-buttons-container  {
      display: flex;
      flex-direction: column;

      margin-bottom: 0;

    }
  }

  @media screen and (max-width: 600px) {
    .word-pairs-of-pad-container  {
      width: 80%;
      margin-top: 0;

    }


  }

  @media screen and (max-width: 550px) {
    .word-pairs-of-pad-container  {
      width: 90%;
    }
  }



  @media screen and (max-width: 300px) {


  }

  @media screen and (max-width: 400px) {



  }

  @media screen and (max-width: 500px) {


  }


  @media screen and (max-width: 700px) {


  }

  @media screen and (max-width: 800px) {


  }
</style>