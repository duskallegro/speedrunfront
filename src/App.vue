<template>

    <NavbarComponent/>

    <div v-cloak id="content-component">
<!--      <router-link :to="{ name: 'HomePage' }">Home</router-link>-->
      <router-view  :key="$route.fullPath" />

    </div>

<!--
    <FooterComponent/>
-->


</template>

<script>
import HelloWorld from './app/component/HelloWorld.vue'
import HomePage from './app/page/HomePage.vue'
import NavbarComponent from "@/app/component/structure/navbar/NavbarComponent";
import FooterComponent from "@/app/component/structure/footer/FooterComponent";

export default {
  name: 'App',
  components: {
    FooterComponent,
    NavbarComponent,
    HelloWorld, HomePage
  }
}
</script>

<style>
@import 'app/assets/main.css';
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&family=Josefin+Sans:wght@400;500&family=Moon+Dance&family=Overpass&family=Roboto:wght@300&family=Rubik:wght@300&family=Signika&display=swap');


div, a, input, textarea, button, select  {
  -webkit-tap-highlight-color: transparent;

}

[v-cloak] {
  display: none;
}

body {
  font-family: 'Josefin Sans', sans-serif;
  height: 100%;
  /*  background-color:  yellow;

    display: flex;
    min-height: 100vh;
    flex-direction: column;
    width: 100%;

    justify-content: start;

    color: #ffffff;

    font-size: 1.5em;

    padding: 0;
    font-family: 'Fuzzy Bubbles', cursive;

    margin: 0;*/

/*
  background-color: purple;
*/
}

html  {
  scroll-behavior: smooth;
  scroll-padding-top: 1000px;

  height: 100%;
}
body  {
  height: 100%;
}




#app {
 /* display: flex;
  flex-direction: column;

  justify-content: start;
  align-items: center;
  align-content: center;



  width: 100%;
  min-width: 100%;






*/
   min-height: 100%;

  background-color: var(--DARK_GRAY);
  color: var(--LIGHT_FONT_COLOR) !important;
/*
  background-color: red;
*/
}

#content-component  {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;

  margin-top: 12vh;

  font-size: 1.2em;
/*
  background-color: yellow;
*/

  min-height: 90%;
 /*
  height: 84%;
*/

  /*padding: 2em;*/
}


.capitalize  {
  text-transform: capitalize;

}

.highlighted  {
  color: var(--YELLOW);
  font-weight: bold;
}

.green  {
  color: var(--GREEN);
}

.header-text  {
  font-weight: bold;
  font-size: 2em;
}

.error-message  {
  color: var(--REAL_BRIGHT_BLUE);
  font-weight: bold;

  text-align: center;
}

.bold  {
  font-weight: bold;
}

.bright-blue  {
  background-color: var(--REAL_BRIGHT_BLUE) !important;
}

.bright-blue-text  {
  color: var(--REAL_BRIGHT_BLUE) !important;
}



@media screen and (max-width: 1300px) {

}

@media screen and (max-width: 600px) {

}


@media screen and (max-width: 400px) {

}


@media screen and (max-width: 300px) {

}
</style>
