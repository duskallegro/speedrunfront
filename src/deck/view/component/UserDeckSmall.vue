<template>
  <div class="user-pad-small">
    Pad {{name}}
  </div>
</template>

<script>
export default {
name: "UserDeckSmall",

  props:  {
    name: String,
 },
}
</script>

<style scoped>

.user-pad-small  {
  background-color: var(--PRIMARY_DARK_MEDIUM);
  margin: 1em;
  padding: 1em;
}

</style>