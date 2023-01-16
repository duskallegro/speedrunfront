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
            <span>{{foreignWord}}</span>
            <span class="translation">{{translation}}</span>
          </div>
    </div>

    <div class="card-full-examples">

    </div>

    <div class="card-full-notes">

    </div>
  </div>
</template>

<script>
export default {
name: "CardGuessComponent",

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


  .card-full-container  {


      display: flex;
      justify-content: center;
      align-items: center;


    background-color: var(--BRIGHT_GRAY);
    color: var(--BRIGHT_LIGHT_FONT_COLOR);
    font-size: 1.2em;

    padding: 2em;



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
  }

  .translation  {
    font-style: italic;
    color: var(--YELLOW);
  }
</style>