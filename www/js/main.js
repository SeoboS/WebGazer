insertAndSort = function(elem, arr){
    for (i = 0; i < arr.length; ++i){
        if (elem > arr[i]){
            for (j = i+1; j < arr.length; ++j){ //moves all other element
                arr[j+1] == arr[j]
            }
            arr[i] = elem
        }
    }
}

window.onload = function() {
    var mem = []
    var med = []
    var avgNum = 2
    //start the webgazer tracker
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (data != null && data['x'] > 0 && data['y'] > 0 && data['x'] < 1920 && data['y'] < 1080){
                mem.push([data['x'], data['y']])
                // med.push([data['x'], data['y']])
                // med.insertAndSort([])
                // if (med.length == 4){

                // }
                if ( mem.length == avgNum){
                    xsum = 0
                    ysum = 0
                    mem.forEach(function(item, index) {
                        xsum += item[0]
                        ysum += item[1]
                    })
                    xavg = (xsum / avgNum) | 0
                    yavg = (ysum / avgNum) | 0
                    console.log("xval: " + String(xavg) + ", yval: " + String(yavg))
                    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
                    var url = 'http://localhost:5000/move';
                    xmlhttp.open("POST", url);
                    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
                    xmlhttp.send(JSON.stringify({ "x": String(xavg), "y": String(yavg) }));
                    mem = []
                }
            }
            /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
             //console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */


    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
};

window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    ClearCalibration();
    PopUpInstruction();
}
