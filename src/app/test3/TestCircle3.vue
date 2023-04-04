<template>
  <div class="circle"></div>
</template>

<script>
export default {
name: "TestCircle3"
}
</script>

<style scoped>

.circle  {
  background-color:red;
  width: 50px;
  height: 50px;

  border-radius: 20em;

  transform: scale(var(--scale--ratio)) translate(0%, 0%);
  transform-origin: 0% 0%;
  transition: transform .9s;

  margin: 1em;
}

.circle:hover  {
  cursor: pointer;

  background-color: green;
  --scale--ratio: 1.2;

}
</style>