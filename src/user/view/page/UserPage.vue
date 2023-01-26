<template>
  <div class="user-page">

    <div class="header-text">
        {{username}}
    </div>

<!--    <div id="user-info">
      <div >Username: <span class="highlighted-first">{{username}}</span></div>
      <div>DiscordTag: <span class="highlighted-first">{{discordTag}}</span></div>
      <div>Discord ID: <span class="highlighted-first">{{discordId}}</span></div>
    </div>-->

    <div id="user-buttons" v-if="this.canDisplayAddButton()">
      <NavbarButton text="Add Deck" link="add-deck"/>
    </div>

    <div id="user-pads-container" v-if="isLoaded">
      <AppTable :table-title="'Decks of ' + this.username" :header="this.headers" :rows="this.rows" :row-classes="this.rowClasses"
            :cell-actions="this.cellActions"
              :row-actions="this.rowActions"
              :header-actions="this.headerActions"/>
    </div>

    <DecksOfUserMobile :decks="this.pads" :actions="this.rowActions" v-if="isLoaded"/>

    <div v-if="!isLoaded">
      <AppSpinner/>
    </div>

  </div>
</template>

<script>
import UserService from "@/app/services/UserService";
import DeckService from "@/app/services/DeckService";
import UserDeckSmall from "@/deck/view/component/UserDeckSmall";
import NavbarButton from "@/app/component/button/NavbarButton";
import LanguageService from "@/app/services/LanguageService";
import CardService from "@/app/services/CardService";
import AppTable from "@/app/component/table/AppTable";
import AppSpinner from "@/app/component/spinner/AppSpinner";
import DecksOfUserMobile from "@/user/view/component/DecksOfUserMobile";
import AuthService from "@/app/services/AuthService";

export default {
  name: "UserPage",
  components: {DecksOfUserMobile, AppTable, NavbarButton, UserDeckSmall, LanguageService,CardService, AppSpinner},
  props:  {
      username: String,
    },

    data()  {
      return  {
        pads: [],
        discordId: String,
        discordTag: String,

        headers: [],
        rows: [],

        rowClasses: [],

        cellActions: [],

        rowActions: [],

        headerActions: [],

        isLoaded: false
      }
    },

    async created()  {
      try {
        await this.getUserWordpads();
        console.log("Got pads: " + this.pads.length + "!");
        if (this.pads.length === 0)  {
          this.isLoaded = true;
          return;
        }

        this.headers = ["#", "Name", "Foreign Language", "Translation Language",
          "Number of Words", "Progress"];
        this.headerActions = this.headers.map(() => this.viewPadAction);

        for (let i = 0; i < this.pads.length; i++) {
          let pad = this.pads[i];

          let progressString = new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 2
          }).format(100 * pad.progress) + "%";
          this.pads[i].progressString = progressString;

          this.rows.push([i + 1, pad.name, pad.foreignLang, pad.translationLang,
            pad.count, progressString]);
          this.rowClasses.push(["", "", "capitalize", "capitalize", "", "very-bright-blue-text bold"]);

          this.cellActions.push([this.viewPadAction, this.viewPadAction, this.viewPadAction,
            this.viewPadAction, this.viewPadAction, this.viewPadAction]);

          this.rowActions.push(this.viewPadAction);
        }

      /*  setTimeout(() => {
          this.isLoaded = true;
        }, 1200);*/
        this.isLoaded = true;
      } catch (e)  {
        console.log(e);
        this.isLoaded = true;
      }
    },

    methods:  {
      canDisplayAddButton()  {
        return AuthService.canAddDeck(this.$route.params.username);
      },

      async viewPadAction(rowIndex)  {
        let pad = this.pads[rowIndex];

        this.$router
            .push({ path: "/user/" +  this.$route.params.username + "/deck/" + pad.padId})
            .then(() => { this.$router.go() })
      },

      async getUserWordpads()  {
        let username = this.$route.params.username;
        console.log("username: " + username);

        let user = await UserService.getUserByUsername(username);

        this.discordId = user.discordId;
        this.discordTag = user.discordTag;

        let pads = await DeckService.getPadsByUsername(user.username);

        console.log(pads);

        this.pads = pads;
      },

      talk(s)  {
        let r =  "Hello, " + s + "!";
        console.log(r);
        return r;
      }
    }


}

</script>

<style scoped>




.user-page  {
  display: flex;

  flex-direction: column;
  justify-content: start;
  align-items: center;
  align-content: center;

  width: 80%;
 }

#user-info  {
  display: flex;
  flex-direction: column;

  justify-content: start;
  align-items: center;

  font-weight: bold;
  margin: 2em;
}

#user-pads-container  {
  /*display: grid;
  grid-template-columns: auto auto auto auto;

  grid-column-gap: 3em;
  grid-row-gap: 3em;
  overflow: auto;*/

  max-width: 100%;
  min-width:  100% !important;

 }

#user-buttons  {
  display: flex;
  margin: 2em;
}


/* Mobile decks */

@media (min-width: 1100px) {
  #decks-of-user-mobile-container  {
    display: none;
  }
}


@media screen and (max-width: 1100px) {
  #user-pads-container {
    display: none;
  }

  #decks-of-user-mobile-container  {
    display: revert;
    width: 60%;
  }

  .user-page  {
    width: 90%;
  }
}


@media screen and (max-width: 300px) {

  #decks-of-user-mobile-container  {
    width: 70%;
  }

  .user-page  {
    width: 95%;
  }
}

@media screen and (max-width: 400px) {

  .user-page  {
    width: 100%;
  }



}

@media screen and (max-width: 500px) {


  #decks-of-user-mobile-container  {
    width: 85%;
  }
}

@media screen and (max-width: 600px) {


  #decks-of-user-mobile-container  {
    width: 85%;
  }
}

@media screen and (max-width: 700px) {

  #decks-of-user-mobile-container  {
    width: 85%;
  }

  .user-page  {
    width: 95%;
  }
}

@media screen and (max-width: 800px) {

  #decks-of-user-mobile-container  {
    width: 85%;
  }

  .user-page  {
    width: 95%;
  }
}

</style>