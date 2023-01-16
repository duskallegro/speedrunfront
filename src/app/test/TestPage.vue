<template>
  <div v-on:hidden="hiddenEvent">

    <TestComponent v-on:hidden="hiddenEvent"></TestComponent>
  </div>
</template>

<script>

import TestComponent from "@/app/test/TestComponent";
export default {
  name: "TestPage",
  components: {TestComponent},


  methods:  {
    hiddenEvent()  {
      console.log("hiddenEvent");
    }
  }
}
</script>

<style scoped>

</style>