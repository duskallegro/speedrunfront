<template>
  <div class="spinner">
    <div class="any">
      <div class="gif-container">
        <img src="../../assets/rocket.gif"/>
    </div>
    </div>
  </div>
</template>

<script>
export default {
name: "AppSpinner"
}
</script>

<style scoped>
.gif-container  {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
}

.gif-container img {
  width: 40%;
  clip-path: circle(15vw at 50%);
  -webkit-clip-path: circle(15vw at 50%);
}

div.any {

  background-color: #1d3242;/*#08615e*/;
  position:fixed;
  width:100%;
  height:100%;
  top:0px;
  left:0px;
  z-index:1000;

  text-align: center;
}

  /*.spinner  {
    position: absolute !important;
    top:0;
    left:0;

    margin:0;

    width: 100% !important;
    height: 100% !important;
    background-color: red;

    overflow: hidden;
    object-fit: fill;

  }*/

@media screen and (max-width: 600px) {
  .gif-container img  {
    width: 100% !important;

    clip-path: circle(35vw at 50%);
    -webkit-clip-path: circle(35vw at 50%);
  }

}

@media screen and (max-width: 800px) {
  .gif-container img  {
    width: 80% !important;

    clip-path: circle(25vw at 50%);
    -webkit-clip-path: circle(25vw at 50%);
  }

}
</style>