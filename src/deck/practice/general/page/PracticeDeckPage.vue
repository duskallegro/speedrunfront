<template>
  <div class="practice-page-container">

    <div class="practice-modes-container">
      <PracticeMode name="Guess and Rate"
                    :link="'/' + this.$route.fullPath.substring(1) + '/select-guess-mode'"
                    description="Try to remember and then rate the question by difficulty"/>
<!--      <PracticeMode name="Multiple Choice"
                    :link="'/' + this.$route.fullPath.substring(1) + '/choices'"
                    description="Find the correct answer among several options"/>-->

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

@media screen and (max-width: 800px) {

  .practice-page-container  {
     width: 92%;
  }

  .practice-modes-container  {
     width: 100%;
  }

  .practice-mode-container  {
      width: 30%;
  }
}


@media screen and (max-width: 600px) {

  .practice-page-container  {
     width: 92%;
  }

  .practice-modes-container  {

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    width: 100%;
  }

  .practice-mode-container  {
    width: 50%;
  }
}


@media screen and (max-width: 400px) {
  .practice-mode-container  {
    width: 60%;
  }
}

@media screen and (max-width: 350px) {
  .practice-mode-container  {
    width: 70%;
  }
}

@media screen and (max-width: 280px) {
  .practice-mode-container  {
    width: 90%;
  }
}

@media screen and (max-width: 220px) {
  .practice-mode-container  {
    width: 92%;
    font-size: smaller;
  }
}
</style>