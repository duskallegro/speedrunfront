<template>
  <div class="circle" :style="{left: this.left,
                 top: this.top}">
    {{value}}
  </div>
</template>

<script>
export default {
name: "TestCircle",

props:  {
  value: String,
  left: Number,
  top: Number
}
}
</script>

<style scoped>
  .circle  {
    background-color: red;

    min-height: 49px;
    height: 49px;

    min-width: 49px;
    width: 49px;

    border-radius: 20em;
    display: inline;
    padding: 1em;
    position: absolute;

    border: 1px solid black;

  }
</style>