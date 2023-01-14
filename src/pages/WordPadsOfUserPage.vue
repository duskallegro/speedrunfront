<template>
  <div class="bg-black-100">
    Wordpads of user

    <table>
      <thead>
        <tr>
          <th>#</th>

          <th>Name</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(pad, index) in this.pads">
          <th>{{index + 1}}</th>

          <td>{{pad.padId}}</td>
          <td>{{pad.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import WordPadService from "@/services/WordPadService";
import UserService from "@/services/UserService";

export default {
  name: "WordPadsOfUserPage",

  data()  {
    return  {
      pads: []
    }
  },

  created()  {
    this.getUserWordpads().then(() =>  {
      console.log("Got pads: " + this.pads.length + "!");
    });
  },

  methods:  {
    async getUserWordpads()  {
      let username = this.$route.params.username;
      console.log("username: " + username);

      let user = await UserService.getUserByUsername(username);
      let discordId = user.discordId;
      let pads = await WordPadService.getPadsByUserId(user.userId);

      console.log(pads);

      this.pads = pads;
    }
  }
}
</script>

<style scoped>

</style>