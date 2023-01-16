<template>
  <div class="practice-mode-container"
       v-on:click.stop=" this.$router.push({path: this.link, params: this.params})">
    <div class="mode-name">{{name}}</div>
    <div class="mode-description">{{description}}</div>
  </div>
</template>

<script>
export default {
name: "PracticeMode",

props:  {
  name: String,
  description: String,
  link: String,
  params: {
    type: Object,
    default: function () {
      return {};
    }
  }
}


}
</script>

<style scoped>
  .practice-mode-container  {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    align-content: center;

    background-color: var(--LIGHTER_GRAY);

      width: 20%;
     aspect-ratio: 1 / 1;
    overflow-wrap: break-word;

    padding: 0.5em;
    margin: 0.5em;


    cursor: pointer;
  }

  .practice-mode-container:hover  {
    filter: brightness(1.5);
  }

  .practice-mode-container .mode-name  {
    font-size: 1.2em;
  }

  .practice-mode-container .mode-description  {
    font-size: 0.9em;
  }
</style>