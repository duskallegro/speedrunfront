<template>
  <div class="card-full-container" v-on:click="flip">
    <div class="card-full-main">
          <div class="card-front" v-if="this.isHidden">

            <div v-if="this.mode === 'translation'">
              <span>{{foreignWord}}</span>
            </div>

            <div v-if="this.mode !== 'translation'">
              <span class="translation">{{translation}}</span>
            </div>
          </div>

          <div class="card-back" v-if="!this.isHidden">

<!--  start           -->

            <div class="card-full-outside">
              <div class="card-full-main-outside">
                <div class="card-full-foreign-outside">
                  {{this.foreignWord}}
                </div>

                <div class="card-full-translation-outside">
                  {{this.translation}}
                </div>
              </div>

              <div class="card-full-extra-outside"
                   v-if="this.examples !== undefined &&
         this.examples.length > 0">
                <div class="card-full-examples">
                  <div class="card-full-extra-title">Examples</div>

                  <div v-for="(example, i) in this.examples" class="example-container">
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

<!--            end -->

          </div>
    </div>

  </div>
</template>

<script>
import CardFullComponent from "@/card/view/component/CardFullComponent";
export default {
name: "CardGuessComponent",
  components: {CardFullComponent},
  props:  {

  foreignWord: String,
  translation: String,
  examples: [],

  images: [],
  notes: [],
  progress: Number,
  mode: {
    type: String,
    default: ''
  }
},

data() {
  return {
    isHidden: true
  }
},

methods:  {
  flip() {
    console.log("flipped!");

    // don't close an opened card
    if (!this.isHidden) {
      return;
    }


    this.isHidden = !this.isHidden;

    if (this.isHidden === true) {
      console.log("emit cardClosed");
      this.$emit('cardClosed');
    } else  {
      console.log("emit cardOpened");
      this.$emit('cardOpened');
    }
  },

  close()  {
    this.isHidden = true;
  },

  open()  {
    this.isHidden = false;
  },

}


}
</script>

<style scoped>
  .card-full  {
 /*   background-color: red;*/
  }

  .card-full-container  {


      display: flex;
      justify-content: center;
      align-items: center;


    background-color: var(--CARD_BACKGROUND);
    color: var(--BRIGHT_LIGHT_FONT_COLOR);
    font-size: 1.2em;

    padding: 0em;



    cursor: pointer;

    min-width: 100% !important;
    width: 100% !important;

    min-height: 100%;
     height: 100%;
  }

  .card-full-container:hover  {
/*
    filter: brightness(0.9);
*/

  }


  .card-front, .card-back  {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;

    padding: 1em;
  }

  .card-front  {
    padding: 2em;
  }

  .translation  {
    font-style: italic;
    color: var(--TERTIARY_MAIN);
  }

  .card-back  {

    min-width: 100%;
    width: 100%;

/*
    background-color: yellow;
*/
  }

  .card-full-main  {

    min-width: 100%;
    width: 100%;

    margin: 0;
    padding: 0;
/*
    background-color: green;
*/
  }


  /* Card full back */


  .card-full-outside  {
    background-color: var(--CARD_BACKGROUND);
/*
    background-color: red;
*/


    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;

    cursor: pointer;

    min-width: 100% !important;
    width: 100% !important;

    margin: 0 !important;
    padding: 0 !important;
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
    margin-bottom: 0;
  }

  .card-full-extra-title  {
    color: var(--CARD_EXAMPLE_HEADER_COLOR);
    font-weight: bold;
  }

  .card-full-example-translation  {
    color: orange;
  }

  .example-container  {
    margin-bottom: 1em;
  }
</style>