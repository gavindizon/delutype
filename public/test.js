(function gazer() {
    
    webgazer.setGazeListener(function(data, elapsedTime) {
    
        var xprediction = data.x; //these x coordinates are relative to the viewport
        var yprediction = data.y; //these y coordinates are relative to the viewport
        console.log(elapsedTime); //elapsed time is based on time since begin was called
        console.log(xprediction,yprediction);
    }).begin();
                   
})();
