<template>
  <div>

   </div>
</template>

<script>

 export default {
  name: "TestPage",
  components: { },

   async beforeCreate() {
     await this.startGame();
   },

   methods: {
     startGame: async function () {
       console.log("start game!");
     },
   },
}
</script>

<style scoped>

</style>