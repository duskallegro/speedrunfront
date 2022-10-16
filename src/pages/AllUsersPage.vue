<template>
  <div class="bg-gray-200">
    <table class="table bg-green-100">
      <thread>
        <th>#</th>
        <th>Username</th>
        <th>Discord ID</th>
      </thread>

      <tbody>
      <tr v-for="(user, index) in users">
        <th>{{index + 1}}</th>
        <td>{{user.discordTag}}</td>
        <td>{{user.discordId}}</td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "AllUsersPage",

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
    }
  }
}

</script>

<style scoped>

</style>