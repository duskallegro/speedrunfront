<template>
  <div class="split-circle"

       @mousemove="this.onMousemove"
       :style="this.styleObject"

       v-on:click.stop="this.clickEvent()"

       :class = "[this.isSelected ? 'selected-circle' : '', this.isGuessed ? 'guessed-circle' : '',
                        this.isError ? 'error-circle' : '']"
  >
    {{value}}
  </div>
</template>

<script>
import VoiceService from "@/app/services/VoiceService";

export default {
name: "SplitCircle",


props: {
  value: String,
  left: {
    type: Number,
  },
  top: Number,

  secret: String,

  action: Function,

  index: Number,
  currentIndex: Number
},

computed:  {
  styleObject()  {
    return {
      'margin-left': this.leftData,
      'margin-top': this.topData,

      '--circle-width': this.value.length > 2 ? this.value.length * 2.2 + 'vw' : "4vw",
      '--circle-height': '4vw',
      '--circle-font-size': this.value.length > 2 ? '1.6em' : '1.8em',

      '--circle-width-big1': this.value.length > 2 ? this.value.length * 3 + 'vw' : "4vw",
      '--circle-height-big1': '4vw',
      '--circle-font-big1': this.value.length > 2 ?  '1.2em' : '1.4em',

      '--circle-width-big2': this.value.length > 2 ? this.value.length * 3.5 + 'vw' : "8vw",
      '--circle-height-big2': '8vw',
      '--circle-font-big2': this.value.length > 2 ?  '1.2em' : '1.7em',

      '--circle-width-big3': this.value.length > 2 ? this.value.length * 7 + 'vw' : "10vw",
      '--circle-height-big3': '10vw',
      '--circle-font-big3': this.value.length > 2 ?  '1.4em' : '1.4em',

      '--circle-width-big4': this.value.length > 2 ? this.value.length * 9 + 'vw' : "15vw",
      '--circle-height-big4': '15vw',
      '--circle-font-big4': this.value.length > 2 ?  '1.4em' : '1.4em',

      '--circle-width-big5': this.value.length > 2 ? this.value.length * 12 + 'vw' : "15vw",
      '--circle-height-big5': '15vw',
      '--circle-font-big5': this.value.length > 2 ?  '1.4em' : '1.4em',
    }
  },
},

data()  {
  return  {
    mouseX: {
      type: Number,
      default: 5,
    },

    scaleRatio: 0,

    leftData: Number,
    topData: Number,

    width: Number,
    height: Number,



    isSelected: false,
    isGuessed: false,
    isError: false
  }
},

created() {
  this.leftData = this.left;
  this.topData = this.top;
},

  methods: {
  onMousemove(e) {
    this.mouseX = e.clientX
  },

  clickEvent()  {
       if (this.index === this.currentIndex)  {
        this.isGuessed = true;

        let index = this.secret.indexOf(this.value);
        let newSecret = this.secret.substring(index + this.value.length);

        this.action(newSecret, this.index);


      } else  {
         this.isError = true;
         this.$forceUpdate();

         let self = this;
         setTimeout(function() {
           //remove the class so animation can occur as many times as user
           // triggers event, delay must be longer than the animation duration and any delay.
           self.isError = false;

           this.style.color = 'red !important';
         }, 600);
       }

      setTimeout( function() {
        this.hide();
      }, 500);
   // }
  }
}


}
</script>

<style scoped>



.split-circle  {
    border: 1px solid white;

    border-radius: 20em;

    padding: 1em;


    display: flex;
    justify-content: center;
    align-items: center;



    /* set default scale */
    scale: var(--scale--ratio-circle);
    /* enable scale animation */
    transition: scale 1.1s ;


    -webkit-animation: floataround 1.1s infinite alternate;
    animation: floataround 1.1s infinite alternate;

    background-color: var(--circle-background-color);
    width: var(--circle-width);
    height: var(--circle-height);
    font-size: var(--circle-font-size);
  }

  .split-circle:hover  {
    cursor: pointer;
    background-color: var(--LIGHT_FONT_COLOR);
    color: var(--PRIMARY_DARK_HARD);


    --scale--ratio-circle: 1.2;
  }
  .guessed-circle  {
    background-color: var(--LIGHT_FONT_COLOR);

    color: var(--PRIMARY_DARK_HARD);

     --scale--ratio-circle: 1.2;
    transition: scale 1.1s ;

    -webkit-animation: bubblePop 0.4s ease;
    -moz-animation: bubblePop 0.4s ease;
    animation: bubblePop 0.4s ease;
    opacity: 0;
  }

  .error-circle  {
    border: 2px solid var(--TERTIARY_MAIN);

    animation-name: bounce;
    animation-duration: .5s;
    animation-delay: 0.25s;

    background-color:  var(--TERTIARY_MAIN) !important;
  }

@keyframes bounce {
  0% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
  37% {
    transform: translateX(5px);
    transform: translateX(5px);
    timing-function: ease-out;
  }
  55% {
    transform: translateX(-5px);
    timing-function: ease-in;
  }
  73% {
    transform: translateX(4px);
    timing-function: ease-out;
  }
  82% {
    transform: translateX(-4px);
    timing-function: ease-in;
  }
  91% {
    transform: translateX(2px);
    timing-function: ease-out;
  }
  96% {
    transform: translateX(-2px);
    timing-function: ease-in;
  }
  100% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
}

@keyframes bubbleWobble {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(0.8);
  }
  40% {
    transform: scale(1.1);
  }
  60% {
    transform: scale(0.95);
  }
  80% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bubblePop {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  20% {
    transform: scale(0);
    opacity: 0.6;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}

@keyframes floataround {
  0% {
    translate: 0;
  }
  100% {
    translate: 0 -8px;
  }
}

@keyframes slidedown {
   0% {
    opacity: 100%;
   }
  100% {
    opacity: 0;
    max-height: 0!important;;;
    max-width: 0;
    width: 0 !important;;
    height: 0 !important;;

   }
}



@media screen and (min-width: 901px) {
  .split-circle {
      width: var(--circle-width-big1);
      height: var(--circle-height-big1);

      font-size: var(--circle-font-big1);
    }
}


@media screen and (min-width: 1500px) {
  .split-circle {
    width: var(--circle-width);
    height: var(--circle-height);

    font-size: var(--circle-font-size);
  }
}


@media screen and (max-width: 900px) {
  .split-circle {
    width: var(--circle-width-big2);
    height: var(--circle-height-big2);

    font-size: var(--circle-font-big2);
  }
}

@media screen and (max-width: 700px) {
  .split-circle {
    width: var(--circle-width-big3);
    height: var(--circle-height-big3);

    font-size: var(--circle-font-big3);
  }
}

@media screen and (max-width: 400px) {
  .split-circle {
    width: var(--circle-width-big4);
    height: var(--circle-height-big4);

    font-size: var(--circle-font-big4);

   }
}


@media screen and (max-width: 350px) {
  .split-circle {
    width: var(--circle-width-big5);
    height: var(--circle-height-big5);

    font-size: var(--circle-font-big5);
  }
}


</style>