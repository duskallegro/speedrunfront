<template>
  <AppForm :types="['text', 'password']" :placeholders="['Username', 'Password']"
          button-name="Login" :form-action="loginUserAction" form-title="LOGIN"/>
</template>

<script>
import UserService from "@/app/services/UserService";
import AppForm from "@/app/component/form/AppForm";
import AuthService from "@/app/services/AuthService";

export default {
  name: "LoginPage",
  components: {AppForm},
  data() {
    return {

    }
  },

  methods: {
    async loginUserAction(models) {
      console.log("loginUserAction");

      const res = await UserService.normalLogin(models[0], models[1]);
      console.log("result: " + res);
      console.log(JSON.stringify(res));

      let user = null;
      switch (res)  {
        case "LOGGED_IN":
            user = JSON.stringify(await UserService.getUserByUsername(models[0]));
            AuthService.login(user);

            this.$router
                .push({ path: '/' })
                .then(() => { this.$router.go() })
          break;
        case "INVALID_CREDENTIALS":
          return "Invalid Credentials";
        case "EMPTY_USERNAME":
          return "Empty Username";
        case "EMPTY_PASSWORD":
          return "Empty Password";
        default:
          return res;
      }
    }
  }


}
</script>

<style scoped>

</style>