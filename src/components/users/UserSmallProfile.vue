<template>
  <div class="user-small-profile"  v-on:click.stop="myClickEvent">

    <div class="user-small-header">
      <div class="user-image">
        <img src="../../assets/user.png"/>
      </div>

    </div>

    <div class="user-small-content">
      <div class="username highlighted green">
        {{username}}
      </div>

      <div>
        Registration date: <span class="highlighted">{{registration}}</span>
      </div>

      <div>
        Discord Tag: <span class="highlighted">{{discordTag}}</span>
      </div>
      <div>
        Discord ID: <span class="highlighted">{{discordId}}</span>
      </div>

      <div>
        Email: <span class="highlighted">{{email}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "UserSmallProfile",

props:  {
  username: String,
  registration: String,
  discordId: String,
  discordTag: String,
  email: String
},

  methods:  {
    myClickEvent()  {
      this.$root.$emit('user-small-profile-clicked', this.text);
      this.$router.push({
        path: "/user/" + this.username,
        params: {
          'username': this.username,
          'discordTag': this.discordTag,
          'discordId': this.discordId,
          'registration': this.registration,
          'email': this.email
          },
        props: true
        }
      );
    }
  },
  computed: {
    getTo: function () {
      console.log("text: " + this.text);
      console.log("link: " + this.link);
      return "/" + this.link;
    }
  }
}
</script>

<style scoped>



.user-small-header, .user-small-content   {
  margin-top: 1em;
}

.user-small-content  {
  display: flex;
  flex-direction: column;
/*
  background-color: red;
*/

 }

.user-small-header  {
  display: flex;
  justify-content: center;
/*
  background-color: red;
*/

  width: 100%;
}


.user-small-profile img  {
  width: 100%;
  min-width: 100%;

  height: 100%;
  min-height: 100%;
}

.user-small-profile  {
  background-color: var(--LIGHTER_GRAY);
  padding: 2em;
  margin: 0.5em;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;


  box-shadow: 6px 6px 2px 1px transparent;

/*
  align-self: stretch !important;
*/

}

.user-small-profile:hover  {
  cursor: pointer;
  filter: brightness(0.7);

  box-shadow: 6px 6px 2px 1px var(--GREEN);


}

.user-small-profile:hover img  {
  filter: brightness(4.3);
}

@media only screen and (min-width: 1900px) {
  .user-small-profile  {

  }
}

@media only screen and (max-width: 1650px) {
  .user-small-profile  {
   }
}

@media only screen and (max-width: 1000px) {
  .user-small-profile img  {

  }

  .user-small-profile  {
    width: 80%;
   }

  .user-small-header  {
      height: 50%;
  }
}

@media only screen and (min-width: 1900px) and (max-width: 2500px) {
  .user-small-header  {
    height: 40%;
  }

  .user-small-profile  {
   }

}

</style>
