<template>
  <div v-show="this.isLoaded" id="split-wrapper"  v-on:click.stop="next">


    <div id="translation-area" class="color-text">
      {{this.splitPair.splitPair.translation}}
    </div>

    <div id="circle-area" v-show="!this.isGuessed">

      <SplitCircle v-for="(circle, i) in this.splits" ref="circles"
               :value = circle.value :key="i"
                   :left="this.margins[i].left"
                   :top="this.margins[i].top"
                   :secret="this.secret" :action="updateSecret"
                   :index = "this.splits[i].index"
                   :currentIndex="this.currentSplitIndex"

      />
    </div>

    <div v-show="isGuessed" id="parrot"  >
      <img :src="require('@/app/assets/parrot.gif')" />
    </div>

    <div id="secret-area" v-on:click="this.secret='oof'">
      {{this.displayedSecret}}
    </div>



  </div>

  <div v-show="!isLoaded">
    <AppSpinner/>
  </div>


</template>



<script>
import UserService from "@/app/services/UserService";
import PracticeService from "@/app/services/PracticeService";
import SplitCircle from "@/deck/practice/splitword/component/SplitCircle";
import AppSpinner from "@/app/component/spinner/AppSpinner";
import myImg from '@/app/assets/parrot.gif';

export default {
name: "SplitwordPage",
  components: {SplitCircle, AppSpinner},
  props: {
  padId: Number,
  username: String
},

data() {
  return {
    parrot: Object,

    isLoaded: false,
    isGuessed: false,

    splitPair: null,
    splits: null,
    translation: null,

    margins: [],

    splitStatuses: [],

    originalSecret: "",
    secret: "",
    displayedSecret: "",

    currentSplitIndex: 0
  }
},

async beforeCreate() {
  this.parrot = myImg;

  let userId = await UserService.getUserByUsername(this.username);
  let result = await PracticeService.getSplitPair(this.padId, userId);

  this.isGuessed = false;
  this.splitPair = result;
  this.splits = this.splitPair.splits;
  console.log(JSON.stringify(result));

  this.splitStatuses = this.splitPair.splits.map((e) => false);

  this.splits = this.splits.map((split, index) => {
    let result = split;
    result.index = index;
    return result;
  });
  this.splits = this.shuffle(this.splits);
  this.translation = this.splitPair.splitPair.translation;

  //this.secret = this.splitPair.splitPair.foreignWord.map((c) => " _ ");
  this.originalSecret = this.splitPair.splitPair.foreignWord;
  this.secret = this.splitPair.splitPair.foreignWord;
  this.displayedSecret = this.secret.split('').map((letter) =>  {
    return '_';
  }).join('');

  this.isLoaded = true;

  let maxMargin = 80 / this.splits.length;
  for (let i = 0; i < this.splits.length; i++) {
    let circleCoordinates = {};

    let isValid = false;
    do {
      isValid = false;

      circleCoordinates.left = (this.randomInRange(5, maxMargin)).toString() + '%';
      circleCoordinates.top = (this.randomInRange(5, Math.min(10, maxMargin))).toString() + '%';
      circleCoordinates.width = 50;
      circleCoordinates.height = 50;

      circleCoordinates.x = circleCoordinates.left / 100;
      circleCoordinates.y = circleCoordinates.top / 100;

      isValid = !this.overlaps(this.margins, i, circleCoordinates);
    } while (!isValid);

    this.margins.push(circleCoordinates);
  }

},



methods: {
  next() {
    if (this.isGuessed) {
      this.$router
          .push({path: this.$route.path})
          .then(() => {
            this.$router.go()
          })
    }
  },

  updateSecret(newSecret, index)  {
    this.secret = newSecret;
    this.splitStatuses[index] = true;

    // find the last opened split
    let lastIndex = -1;
    for (let i = 0; i < this.splitStatuses.length; i++) {
      if (this.splitStatuses[i])  {
        lastIndex = i;
      }
    }

    if (lastIndex !== -1)  {
      let lastSplit = this.splitPair.splits[lastIndex];
      this.displayedSecret = this.originalSecret.substring(0, lastSplit.end + 1);
    }

    this.currentSplitIndex++;

    if (this.currentSplitIndex >= this.splitPair.splits.length)  {
      this.isGuessed = true;

     /*  let fanfares = new Audio("http://localhost:8082/speech?text=fanfares");
      fanfares.play();*/

      let original = this.originalSecret;
      let beat = new Audio("http://localhost:8082/speech?text=" + original);
      beat.play();
   /*
      setTimeout(function() {
      /!*  let beat = new Audio("http://localhost:8082/speech?text=" + original);
        beat.play();*!/
      }, 1300);*/
    }
  },

  shuffle(arr) {
    let result = arr.reduce((a,c,i,r,j)=>
        (j=Math.random()*(a.length-i)|0,[a[i],a[j]]=[a[j],a[i]],a),[...arr]);
    return result;
  },

    randomInRange: function(min, max)  {
      return Math.random() * (max - min + 1) + min;
    },

    overlaps(coordinates, size, rectangle)  {
      // Loop through all the rectangles in the coordinates array
      for (let i = 0; i < size; i++) {
        // Create a rectangle object for the other rectangle


        // Check whether the two rectangles overlap using the rectanglesOverlap function
        if (this.rectanglesOverlap(rectangle, coordinates[i])) {
          return true;
        }
      }

      // None of the rectangles overlap
      return false;
    },

    rectanglesOverlap(first, second) {
      console.log("rectanglesOverlap: " + JSON.stringify(first)
          + " and "+ JSON.stringify(second));

      // Determine the coordinates of the edges of both rectangles
      const firstLeft = parseFloat(first.x);
      const firstRight = firstLeft + first.width;
      const firstTop = parseFloat(first.y);
      const firstBottom = firstTop + first.height;

      const secondLeft = parseFloat(second.x);
      const secondRight = secondLeft + second.width;
      const secondTop = parseFloat(second.y);
      const secondBottom = secondTop + second.height;

      // Check if any of the edges of the two rectangles overlap
      if (firstLeft < secondRight &&
          firstRight > secondLeft &&
          firstTop < secondBottom &&
          firstBottom > secondTop) {
        // The rectangles overlap
        console.log("rectanglesOverlap: true");
        return true;
      }

      // The rectangles don't overlap
      console.log("rectanglesOverlap: false");
      return false;
    }
  },


  mounted() {
    this.$nextTick(()=>{
      console.log("circles: " + JSON.stringify(this.$refs));

      for (let i = 0; i < this.$refs.circles.length; i++) {
        let circle = this.$refs.circles[i];
        console.log(circle);
        circle.greet = "WOW";
      }
    });
 },



}
</script>

