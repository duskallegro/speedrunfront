<template>
  <div class="word-pairs-of-pad-container">
    <NavbarButton id="add-card-button" text="Add Card"
                  :link="this.$route.fullPath.substring(1) + '/add-pair'"
                  :elements="[this.$route.params.padId]"/>
    <NavbarButton id="practice" text="Practice" class="bright-blue"
                  :link="this.$route.fullPath.substring(1) + '/practice'"
                  :elements="[this.$route.params.padId]"/>

    <div v-if="isLoaded">
      <AppTable class="pairs-table" :table-title= "'header of ' + this.padName + ' table'"
                :header="['#', 'Foreign Word', 'Translation', 'Progress', 'Edit', 'Delete']"
                :rows="this.rows" :row-classes="rowClasses"
                :row-actions="this.rowActions"
                :cell-actions="this.cellActions"
      />
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

export default {
  name: "CardsOfDeckPage",
  components: {AppSpinner, NavbarButton, AppTable},
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
        this.rows.push([i + 1, pair.foreignWord, pair.translation,  progressString, '🖊️️', '❌']);

        this.rowClasses.push(["", "", "", "bright-blue-text bold", "", ""]);
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
  .word-pairs-of-pad-container  {
    margin: 2em;
   }

  #add-card-button  {
    margin-top: 2em !important;

  }

  .pairs-table  {
    margin-top: 2em;
  }
</style>