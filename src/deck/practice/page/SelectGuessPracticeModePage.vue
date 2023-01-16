<template>
  <div class="select-outer-container">
    <div class="header-text">
      Select Practice Mode
    </div>

    <div class="select-inner-container">
      <PracticeMode name="Guess Translation"
                    :link="this.getLinkText() + '/guess-and-rate/translation'"
                    description="Try to remember and then rate the question by difficulty"/>

      <PracticeMode name="Guess Foreign Words"
                    :link="this.getLinkText() +'/guess-and-rate/foreign'"
                    description="Try to remember and then rate the question by difficulty"/>

      <PracticeMode name="Guess Both"
                    :link="this.getLinkText() +'/guess-and-rate/both'"

                    description="Try to remember and then rate the question by difficulty"/>
   </div>
  </div>
</template>

<script>
import PracticeMode from "@/deck/practice/component/PracticeMode";
import AuthService from "@/app/services/AuthService";

export default {
name: "SelectGuessPracticeMode",
  components: {PracticeMode},

  props:  {
    padId: Number,
    loggedInUsername: String
  },


  methods:  {
    getLinkText()  {
      let link = '/user/' + this.loggedInUsername +
          "/deck/" + this.padId + "/practice";
      console.log("link = " + link);
      return link;
    }
  }


}
</script>

<style scoped>
.select-outer-container  {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  align-items: center;


}

.select-inner-container  {
  display: flex;

  justify-content: center;
}
</style>