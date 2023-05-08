<template>
  <div id="wrapper">
    <TestCircle4 />

    <TestCircle4 />
  </div>
</template>

<script>
import TestCircle4 from "./TestCircle4.vue";
export default {
  name: "TestPage4",
  components: {
    TestCircle4: TestCircle4,
  },
};
</script>

<style>
:root {
  --scale--ratio: 1;
}

#wrapper {
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50vh;
  width: 50vw;
}
</style>

