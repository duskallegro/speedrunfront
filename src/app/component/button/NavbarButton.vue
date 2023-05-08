<template>
  <a :class="'navbar-button ' + this.color"  :href="'/' + this.link"
      v-on:click.stop="myClickEvent">
    {{ emoji  + " " + text }}
  </a>
</template>

<script>
export default {
  name: "NavbarButton",

  props:  {
    text: String,
    link: String,
    color: String,
    emoji: {
      type: String,
      default: ""
    },

    elements:  {
      type: Array,
      default: () => []
    }
  },
  methods:  {
    myClickEvent()  {
      this.$root.$emit('navbar-button-clicked', this.text);
      this.$router.push({path: this.getTo, params: {data: this.data}})
    }
  },
  created() {


  },

  computed:  {
    getTo: function()  {
      console.log("text: " + this.text);
      console.log("link: " + this.link);
      return "/" + this.link;
    }
  }
}
</script>

<style scoped>
  .navbar-button  {
    background-color: var(--BUTTON_BACKGROUND_FIRST);

    border-radius: 1.2em;
    padding: 0.5em;
    padding-left: 1em;
    padding-right: 1em;

    font-weight: bold;

    margin-left: 1em;

    color: var(--TERTIARY_FONT);
    color: #c3efd7;

    font-size: 1.5em;

    text-align: center;
  }

  .navbar-button:hover  {
    cursor: pointer;
    filter: brightness(1.2);
   }
/*

  .navbar-button.blue  {
    background-color: var(--LIGHTER_BLUE_GRAY); // it's the selected table row background
  }

  .navbar-button.dim-blue  {
    background-color: var(--REAL_DIM_BLUE);#315d89
  }
*/

  /*  @media screen and (max-width: 1300px) {
      .navbar-button  {
        padding: 0.5em;
        margin: 0.5em !important;

      }
  }

  @media screen and (max-width: 400px) {
    .navbar-button {
      padding: 0.2em;
      margin: 0.5em !important;

      font-size: 1.5em !important;
    }
  }

  @media screen and (max-width: 200px) {
    .navbar-button {
      padding: 0.2em;
      margin: 0.5em !important;

      font-size: 1em !important;
    }
  }*/
</style>