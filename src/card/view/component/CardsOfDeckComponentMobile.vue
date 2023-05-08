<template>
  <div id="cards-of-deck-component-mobile">

    <div v-for="(card, index) in this.cards"
          class="card-in-table-container-mobile"
          v-on:click.stop="this.actions[index](index)"
    >
      <div class="highlighted-second bold index-header">{{index + 1}}</div>

      <div>{{card.foreignWord}}</div>
      <div class="highlighted-first">{{card.translation}}</div>

      <div class="progress-container">
        Progress <span class="highlighted-second bold">{{card.progressString}}</span></div>

      <div class="edit-delete-container-mobile">
        <div  v-if="this.canEdit()" v-on:click.stop="this.editAction(index)">🖊</div>
        <div  v-if="this.canEdit()" v-on:click.stop="this.deleteAction(index)">❌</div>
      </div>
    </div>

  </div>
</template>

<script>
import AuthService from "@/app/services/AuthService";

export default {
name: "CardsOfDeckComponentMobile",

props:  {
  cards: [],
  actions: [],
  editAction: Function,
  deleteAction: Function
},

methods:  {
  canEdit()  {
    return AuthService.isLoggedInUser(this.$route.params.username);
  },
}
}
</script>

<style scoped>
  #cards-of-deck-component-mobile  {
    margin-top: 2em;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

     width: 100%;

  }

  .card-in-table-container-mobile  {
    cursor: pointer;
    background-color: var(--CARD_PAIR_MATCH_TRANSLATION_BACKGROUND);

    border: 3px solid var(--TERTIARY_MAIN);
    border-bottom: 5px solid #a16a12;
    border-left: 3px solid #cf8817;

    border-radius: 1em;

    padding: 1em;
    padding-top: 0.5em;

    width: 100%;

    margin-bottom: 1.5em;
  }

  .index-header  {
    margin-bottom: 0.5em;
  }

  .progress-container  {
    margin-top: 1em;
    color: var(--DARKER_LIGHT_FONT_COLOR);
  }

  .edit-delete-container-mobile  {
    margin-top: 1em;

    width: 60%;
    margin-left: 20%;

    display: flex;
    justify-content: space-between;
  }
</style>