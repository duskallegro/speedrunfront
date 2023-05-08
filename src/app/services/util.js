/**
 * Returns a random number between min
 * (inclusive) and max (inclusive)
 */

module.exports = {
    getRandomInRange(min, max) {
        return Math.floor((Math.random())*(max-min+1))+min;
    }
}