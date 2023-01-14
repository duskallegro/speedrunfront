<template>
  <AppForm :types="['text', 'password', 'text']" :placeholders="['Username', 'Password', 'Email']"
           button-name="Start  Learning" :form-action="createUserAction" form-title="Create Account"/>
</template>

<script>
import UserService from "@/services/UserService";
import AppForm from "@/components/AppForm";
import AuthService from "@/services/AuthService";

export default {
  name: "CreateAccountPage",
  components: {AppForm},

  data() {
    return {
      username: "",
      password: "",
      email: "",
      errorMessage: ""
    }
  },

  methods: {
    async createUserAction(models) {
      let username = models[0];
      let password = models[1];
      let email = models[2];

      let res = await UserService.createNormalUser(username, password, email);
      console.log("result: " + res);
      console.log(JSON.stringify(res));

      let user = null;
      switch (res)  {
        case "EMPTY_USERNAME":
          return "Empty Username";
        case "EMPTY_PASSWORD":
          return  "Empty Password";
        case "EMPTY_EMAIL":
          return  "Empty Email";
        case "DUPLICATE_USERNAME":
          return  "Duplicate Username";
        case "DUPLICATE_EMAIL":
          return "Duplicate Email";
        case "SUCCESS":
          res = await UserService.normalLogin(this.username, this.password);
          console.log("result: " + res);
          console.log(JSON.stringify(res));

          user =  JSON.stringify(await UserService.getUserByUsername(this.username));
          AuthService.login(user);

          this.$router
              .push({ path: '/home' })
              .then(() => { this.$router.go() })
          return "";
        default:
          this.errorMessage = res;
      }


    }
  }


}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'Roboto', sans-serif;
}

.wrapper {
  /* position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);*/
  width: 100%;
  max-width: 50%;
  background: var(--LIGHTER_GRAY);
  padding: 30px;
  border-radius: 5px;
}

.wrapper .title h1 {
  color: var(--LIGHT_FONT_COLOR);
  text-align: center;
  margin-bottom: 25px;
  font-weight: bold;
}

.contact-form {
  display: flex;
  flex-direction: column;

}

.input-fields {
  display: flex;
  flex-direction: column;
  margin-right: 4%;
}

.input-fields,
.msg {
  width: 100%;
}


input,  textarea  {
  background-color: var(--FORM_INPUT_BLUE_GRAY);
  border-radius: 0.3em;
  border: 2px solid var(--FORM_BORDER_LIGHT_GRAY);

  margin-top: 1em;

  margin: 10px 0;

  padding: 10px;
  color: var(--LIGHT_FONT_COLOR);
  width: 100%;

  cursor: pointer;
  font-size: 1em;
}

.msg textarea {
  height: 212px;
  border: 2px solid var(--FORM_BORDER_LIGHT_GRAY);
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: silver;
}

::-moz-placeholder {
  /* Firefox 19+ */
  color: silver;
}

:-ms-input-placeholder {
  /* IE 10+ */
  color: silver;
}

.btn {
  background: var(--GREEN);
  text-align: center;
  padding: 15px;
  border-radius: 5px;

  color: var(--LIGHT_FONT_COLOR);
  font-weight: bold;

  cursor: pointer;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  .contact-form {

  }

  .wrapper {
    max-width: 90%;
  }

  .msg textarea {
    height: 80px;
  }

  .input-fields,
  .msg {
    width: 100%;
  }
}

@media screen and (max-width: 400px) {
  .wrapper {
    max-width: 95%;
  }
}

@media screen and (max-width: 1000px) {
  .wrapper {
    max-width: 70%;
  }
}

@media screen and (min-width: 1000px) {
  .wrapper {
    max-width: 50%;
  }

  .input-fields, .msg {
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .wrapper {
    max-width: 40%;
  }

  .input-fields, .msg {
    width: 100%;
  }
}

@media screen and (min-width: 1500px) {
  .wrapper {
    max-width: 30%;
  }

  .input-fields, .msg {
    width: 100%;
  }
}


@media screen and (min-width: 2000px) {
  .wrapper {
    max-width: 1000px;
  }

  .input-fields, .msg {
    width: 100%;
  }
}

@media screen and (min-width: 4000px) {
  .contact-form {
    flex-direction: row;
  }
}
</style>