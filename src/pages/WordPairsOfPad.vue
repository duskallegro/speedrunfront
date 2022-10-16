<template>
  <div>
    Wordpairs of Pad

    <table>
      <thead>
      <tr>
        <th>#</th>

        <th>Foreign Word</th>
        <th>Translation</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(pair, index) in this.wordpairs">
        <th>{{index + 1}}</th>

        <td>{{pair.foreignWord}}</td>
        <td>{{pair.translation}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import WordPairsService from "@/services/WordPairsService";

export default {
  name: "WordPairsOfPad",

  data()  {
    return {
      wordpairs: []
    }
  },

  created()  {
    let padId = this.$route.params.padId;

    console.log("padId = " + padId);
    this.getPairsByPadId(padId).then(() =>  {
      console.log("Got pairs: " + this.wordpairs.length + "!");
    });
  },

  methods:  {
    async getPairsByPadId(padId)  {
      let pairs = await WordPairsService.getPairsByPadIdyPadId(padId);
      this.wordpairs = pairs;
      console.log(this.wordpairs);
    }
  }
}
</script>

<style scoped>

</style>