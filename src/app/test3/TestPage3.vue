<template>
  <div id="wrapper">
    <TestCircle3 />

    <TestCircle3 />
  </div>
</template>

<script>
import TestCircle3 from "./TestCircle3.vue";
export default {
  name: "TestPage3",
  components: {
    TestCircle3: TestCircle3,
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

