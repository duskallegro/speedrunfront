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
</style>