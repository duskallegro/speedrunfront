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

data()  {
  return  {
    mouseX: {
      type: Number,
      default: 5,
    },

    scaleRatio: 0,

    leftData: Number,
    topData: Number,

    styleObject:  {
      'margin-left': this.leftData,
      'margin-top': this.topData,



    },

    isSelected: false,
    isGuessed: false,
    isError: false


  }
},

created() {
  this.leftData = this.left;
  this.topData = this.top;



  this.styleObject = {
    'margin-left': this.leftData,
    'margin-top': this.topData,
    left: 0,
    top: 0
  };
},

  methods: {
  onMousemove(e) {
    this.mouseX = e.clientX
  },

  clickEvent()  {
/*
    this.isSelected = !this.isSelected;
*/

   // if (this.isSelected)  {
     // if (this.secret.trim().startsWith(this.value))  {
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
    min-width: 10vw;
    max-width: 10vw;

    min-height: 10vw;
    max-height: 10vw;

    border: 1px solid white;
    border-radius: 20em;

    padding: 1em;


    display: flex;
    justify-content: center;
    align-items: center;

  /*  -webkit-animation: floataround 1.1s infinite  alternate;
    animation: floataround 1.1s infinite  alternate;

    transform: scale(var(--scale--ratio-circle)) translate(0%, 0%);
    transform-origin: 0% 0%;
    transition: transform .9s;*/

    /* set default scale */
    scale: var(--scale--ratio-circle);
    /* enable scale animation */
    transition: scale 1.1s ;


    -webkit-animation: floataround 1.1s infinite alternate;
    animation: floataround 1.1s infinite alternate;

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
      min-width: 4vw;
      max-width: 4vw ;

      min-height: 4vw;
      max-height: 4vw;

      font-size: 1.5em;
     }
  }

  @media screen and (max-width: 900px) {
    .split-circle {
      min-width: 8vw;
      max-width: 8vw;

      min-height: 8vw;
      max-height: 8vw;

      font-size: 1.5em;

    }
  }

  @media screen and (max-width: 700px) {
    .split-circle {
      min-width: 10vw;
      max-width: 10vw;


      min-height: 10vw;
      max-height: 10vw;

      font-size: 1.2em;
    }
  }

  @media screen and (max-width: 400px) {
    .split-circle {
      min-width: 15vw;
      max-width: 15vw;

      min-height: 15vw;
      max-height: 15vw;

     }
  }


  @media screen and (max-width: 350px) {
    #circle-area  {
      width: 90%;
    }

    .split-circle {
      min-width: 15vw;
      max-width: 15vw;

      min-height: 15vw;
      max-height: 15vw;
    }
  }

</style>