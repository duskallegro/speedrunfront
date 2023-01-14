<template>
  <div>
2
    <input v-for="(i, index) in parseInt(this.k)"
      type="text"
      :value="i"
    >

  </div>

</template>

<script>
import { ref } from 'vue';
import { onErrorCaptured } from 'vue';

export default {

  name: "TestComponent",



  props:  {
    k: Number
  }
}
</script>

<style scoped>

</style>