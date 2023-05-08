<template>
  <div class="character-one">
    <div class="header-text word-1">el gato</div>
    <div class="header-text word-2">el algodón</div>
    <div class="header-text word-3">la hermana</div>

    <img src="../assets/character.png"/>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
.word-1  {
  margin-left: 1em;
}

.word-2  {
  margin-left: 3em;
}

.word-3  {
  margin-left: 2em;
}

  .character-one  {
/*
    margin-top: 12vh;
*/

    display: flex;
    flex-direction: column;
    justify-content: end;


    -webkit-animation: mover 2s infinite  alternate;
    animation: mover 2s infinite  alternate;

/*
    height: 80vh;
*/
/*
    position: fixed;
*/

  }

  @-webkit-keyframes mover {
    0% { transform: translateY(0); }
    100% { transform: translateY(-20px); }
  }
  @keyframes mover {
    0% { transform: translateY(0); }
    100% { transform: translateY(-20px); }
  }

@media screen and (max-width: 1300px) {
  .character-one {
    margin-top: 0;
  }
}
</style>