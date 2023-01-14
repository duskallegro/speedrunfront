<template>
  <div class="user-pad-small">
    Pad {{name}}
  </div>
</template>

<script>
export default {
name: "UserPadSmall",

  props:  {
    name: String,
 },
}
</script>

<style scoped>

.user-pad-small  {
  background-color: var(--LIGHTER_GRAY);
  margin: 1em;
  padding: 1em;
}

</style>