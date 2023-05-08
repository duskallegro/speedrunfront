<template>
  <div id="wrapper" ref="wrapper">

    <TestCircle2 v-for="(circle, i) in this.circles.length"
                 :value = this.circles[i] :key="i"
                :left="this.coordinates[i].left"
                :top="this.coordinates[i].top"

    />

  </div>
</template>

<script>
import TestCircle2 from "./TestCircle2";

export default {
  name: "TestComponent2",
  components: {TestCircle2},
  data() {
    return {
      circles: ['A', 'B', 'C', 'D', 'E', 'F'],
      coordinates: []
    }
  },

    created() {
    console.log("circles: " + this.circles);

    let wrapperWidth = 500;
    let wrapperHeight = 100;

    let circleWidth = 50;
    let circleHeight = 50;

    for (let i = 0; i < this.circles.length; i++) {
      let circleCoordinates = {};

      let isValid = false;
      do {
        isValid = false;

        circleCoordinates.left = (this.randomInRange(0, 10)).toString() + '%';
        circleCoordinates.top = (this.randomInRange(0, 10)).toString() + '%';
        circleCoordinates.width = 50;
        circleCoordinates.height = 50;

        circleCoordinates.x = wrapperWidth * circleCoordinates.left / 100;
        circleCoordinates.y = wrapperHeight * circleCoordinates.top / 100;

        isValid = !this.overlaps(this.coordinates, i, circleCoordinates);
      } while (!isValid);

      this.coordinates.push(circleCoordinates);
    }
  },

  methods: {
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

  }

}
</script>

<style scoped>

  #wrapper  {
    margin: 2em;

    height: 20%;
    min-height: 20%;

    width: 100%;
    min-width: 100%;

    background-color: darkblue;

    display: flex;
    flex-wrap: wrap;

    }
</style>