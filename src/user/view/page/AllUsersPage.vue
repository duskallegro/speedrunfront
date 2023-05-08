<template>
  <div id="users-table">

       <UserSmallProfile v-for="(user, index) in users"
                          :username="user.username"
                         :discordId="user.discordId" registration="01/05/2022"
                         :discordTag="user.discordTag"
                         :email = "user.email"
                          v-bind:key="index">

      </UserSmallProfile>

  </div>
</template>

<script>
import UserService from "@/app/services/UserService";
import UserSmallProfile from "@/user/view/component/UserSmallProfile";

export default {
  name: "AllUsersPage",
  components: {UserSmallProfile},
  data()  {
    return  {
      users: []
    }
  },

  created()  {
    this.getAllUsers().then(() =>  {
      console.log("Got users: " + this.users.length + "!");
    });
  },

  methods:  {
    async getAllUsers()  {
      const res = await UserService.getAllUsers();
      this.users = res;
      console.log("users: " + this.users);
      console.log(JSON.stringify(this.users[0]));
    }
  }
}

</script>

<style scoped>

  #users-table  {
/*
    background-color: red;
*/

    display: grid;
    grid-template-columns: 20vw 20vw 20vw;

    grid-template-rows: auto;

    grid-column-gap: 3em;
    grid-row-gap: 3em;

    overflow: auto;
    max-width: 70%;
    min-width: 70%;


    place-self: center;
    justify-items: center;

  }

  @media only screen and (min-width: 3500px) and (max-width: 4000px) {
    #users-table  {
      grid-template-columns: 8vw 8vw 8vw 8vw 8vw 8vw 8vw;
      grid-template-rows: auto;
    }
  }

  @media only screen and (min-width: 3000px) and (max-width: 3500px) {
    #users-table  {
      grid-template-columns: 10vw 10vw 10vw 10vw 10vw 10vw;
      grid-template-rows: auto;
    }
  }

  @media only screen and (min-width: 2500px) and (max-width: 3000px) {
    #users-table  {
      grid-template-columns: 12vw 12vw 12vw 12vw 12vw;
      justify-content: center;
      grid-template-rows: auto;

      font-size: 1.5em;
      min-width: 95%;
      max-width: 95%;
    }
  }

  @media only screen and (min-width: 2200px) and (max-width: 2500px) {
    #users-table  {
      grid-template-columns: 18vw 18vw 18vw 18vw;
      justify-content: center;
      grid-template-rows: auto;


      font-size: 1.5em;

      grid-column-gap: 1em;
      grid-row-gap: 1em;

      min-width: 95%;
      max-width: 95%;

/*
      background-color: red;
*/
     }
  }

  @media only screen and (max-width: 2200px) {
    #users-table  {
      grid-template-columns: 20vw 20vw  20vw;
      justify-content: center;
      grid-template-rows: auto;

      font-size: 1em;

      grid-column-gap: 1em;
      grid-row-gap: 1em;

      min-width: 65%;
      max-width: 65%;
    }
  }

  @media only screen and (max-width: 1900px) {
    #users-table  {
      grid-template-columns: 28vw 28vw 28vw;
      justify-content: center;
      grid-template-rows: auto;

      font-size: 1.8em;

      grid-column-gap: 1em;
      grid-row-gap: 1em;

      min-width: 85%;
      max-width: 85%;
    }
  }

  @media only screen and (max-width: 1650px) {
    #users-table  {
      grid-template-columns: 28vw 28vw 28vw;
      justify-content: center;
      grid-template-rows: auto;

      font-size: 1.8em;

      grid-column-gap: 1em;
      grid-row-gap: 1em;

      min-width: 85%;
      max-width: 85%;
    }
  }


  @media only screen and (max-width: 1420px) {
    #users-table  {
      grid-template-columns: 40vw 40vw;
      justify-content: center;
      grid-template-rows: auto;

      font-size: 2em;

      grid-column-gap: 1em;
      grid-row-gap: 1em;

      min-width: 90%;
      max-width: 90%;
      margin: 0;

     }
  }


  @media only screen and (max-width: 1220px) {
    #users-table  {
      grid-template-columns: 45vw 45vw;
      justify-content: center;
      grid-template-rows: auto;

      font-size: 2em;

      grid-column-gap: 0.5em;
      grid-row-gap: 0.5em;

      min-width: 95%;
      max-width: 95%;
      margin: 0;

     }
  }

  @media only screen and (max-width: 1000px) {
    #users-table  {
      grid-template-columns: 90vw;
      justify-content: center;
      grid-template-rows: auto;

      font-size: 2.5em;

      min-width: 98%;
      max-width: 98%;


      }
  }

  @media only screen and (max-width: 800px) {
    #users-table  {
      grid-template-columns: 90vw;
      justify-content: center;
      grid-template-rows: auto;

      font-size: 2.5em;

    }
  }

  @media only screen and (max-width: 600px) {
    #users-table  {
      grid-template-columns: 99vw;
      justify-content: center;
      grid-template-rows: auto;


    }
  }
</style>