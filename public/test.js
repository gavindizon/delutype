var addGaze = new CustomEvent("addGaze");

const BOTTOM = window.innerHeight * 0.8;
(function gazer() {
    console.log(webgazer);
    webgazer.setGazeListener(function (data, elapsedTime) {
        //        if (data === null) return;
        var yprediction = data?.y;
        if (yprediction >= BOTTOM) dispatchEvent(addGaze);
    });
})();
