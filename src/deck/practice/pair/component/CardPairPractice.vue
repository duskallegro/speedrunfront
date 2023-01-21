<template>
  <div v-on:click="cardClicked"
      :class="'card-pair-practice ' +
          (this.isForeign ? ' foreign' : ' translation')"
      :style="filterStyle"
  >
    {{this.isForeign ? this.card.foreignWord : this.card.translation}}
  </div>
</template>

<script>
export default {
name: "CardPairPractice",

created() {


},

computed:  {
  filterStyle()  {
    if (this.isHidden)  {
      return  {
        display: 'none'
      }
    }

    if (this.isGuessed)  {
      return  {
      'transition-delay': '0.5s',

        'transition-property': 'background-color',
        background: 'green',
        border: '2px solid green',
      }
    }

    if (this.isInvalid && this.isSelected)  {
      return  {
        border: '2px solid red'
      }
    }

    if (this.isSelected)  {
      return  {
        border: '2px solid yellow'
      }
    }

    return '';
  }
},

props:  {
  index: Number,

  isForeign: {
    type: Boolean,
    default: true
  },

  card: Object,

  isGuessed: {
    type: Boolean,
    default: false
  },

  isSelected: {
    type: Boolean,
    default: false
  },

  isInvalid: {
    type: Boolean,
    default: false
  },

  isHidden: {
    type: Boolean,
    default: false
  }
},


data() {
  return {

  }
},

methods:  {
  cardClicked()  {
   // this.isSelected = !this.isSelected;
    this.$emit('cardClicked', this.index);
  }
}
}
</script>

<style scoped>
  .card-pair-practice {
    font-size: 1.2em;

    margin: 0.5em;

    background-color: var(--BRIGHT_GRAY);

    padding: 0.5em;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 2px solid transparent;
   }

  .translation  {
    filter: brightness(1.5);
  }



  /* Media */


  @media screen and (max-width: 1300px) {
     .card-pair-practice  {

     }
  }

  @media screen and (max-width: 600px) {
    .card-pair-practice  {

    }
  }


  @media screen and (max-width: 400px) {
    .card-pair-practice  {
      /*   background-color: red;*/
      font-size: 0.8em !important;


      margin: 0.5em !important;
      padding: 0em !important;

    }
  }


  @media screen and (max-width: 300px) {
    .card-pair-practice  {
   /*   background-color: red;*/
      font-size: 0.7em !important;


      margin: 0.4em !important;
      padding: 0em !important;

    }

  }
</style>