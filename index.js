const express = require('express')
const app = express()
var http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});
app.use(express.static(__dirname + '/public'));
http.listen(8080, () => {
    console.log('Listen on port 8080!')
})


