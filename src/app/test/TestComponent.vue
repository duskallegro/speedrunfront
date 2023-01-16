<template>
  <div class="test-container" v-if="!isHidden"
        v-on:click="this.flip">
    {{this.text}}
  </div>
</template>

<script>
export default {
  name: "TestComponent",

  data() {
    return {
      text: "abc",
      isHidden: false
    }
  },

  methods:  {
    flip()  {
      this.isHidden = !this.isHidden;

      if (this.isHidden)  {
        this.$emit("hidden");
      } else  {
        this.$emit("revealed");
      }
    }
  }
}
</script>

<style scoped>

.test-container  {
  padding: 2em;

  background-color: #2EAC68;
}

</style>