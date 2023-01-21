<template>
  <div class="practice-page-container">


    <div class="practice-modes-container">
      <PracticeMode name="Guess and Rate"
                    :link="'/' + this.$route.fullPath.substring(1) + '/select-guess-mode'"
                    description="Try to remember and then rate the question by difficulty"/>
      <PracticeMode name="Multiple Choice"
                    :link="'/' + this.$route.fullPath.substring(1) + '/choices'"
                    description="Find the correct answer among several options"/>

      <PracticeMode name="Find Pairs"
                    :link="'/' + this.$route.fullPath.substring(1) + '/pair'"
                    description="Find the correct pairs"/>
    </div>
  </div>
</template>

<script>
import PracticeMode from "@/deck/practice/general/component/PracticeMode";
export default {
name: "PracticeDeckPage",
  components: {PracticeMode}
}
</script>

<style scoped>

.practice-page-container  {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-content: center;
    align-items: center;


}

.practice-modes-container  {
  display: flex;

  justify-content: center;
}
</style>