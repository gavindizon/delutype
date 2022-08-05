var addGaze = new CustomEvent("addGaze");
console.log(window);
// window.addEventListener(
//     "addGaze",
//     () => {
//         console.log("Test");
//     },
//     false
// );

(function gazer() {
    webgazer
        .removeMouseEventListeners()
        .setGazeListener(function (data, elapsedTime) {
            if (data === null) return;
            var xprediction = data.x; //these x coordinates are relative to the viewport
            var yprediction = data.y; //these y coordinates are relative to the viewport
            //console.log(elapsedTime); //elapsed time is based on time since begin was called
            //console.log(yprediction);
            if (yprediction >= 600) {
                dispatchEvent(addGaze);
            }
        })
        .begin();
})();
