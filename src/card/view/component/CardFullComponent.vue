<template>
  <div class="card-full-outside">
    <div class="card-full-main-outside">
      <div class="card-full-foreign-outside">
        {{this.card.foreignWord}}
      </div>

      <div class="card-full-translation-outside">
        {{this.card.translation}}
      </div>
    </div>

    <div class="card-full-extra-outside"
         v-if="this.card.examples !== undefined &&
         this.card.examples.length > 0">
      <div class="card-full-examples">
        <div class="card-full-extra-title">Examples</div>

        <div v-for="(example, i) in this.card.examples" class="example-container">
          <div class="card-full-example-example">
            {{example.example}}
          </div>

          <div class="card-full-example-translation">
            {{example.translation}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
name: "CardFullComponent",

props: {
  card: Object
},

data()  {
    return {

    }
}
}
</script>

<style scoped>


  .card-full-outside  {
    border-radius: 1em;

    background-color: var(--CARD_BACKGROUND);
/*
    background: linear-gradient(45deg, rgba(36,64,90,1) 33%, rgba(51,91,128,1) 89%, rgba(65,116,164,1) 100%);
*/
/*
    background-color: var(--CARD_PAIR_MATCH_TRANSLATION_BACKGROUND);
*/

    padding: 2em;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;

    cursor: pointer;

    min-width: 50%;

    border: 3px solid var(--TERTIARY_MAIN);
    border-bottom: 5px solid #a16a12;
    border-left: 3px solid #cf8817;

    box-shadow: 0px 0px 3px 3px #070d13;

  }

  .card-full-translation-outside  {
    color: orange;
  }

  .card-full-main-outside  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

/*
    background-color: red;
*/

    width: 100%;
    min-width: 100%;

    font-size: 1.5em;
  }

  .card-full-extra-outside  {
    margin-top: 1em;
  }

  .card-full-extra-title  {
    color: var(--TITLE_COLOR_ONE);
    font-weight: bold;
  }

  .card-full-example-translation  {
    color: orange;
  }

  .example-container  {
    margin-bottom: 1em;
  }

  /* Media */



</style>