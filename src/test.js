/*
let milliseconds = 0;

let start = new Date().getTime();

function duration(millisecondsData) {
    let milliseconds = millisecondsData % 1000;
    millisecondsData = (millisecondsData - milliseconds) / 1000;

    let seconds = millisecondsData % 60;
    millisecondsData = (millisecondsData - seconds) / 60;

    let minutes = millisecondsData % 60;
    let hours = (millisecondsData - minutes) / 60;

    return [
        format(hours),
        format(minutes),
        format(seconds),
        format(milliseconds)
    ].join(':');
}

function format(n) {
    return (~~n).toString().padStart(2, '0')
}

function updateTime()  {
        milliseconds = new Date().getTime() - start;
        console.log(duration(milliseconds));
}

setInterval(
    updateTime, 0);

/!*
requestAnimationFrame(updateTime);
*!/

*/


function rectanglesOverlap(first, second) {
    console.log("rectanglesOverlap: " + JSON.stringify(first)
        + " and "+ JSON.stringify(second));

    // Determine the coordinates of the edges of both rectangles
    const firstLeft = parseFloat(first.left);
    const firstRight = firstLeft + first.width;
    const firstTop = parseFloat(first.top);
    const firstBottom = firstTop + first.height;

    const secondLeft = parseFloat(second.left);
    const secondRight = secondLeft + second.width;
    const secondTop = parseFloat(second.top);
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
let res = rectanglesOverlap(
    {"left":"355.15345705526903px","top":"21.267565776526894px","width":50,"height":50},

    {"left":"323.0383864822662px","top":"38.18363310409906px","width":50,"height":50}

    );
console.log(res);