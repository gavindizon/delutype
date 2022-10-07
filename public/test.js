var addGaze = new CustomEvent("addGaze");
var removeGaze = new CustomEvent("removeGaze");

const BOTTOM = window.innerHeight * 0.8;
var isLookingDown = false;

(function gazer() {
    webgazer.setGazeListener(function (data, elapsedTime) {
        //        if (data === null) return;
        var yprediction = data?.y;
        if (yprediction >= BOTTOM) {
            if (!isLookingDown) {
                dispatchEvent(addGaze);
                isLookingDown = true;
            }
        } else {
            if (!!isLookingDown) {
                dispatchEvent(removeGaze);
                isLookingDown = false;
            }
        }
    });
})();
