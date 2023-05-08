<template>
  <div id="test-page">
    <TestComponent2/>
   </div>
</template>

<script>

 import TestComponent2 from "./TestComponent2";
 export default {
  name: "TestPage2",
  components: {TestComponent2 },

   async beforeCreate() {

   },

   methods: {

   },
}
</script>

<style scoped>
  #test-page  {
    background-color: yellow;
    width: 80%;

    display: flex;
    justify-content: center;
  }
</style>