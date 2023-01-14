<template>
  <div class="user-page">

    <div class="header-text">
        {{username}}
    </div>

    <div id="user-info">
      <div >Username: <span class="highlighted">{{username}}</span></div>
      <div>DiscordTag: <span class="highlighted">{{discordTag}}</span></div>
      <div>Discord ID: <span class="highlighted">{{discordId}}</span></div>
    </div>

    <div id="user-buttons">
      <NavbarButton text="Add Pad" link="add-pad"/>
    </div>

    <div id="user-pads-container" v-if="isLoaded">
      <AppTable :table-title="'Decks of ' + this.username" :header="this.headers" :rows="this.rows" :row-classes="this.rowClasses"
            :cell-actions="this.cellActions"
              :row-actions="this.rowActions"
              :header-actions="this.headerActions"/>
    </div>

    <div v-if="!isLoaded">
      <AppSpinner/>
    </div>

  </div>
</template>

<script>
import UserService from "@/services/UserService";
import WordPadService from "@/services/WordPadService";
import UserPadSmall from "@/components/users/UserPadSmall";
import NavbarButton from "@/components/NavbarButton";
import LanguageService from "@/services/LanguageService";
import WordPairsService from "@/services/WordPairsService";
import AppTable from "@/components/AppTable";
import AppSpinner from "@/components/AppSpinner";

export default {
  name: "UserPage",
  components: {AppTable, NavbarButton, UserPadSmall, LanguageService,WordPairsService, AppSpinner},
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
          this.rows.push([i + 1, pad.name, pad.foreignLang, pad.translationLang,
            pad.count, progressString]);
          this.rowClasses.push(["", "", "capitalize", "capitalize", "", "bright-blue bold"]);

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
      async viewPadAction(rowIndex)  {
        let pad = this.pads[rowIndex];

        this.$router
            .push({ path: "/user/" +  this.$route.params.username + "/pad/" + pad.padId})
            .then(() => { this.$router.go() })
      },

      async getUserWordpads()  {
        let username = this.$route.params.username;
        console.log("username: " + username);

        let user = await UserService.getUserByUsername(username);

        this.discordId = user.discordId;
        this.discordTag = user.discordTag;

        let pads = await WordPadService.getPadsByUsername(user.username);

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
  display: grid;
  grid-template-columns: auto auto auto auto;

  grid-column-gap: 3em;
  grid-row-gap: 3em;
  overflow: auto;

  max-width: 90%;
  min-width: 90% !important;
}

#user-buttons  {
  display: flex;
  margin: 2em;
}


</style>