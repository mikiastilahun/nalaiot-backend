const five = require("johnny-five");
const board = new five.Board({ repl: false });
const app = require('express')()
const http = require('http').Server(app);
const io = require('socket.io')(http);



board.on("ready", function() {

io.on('connection',(socket) => {


    const proximity = new five.Proximity({
        controller: "HCSR04",
        pin: 7
    });


    const greenLed = new five.Led(8)
    const redLed = new five.Led(4)
    const yellowLed = new five.Led(2)

    
    proximity.on("data", function (){
        if (this.cm <= 50){
            let data = this.cm
            // the important

            io.emit('sensorData',data)
        }
    });



        socket.on("switchGreen",(data)=>{
            data? greenLed.on(): greenLed.off()
        })


           socket.on("switchYellow",(data)=>{
            data? yellowLed.on(): yellowLed.off()
        })

           socket.on("switchRed",(data)=>{
            data? redLed.on(): redLed.off()
        })
        
    })
})



http.listen(3001, function(){
    console.log('listening on *:3001');
});
