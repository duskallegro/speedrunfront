<template>
  <div className="wrapper">
    <div v-if="this.isLoaded">
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

          <div class="example-fields">
            <div class="example-fields-header">
              <div class="example-fields-title">{{examplesTitle}}</div>
              <div class="example-plus-sign" v-on:click.stop="addExampleInput($event)">➕</div>
            </div>

            <div class="example-inputs">
              <div class="example-row" v-for="(example, i) in this.examples">
                <div class="example-translation-container">
                  <textarea v-model = "this.examples[i].example" type="text"
                         :placeholder="this.examples[i].example === '' ? 'Example' :
                                          this.examples[i].example"/>
                  <textarea v-model = "this.examples[i].translation" type="text"
                         :placeholder="this.examples[i].translation === '' ? 'Translation' :
                                          this.examples[i].translation"/>
                </div>
                <div class="minus-sign" v-on:click.stop="this.removeExample(i)">➖</div>
              </div>
            </div>
          </div>
        </div>

        <div className="msg">
          <div className="btn" v-on:click.stop="finalAction">{{buttonName}}</div>
        </div>

      </div>
    </div>

    <div v-if="!isLoaded">
      <AppSpinner/>
    </div>
  </div>
</template>

<script>
import AppSpinner from "@/app/component/spinner/AppSpinner";
import NavbarButton from "@/app/component/button/NavbarButton";
import AppTable from "@/app/component/table/AppTable";

export default {
  name: "EditCardForm",
  components: {AppSpinner},

  data() {
    return {
      isLoaded: false,

      errorMessage: "",

      models:  {
        type: Array,
        default: () => []
      },

      examples: {
        type: Array,
        default: () => []
      }

    }
  },

  beforeCreate() {

  },

  created() {
    if (this.initials !== null && this.initials !== undefined &&
        this.initials.length === this.types.length) {
      this.models = this.initials.map((k) => k);
    } else {
      this.models = this.types.map(() => "");
    }

    this.examples = this.initialExamples.map((k) => {
      return {
        example: k.example,
        translation: k.translation
      }
    });
/*    console.log("initialExamples = " + JSON.stringify(this.initialExamples));
    this.examples = this.initialExamples.map((i) => i);
    console.log("examples = " + JSON.stringify(this.examples));
    for (let i = 0; i < this.examples.length; i++) {
      console.log(JSON.stringify(this.examples[i]));
    }
    console.log("printed");*/

    this.isLoaded = true;
  },

  methods:  {
    async finalAction()  {
      let result = await this.formAction(this.models, this.examples);
      this.errorMessage = result;
    },

    addExampleInput(e)  {
      e.preventDefault();
      this.examples.push({example: "", translation: ""});
    },

    removeExample(i)  {
      console.log("removing " + i);
      this.examples.splice(i, 1);
    }
  },

  props:  {
    examplesTitle: String,

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

    initialExamples: {
      type: Array,
      default: () => []
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
  border: 2px solid var(--FORM_BUTTON_BACKGROUND);
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

/* Examples */
.example-fields  {
  display: flex;
  flex-direction: column;

  justify-content: start;
  align-items: center;

  margin-top: 1em;
}

.example-fields-header  {
  display: flex;
  justify-content: space-between;

  width: 100%;

  font-weight: bold;
  color: var(--CARD_EXAMPLE_HEADER_COLOR);
}

.example-plus-sign  {
  color: red;
  font-weight: bold;

  cursor: pointer;
}

.example-inputs  {

  width: 100%;
  min-width: 100%;}

.example-row  {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  min-width: 100%;

  /*
    background-color: red;
  */
}

.minus-sign  {
  margin-left: 1em;
  cursor: pointer;
}

.example-translation-container  {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  min-width: 90%;
  width: 90%;

   border: 1px solid var(--FORM_BUTTON_BACKGROUND);

  padding: 1em;

  margin-top: 0.5em;
  margin-bottom: 1em;
}

textarea  {
  line-height: 1.5 !important;

}

/* Media */

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