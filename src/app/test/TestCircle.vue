<template>
  <div class="circle">
    <span>{{ value }}</span>
  </div>
</template>

<style>
.circle {
  background-color: var(--circle-background-color);

  border-radius: 20em;
}
</style>

<script>
export default {
  name: "TestCircle",

  props: {
    value: String,
  },

  data() {
    return {};
  },
};
</script>