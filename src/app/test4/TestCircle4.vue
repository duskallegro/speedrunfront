<template>
  <div class="circle"></div>
</template>

<script>
export default {
  name: "TestCircle4"
}
</script>

<style scoped>
:root {
  --scale--ratio4: 1;
}


.circle  {
  background-color:red;
  width: 50px;
  height: 50px;

  border-radius: 20em;
  margin: 1em;

  /* set default scale */
  scale: var(--scale--ratio4);
  /* enable scale animation */
  transition: scale 1.1s;
  -webkit-animation: moves 1.1s infinite alternate;
  animation: moves 1.1s infinite alternate;
}

.circle:hover  {
  cursor: pointer;

  background-color: green;
  --scale--ratio4: 1.2;

}

@keyframes moves {
  0% {
    translate: 0;
  }
  100% {
    translate: 0 -8px;
  }
}

</style>