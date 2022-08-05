import React from "react";
import { useEffect } from "react";
import webgazer from "../../webgazer/src/index.mjs";

const WebGazer = () => {
    useEffect(() => {
        webgazer
            .setGazeListener(function (data: any, elapsedTime: any) {
                console.log(data, elapsedTime);
                if (data == null) {
                    return;
                }
                var xprediction = data.x; //these x coordinates are relative to the viewport
                var yprediction = data.y; //these y coordinates are relative to the viewport
                console.log(elapsedTime); //elapsed time is based on time since begin was called
            })
            .begin();
        webgazer
            .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
            .applyKalmanFilter(true);
    }, []);

    return <div>index</div>;
};

export default WebGazer;
