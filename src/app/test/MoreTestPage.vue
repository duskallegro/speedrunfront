<template>
  <div>
    <MoreTestComponent :stuff="this.wow"/>

    <div id="click-me" v-on:click.stop="this.click">
      Click Me
    </div>
  </div>
</template>

<script>
import MoreTestComponent from "@/app/test/MoreTestComponent";
export default {
name: "MoreTestPage",
  components: {MoreTestComponent},

  data()  {
    return  {
      wow: {
        secret: 7
      }
    }
  },

  methods:  {
    click()  {
      console.log("Clicked!");
      this.wow.extra = 5;
    }
  }
}
</script>

<style scoped>
  #click-me  {
    padding: 1em;
    background-color: green;
    margin-top: 1em;
    cursor: pointer;
  }
</style>