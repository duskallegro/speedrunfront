<template>

    <NavbarComponent/>

    <div v-cloak id="content-component">
<!--      <router-link :to="{ name: 'HomePage' }">Home</router-link>-->
      <router-view  :key="$route.fullPath" />

    </div>

    <FooterComponent/>


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
  },

  data()  {
    return {
      theme: "gray"
    }
  },

  mounted: function()  {
    this.root = document.documentElement;

    if (this.theme === "gray")  {

      this.root.style.setProperty("--oof", 'red');
      this.root.style.setProperty("--circle-scale--ratio", '1');


      /* Components */

      this.root.style.setProperty("--BUTTON_BACKGROUND_FIRST", '#2eac68');
      this.root.style.setProperty("--BUTTON_BACKGROUND_SECOND", '#254058');


      this.root.style.setProperty("--BODY_BACKGROUND", '#122333');

      this.root.style.setProperty("--TABLE_BACKGROUND", '#182b3c');
      this.root.style.setProperty("--TABLE_HEADER_BACKGROUND", '#1e384e');
      this.root.style.setProperty("--TABLE_ROW_SELECTION_BACKGROUND", '#254058');



      this.root.style.setProperty("--TABLE_TEXT_COLOR", '#adc1d1');
/*
       this.root.style.setProperty("--TABLE_BACKGROUND", 'var(--PRIMARY_LIGHT_HARD)');
*/

    }

    else if (this.theme === "purple-cyan")  {
      /* PRIMARY */

      /* dark */

      this.root.style.setProperty("--PRIMARY_DARK_HARD", "#080c48");
      this.root.style.setProperty("--PRIMARY_DARK_MEDIUM", "#101450");
      this.root.style.setProperty("--PRIMARY_DARK_EASY", "#10175e");
      this.root.style.setProperty("--PRIMARY_DARK_FREE", "#171b55");

      this.root.style.setProperty("--PRIMARY_SHADOW", "#080c45");

      /* light */


      this.root.style.setProperty("--PRIMARY_LIGHT_HARD", "#1e276f");
      this.root.style.setProperty("--PRIMARY_LIGHT_MEDIUM", "#232b73");
      this.root.style.setProperty("--PRIMARY_LIGHT_EASY", "#2d60ee");

      /* SECONDARY */

      this.root.style.setProperty("--SECONDARY_DARK_HARD", "#0780e9");
      this.root.style.setProperty("--SECONDARY_DARK_MEDIUM", "#0ebff3");
      this.root.style.setProperty("--SECONDARY_DARK_EASY", "#50c4fb");

       this.root.style.setProperty("--PRIMARY_LIGHT_MEDIUM", "#50c4fb");

      this.root.style.setProperty(" --LIGHT_FONT_COLOR", "#b1ffff");

      this.root.style.setProperty(" --TERTIARY_FONT", "#b1ffff");

    }

    else if (this.theme === "black-purple")  {
       /* PRIMARY */

      /* dark */

      this.root.style.setProperty("--PRIMARY_DARK_HARD", "#131417");
      this.root.style.setProperty("--PRIMARY_DARK_MEDIUM", "#101450");
      this.root.style.setProperty("--PRIMARY_DARK_EASY", "#10175e");
      this.root.style.setProperty("--PRIMARY_DARK_FREE", "#171b55");

      this.root.style.setProperty("--PRIMARY_SHADOW", "#080c45");

      /* light */


      this.root.style.setProperty("--PRIMARY_LIGHT_HARD", "#1e276f");
      this.root.style.setProperty("--PRIMARY_LIGHT_MEDIUM", "#232b73");
      this.root.style.setProperty("--PRIMARY_LIGHT_EASY", "#2d60ee");

      /* SECONDARY */

      this.root.style.setProperty("--SECONDARY_DARK_HARD", "#0780e9");
      this.root.style.setProperty("--SECONDARY_DARK_MEDIUM", "#0ebff3");
      this.root.style.setProperty("--SECONDARY_DARK_EASY", "#50c4fb");

      this.root.style.setProperty("--PRIMARY_LIGHT_MEDIUM", "#50c4fb");

      this.root.style.setProperty(" --LIGHT_FONT_COLOR", "#b1ffff");

      this.root.style.setProperty(" --TERTIARY_FONT", "#b1ffff");

      /* Components */
      this.root.style.setProperty("--TABLE_BACKGROUND",
                    this.root.style.getPropertyValue('--PRIMARY_LIGHT_HARD'));

    }

    else if (this.theme === "purple-new")  {
      /* PRIMARY */

      /* dark */

      this.root.style.setProperty("--PRIMARY_DARK_HARD", "#13073a");
      this.root.style.setProperty("--PRIMARY_DARK_MEDIUM", "#101450");
      this.root.style.setProperty("--PRIMARY_DARK_EASY", "#10175e");
      this.root.style.setProperty("--PRIMARY_DARK_FREE", "#171b55");

      this.root.style.setProperty("--PRIMARY_SHADOW", "#080c45");

      /* light */


      this.root.style.setProperty("--PRIMARY_LIGHT_HARD", "#1e276f");
      this.root.style.setProperty("--PRIMARY_LIGHT_MEDIUM", "#232b73");
      this.root.style.setProperty("--PRIMARY_LIGHT_EASY", "#2d60ee");

      /* SECONDARY */

      this.root.style.setProperty("--SECONDARY_DARK_HARD", "#0780e9");
      this.root.style.setProperty("--SECONDARY_DARK_MEDIUM", "#0ebff3");
      this.root.style.setProperty("--SECONDARY_DARK_EASY", "#50c4fb");

      this.root.style.setProperty("--PRIMARY_LIGHT_MEDIUM", "#50c4fb");

      this.root.style.setProperty(" --LIGHT_FONT_COLOR", "#b1ffff");

      this.root.style.setProperty(" --TERTIARY_FONT", "#b1ffff");


      /* Components */
      this.root.style.setProperty("--TABLE_BACKGROUND", '#403075');
    }

    else if (this.theme === "purple-halloween")  {
      /* PRIMARY */

      /* dark */

      this.root.style.setProperty("--PRIMARY_DARK_HARD", "#1c0b4a");
      this.root.style.setProperty("--PRIMARY_DARK_MEDIUM", "#101450");
      this.root.style.setProperty("--PRIMARY_DARK_EASY", "#10175e");
      this.root.style.setProperty("--PRIMARY_DARK_FREE", "#171b55");

      this.root.style.setProperty("--PRIMARY_SHADOW", "#080c45");

      /* light */


      this.root.style.setProperty("--PRIMARY_LIGHT_HARD", "#1e276f");
      this.root.style.setProperty("--PRIMARY_LIGHT_MEDIUM", "#232b73");
      this.root.style.setProperty("--PRIMARY_LIGHT_EASY", "#2d60ee");

      /* SECONDARY */

      this.root.style.setProperty("--SECONDARY_DARK_HARD", "#0780e9");
      this.root.style.setProperty("--SECONDARY_DARK_MEDIUM", "#0ebff3");
      this.root.style.setProperty("--SECONDARY_DARK_EASY", "#50c4fb");

      this.root.style.setProperty("--PRIMARY_LIGHT_MEDIUM", "#50c4fb");

      this.root.style.setProperty(" --LIGHT_FONT_COLOR", "#b1ffff");

      this.root.style.setProperty(" --TERTIARY_FONT", "#b1ffff");

      this.root.style.setProperty('--TERTIARY_DARK_HARD', '#50c4fb');
      /* Components */
      this.root.style.setProperty("--TABLE_BACKGROUND", '#371381');
    }

  },


}
</script>

