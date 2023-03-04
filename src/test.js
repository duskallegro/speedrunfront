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

/*
requestAnimationFrame(updateTime);
*/

