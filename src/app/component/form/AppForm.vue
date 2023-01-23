<template>
  <div className="wrapper">
    <div className="title">
      <h1>{{formTitle}}</h1>
    </div>

    <div class="error-message">
      {{errorMessage}}
    </div>

    <div className="contact-form" v-on:keyup.enter="finalAction">
      <div className="input-fields">
        <input v-for="(types, i) in this.types"
              v-model = "this.models[i]" :type="this.types[i]"
              :placeholder="this.placeholders[i]"
              :class="this.classes[i]"
        />
      </div>

      <div className="msg">
        <div className="btn" v-on:click.stop="finalAction">{{buttonName}}</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
name: "AppForm",

data() {
  return {
    errorMessage: "",

    models:  {
      type: Array,
      default: () => []
    }
  }
},

created() {
  if (this.initials !== null && this.initials !== undefined &&
      this.initials.length === this.types.length) {
    this.models = this.initials.map((k) => k);
  } else {
    this.models = this.types.map(() => "");
  }
},

methods:  {
  async finalAction()  {
    let result = await this.formAction(this.models);
    this.errorMessage = result;
  }
},

  props:  {
  types:  {
    type: Array,
    default: () => []
  },

  classes:  {
    type: Array,
    default: (props) =>  {
      let result = [];

      result = props.types.map(() => "");

      return result;
    }
  },

  placeholders:  {
    type: Array,
    default: () =>  []
  },

  initials:  {
    type: Array,
    default: () => []
  },

  buttonName:  {
    type: String,
    default: "Test"
  },

  formAction:  {
    type: Function,
    default: () =>  {
      console.log("oof");
    }
  },

  formTitle:  {
    type: String,
    default: ""
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
  background: var(--FORM_BACKGROUND);
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
  background-color: var(--FORM_INPUT_BACKGROUND);
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
  /*border: 2px solid var(--SECONDARY_DARK_MEDIUM);*/

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
  background: var(--FORM_BUTTON_BACKGROUND);
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