<style>
@import 'app/assets/main.css';
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&family=Josefin+Sans:wght@400;500&family=Moon+Dance&family=Overpass&family=Roboto:wght@300&family=Rubik:wght@300&family=Signika&display=swap');

* {
  box-sizing: border-box;
}


html, body {
  height: 100%;
}


div, a, input, textarea, button, select  {
  -webkit-tap-highlight-color: transparent;

}

[v-cloak] {
  display: none;
}

body {
  font-family: 'Josefin Sans', sans-serif;
/*
  background-color:  yellow;
*/
/*  height: 100%;

  height: 100vh;
  width: 100vw;*/

   /*
    height: 100%;
  */
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
/*
   min-height: 100%;
*/

/*
  height: 100%;
  width: 100%;*/
   min-height: 100%;
    background-color: var(--BODY_BACKGROUND);
  color: var(--LIGHT_FONT_COLOR) !important;
/*
  background-color: red;
*/

  display: flex;
  flex-direction: column;

 }

#content-component  {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

   flex: 1 0 auto;

  margin-top: 12vh;

  font-size: 1.2em;
/*
  background-color: blue;
*/
  /*border: 2px solid white;*/

/*
  min-height: 90%;
*/
 /*
  height: 84%;
*/

  padding: 2em;
}


.capitalize  {
  text-transform: capitalize;

}

.highlighted-first  {
  color: var(--TERTIARY_MAIN) !important;
/*
  font-weight: bold;
*/
}

.highlighted-second  {
  color: var(--SECONDARY_MAIN) !important;

}

.green  {
  color: var(--SECONDARY_DARK_MEDIUM);
}

.header-text  {
  font-weight: bold;
  font-size: 2em;
}

.error-message  {
  color: var(--ERROR_MESSAGE_COLOR);
  font-weight: bold;

  text-align: center;
}

.bold  {
  font-weight: bold;
}

.bright-blue  {
/*
  background-color: var(--BUTTON_BACKGROUND_THIRD) !important;
*/
  background-color: var(--QUATERNARY_MAIN) !important;


}

.bright-blue-text  {
/*
  color: var(--BUTTON_BACKGROUND_THIRD) !important;
*/
  color: var(--QUATERNARY_MAIN) !important;
 }

.very-bright-blue-text  {
   color: var(--QUATERNARY_DARK_EASY) !important;
 }

.color-header  {
  color: var(--TERTIARY_MAIN);
  margin-left: 5px;
  margin-right: 5px;
}

.color-text  {
  color: var(--TERTIARY_MAIN);

}

.title  {
  font-size: 2em;
}

@media screen and (max-width: 1300px) {
  #content-component  {
    margin-top: 0vh;
  }
}

@media screen and (max-width: 600px) {

}


@media screen and (max-width: 400px) {
  #content-component  {
    padding: 1em;

  }
}

@media screen and (max-width: 450px) {
  #content-component  {
    padding: 1.2em;

  }
}

@media screen and (max-width: 250px) {
  #content-component  {
    padding: 0.5em;

  }
}


@media screen and (max-width: 300px) {

}

</style>