<style  >
:root {
  --scale--ratio-circle: 1;
}

#parrot  {
  margin-top: 20px;

  height: 40vh;
  min-height: 40vh;

 }

#secret-area  {
  margin-top: 4em;
  font-size: 2em;
}

  #translation-area  {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 2em;
  }

  #split-wrapper  {
    display: flex;
    flex-direction: column;
    align-items: center;


    width: 95%;
/*
    background-color: blue;
*/
  }

  #circle-area  {
/*
    background-color: red;
*/
    margin-top: 20px;

    width: 40%;
    min-width: 40%;

    height: 40vh;
    min-height: 40vh;

    display: flex;
    flex-wrap: wrap;
  }

  @media screen and (min-width: 1200px) {
    #circle-area  {
      width: 25% !important;
     }
  }


  @media screen and (min-width: 900px) {
    #circle-area  {
      width: 30%;
    }
  }

  @media screen and (max-width: 600px) {
    #circle-area  {
      width: 50%;
    }
  }

  @media screen and (max-width: 500px) {
    #circle-area  {
      width: 70% !important;
    }
  }

  @media screen and (max-width: 400px) {
    #circle-area  {
      width: 80%;
    }

    #secret-area  {
      margin-top: 1.5em;

      font-size: 1.5em;
    }
  }

  @media screen and (max-width: 350px) {
    #circle-area  {
      width: 90%;
    }
  }

  @media screen and (max-width: 300px) {
    #circle-area  {
      width: 95%;
/*
      background-color: green;
*/
    }
  }


</style>