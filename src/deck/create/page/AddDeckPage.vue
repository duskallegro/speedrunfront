<template>
  <AppForm :types="['text', 'text', 'text']" :placeholders="['Name', 'Foreign Language', 'Translation Language']"
           button-name="CREATE" :form-action="createPadAction" form-title="CREATE WORDPAD"/>
</template>

<script>

import UserService from "@/app/services/UserService";
import AppForm from "@/app/component/form/AppForm";
import AuthService from "@/app/services/AuthService";
import DeckService from "@/app/services/DeckService";

export default {
  name: "AddDeckPage",

  "components":  {
    AppForm
   },

  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    }
  },

  created() {

  },

  methods: {
    async createPadAction(models) {
      console.log("createPadAction");

      let name = models[0];
      let foreign = models[1];
      let translation = models[2];

      console.log("name = " + name);
      console.log("foreign = " + foreign);
      console.log("translation = " + translation);

      let result =  await DeckService.createPad(name, foreign, translation, AuthService.getLoggedInUser().username);
      console.log(result);

      switch (result)  {
        case "EMPTY_NAME":
          return "Empty Pad Name!";
        case "Foreign Language was not found!":
          return "Empty Foreign ID!";
        case "EMPTY_TRANSLATION_ID":
          return "Translation Language was not found!";
        case "EMPTY_USER_ID":
          return "";
        default:
          return result;
      }
    }
  }


}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto');
@import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";

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
  border: 2px solid var(--GREEN);
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

  margin-top: 1em;
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