const five = require("johnny-five");
const board = new five.Board();


board.on("ready", function() {
    const proximity = new five.Proximity({
        controller: "HCSR04",
        pin: 7
    });
    proximity.on("data", function() {
        if (this.cm <= 20){
            console.log(this.cm)
        }
    });

    // proximity.on("change", function() {
    //     console.log("The obstruction has moved.");
    // });
});