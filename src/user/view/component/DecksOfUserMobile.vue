<template>
  <div id="decks-of-user-mobile-container">

    <div class="deck-mobile-container"
          v-for="(deck, index) in this.decks"
          v-on:click.stop="this.actions[index](index)">
        <div class="highlighted-second bold deck-index-corner">{{index + 1}}</div>

        <div class="highlighted-first">{{deck.name}}</div>
        <div class="capitalize">{{deck.foreignLang}}
          <span class="highlighted-second">-></span>
          {{deck.translationLang}}</div>

      <div><span class="highlighted-first">{{deck.count}}</span> words</div>
      <div>Progress <span class="very-bright-blue-text bold">{{deck.progressString}}</span></div>
      </div>

  </div>
</template>

<script>
export default {
name: "DecksOfUserMobile",

props:  {
  decks: [],
  actions: []
}
}
</script>

<style scoped>
  #decks-of-user-mobile-container  {
   /* background-color: red;*/
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  .deck-mobile-container  {

    cursor: pointer;
    padding: 1em;
    padding-top: 0.5em;

    margin: 1.5em;
    margin-top: 0;

    background-color: var(--CARD_BACKGROUND);

    border: 3px solid var(--SECONDARY_MAIN);
    border-bottom: 5px solid #1b653d;
    border-left: 3px solid #20794a;

    box-shadow: 0px 0px 3px 3px #070d13;

    border-radius: 1em;
  }

  /* Styling */

  .deck-mobile-header  {
    font-weight: bold;
    font-size: 1.2em;
    color: var(--TERTIARY_MAIN);
  }

  .deck-index-corner  {
     margin-bottom: 0.5em;
  }

  /* Responsiveness */

  @media screen and (max-width: 400px) {
    .deck-mobile-container {
      margin: 0;
      margin-bottom: 1em;
    }

    #decks-of-user-mobile-container  {
      width: 92% !important;

      padding: 0 ;
    }

  }
</style>