<template>
  <div id="footer">Footer</div>
</template>

<script>
export default {
name: "FooterComponent"
}
</script>

<style scoped>

  #footer  {
    bottom: 0;
   /* flex-shrink: 0;*/

    background-color: var(--FOOTER_BACKGROUND);
    width: 100%;

     min-height: 10%;
    height: 10%;

    padding: 1em;

    display: flex;
    justify-content: start;
    align-items: start;

    margin-top: 5em;
  }

</style>