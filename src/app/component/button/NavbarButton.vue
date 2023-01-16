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
    background-color: var(--GREEN);

    border-radius: 0.1em;
    padding: 0.5em;
    padding-left: 1em;
    padding-right: 1em;

    font-weight: bold;

    margin-left: 1em;

    color: var(--LIGHT_FONT_COLOR);
  }

  .navbar-button:hover  {
    cursor: pointer;
    filter: brightness(1.2);
   }

  .navbar-button.blue  {
    background-color: var(--LIGHTER_BLUE_GRAY);
  }

  .navbar-button.dim-blue  {
    background-color: var(--REAL_DIM_BLUE);
  }

    @media screen and (max-width: 1300px) {
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
  }
</style>