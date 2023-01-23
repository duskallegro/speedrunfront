<template>
  <div id="navbar"  >
    <div id="header"
         v-on:click.stop="this.$router.push(
              {path: '/'})" >
<!--      <img src="../../../assets/wordkicklogo.png" v-on:click.stop="myClickEvent"/>-->
      WordKick
    </div>

    <div class="hamburger" v-on:click.stop="hamburgerAction">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div id="navbar-buttons">
      <NavbarButton text="Users" color="green" link="users"/>

      <NavbarButton v-if="!isLoggedIn"
                   emoji="🥳" color = "dim-blue" text="Create Account" link="create-account"/>
      <NavbarButton v-if="!isLoggedIn"  emoji="🧐" color = "blue" text="Enter with Account" link="normal-login"/>
      <NavbarButton v-if="!isLoggedIn"  emoji="😏" color = "blue" text="Enter with Discord" link="discord-enter"/>

      <AppButton v-if="isLoggedIn"  emoji="😏" color = "blue" text="Profile"  v-on:click="profileAction" />

      <AppButton v-if="isLoggedIn"  emoji="😰" color = "blue" text="Exit" v-on:click="logoutAction" :action="logoutAction"/>

    </div>
  </div>
</template>

<script>
import NavbarButton from "@/app/component/button/NavbarButton";
import AppButton from "@/app/component/button/AppButton";
import AuthService from "@/app/services/AuthService";

export default {
name: "NavbarComponent",
  components: {NavbarButton, AppButton},
  data()  {
    return {
      link: 'home',
    }
  },
  methods:  {
    myClickEvent()  {
      this.$root.$emit('navbar-clicked', 'navbar');
      this.$router.push({path: this.getTo})
    },

    hamburgerAction()  {
      const hamburger = document.querySelector(".hamburger");
      const navLinks = document.querySelector("#navbar-buttons");
      const links = document.querySelectorAll(".navbar-button");

      console.log("hamburger = " + hamburger);
      console.log("navLinks = " + navLinks);
      console.log("links = " + links);

      navLinks.classList.toggle("open");
      links.forEach(link => {
        link.classList.toggle("fade");
      });
    },

    async logoutAction() {
      console.log("logoutAction");
      AuthService.logout();
      this.$router.go({name: "/"});

    },

    async profileAction() {
      console.log("profileAction");

      let user = AuthService.getLoggedInUser();
      console.log("user = " + user);

       this.$router
          .push({ path: "/user/" + user.username })
          .then(() => { this.$router.go() })
    }
  },
  created()  {

  },
  computed: {
    isLoggedIn()  {
      //return this.$store.state.loggedIn === true;
      console.log(AuthService.getLoggedInUser());
       let item = AuthService.getLoggedInUser();
      console.log("item = " + JSON.stringify(item) );
         let result = (item !== null && item !== undefined);
       console.log("isLoggedIn = " +result);

      return result;
    },

    getTo: function () {
      console.log("text: " + this.text);
      console.log("link: " + this.link);
      return "/home";
    }
  }
}
</script>

<style scoped>
@import '../../../assets/main.css';

#navbar  {
  min-width: 100%;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1em;

  top:0;
  position: fixed;
  height: 12vh;
  z-index: 1000;

  overflow: hidden;

  background-color: var(--BODY_BACKGROUND);
 }

#navbar:hover  {
  cursor: pointer;
  /*filter: brightness(1.2);*/
}

#header  {
  font-weight: bold;
  font-size: 3rem;

  width: 10%;

  color: var(--HEADER_TEXT_COLOR);
}

#navbar-buttons  {
  display: flex;

}

/* Navbar animation */

@media screen and (max-width: 1300px) {
  #header  {
    width: 20%;
  }

  .line {
    width: 30px;
    height: 3px;
    background: white;
    margin: 5px;
  }

  #navbar {
    position: relative;

   }

  .hamburger {
    position: absolute;
    cursor: pointer;
    right: 5%;
/*    top: 50%;*/
   /* transform: translate(-5%, -50%);*/
    z-index: 2;
  }

  #navbar-buttons  {


    position: fixed;
    background-color: var(--BODY_BACKGROUND);


    height: 100vh !important;
    width: 100vw !important;

    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: start;

    clip-path: circle(10px at 90% -10%);
    -webkit-clip-path: circle(10px at 90% -10%);
    transition: all 0.8s ease-out;
    pointer-events: none;

/*
    border: 5px solid red;
*/


    top:0vh;
    right: 0vh;
  }



  #navbar-buttons.open {
    clip-path: circle(   3200px at 50%  50%);
    -webkit-clip-path: circle( 3200px at 50%  50%);
    pointer-events: all;


  }



 .navbar-button, .button {

   font-size: 2em;

   margin-top:1em;

   width: 80vw;
  }


  #navbar-buttons.navbar-button:nth-child(1) {
    transition: all 0.2s ease 0.1s;
  }
  #navbar-buttons.navbar-button:nth-child(2) {
    transition: all 0.2s ease 0.2s;
  }
  #navbar-buttons.navbar-button:nth-child(3) {
    transition: all 0.2s ease 0.3s;
  }

  #navbar-buttons.navbar-button:nth-child(4) {
    transition: all 0.2s ease 0.4s;
  }
  .navbar-button.fade {
    opacity: 1;

  }
}


@media screen and (max-width: 600px) {
  #header  {
    width: 30%;
    font-size: 2em;
  }


}


@media screen and (max-width: 400px) {
  #header  {
    width: 40%;
    font-size: 2em;

  }

}


@media screen and (max-width: 300px) {
  #header  {
    width: 50%;
    font-size: 1.5em;

  }


}
</style>