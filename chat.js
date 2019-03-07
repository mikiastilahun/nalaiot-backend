const app = require('express')()
const http = require('http').Server(app);
const io = require('socket.io')(http)

io.on('connection',(socket) => {
    socket.on('sensor data',(data)=>{
        io.emit('sensor data',(data))
    })
})

http.listen(3001, function(){
    console.log('listening on *:3001');
});