<template>
  <div :class="'button ' + this.color"
     v-on:click.stop="action">
    {{ emoji + " " + text }}
  </div>
</template>

<script>
export default {
name: "AppButton",

props:  {
  text: String,
  action: Function,
  color: String,

  emoji:  {
    type: String,
    default: ""
  },

  data:  {
    type: Array,
    default: () => []
  }
},
}
</script>

<style scoped>
.button  {
  background-color: var(--BUTTON_BACKGROUND_SECOND);

  border-radius: 1.2em;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;

  font-weight: bold;

  margin-left: 1em;

   color: var(--TERTIARY_FONT);
  font-size: 1.5em;

}

.button:hover  {
  cursor: pointer;
  filter: brightness(1.5);
}


/*
.button.blue  {
  background-color: var(--LIGHTER_BLUE_GRAY); // = selected table row background
}

.button.dim-blue  {
  background-color: var(--REAL_DIM_BLUE);#315d89
}*/
</style>