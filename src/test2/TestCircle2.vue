<template>
  <div class="circle" :style="{'margin-left': this.left,
                 'margin-top': this.top}">
    {{value}}
  </div>
</template>

<script>
export default {
name: "TestCircle2",

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
    padding: 1em;

    border: 1px solid black;

    display: flex;
    justify-content: center;
    align-items: center;

  }
</style>