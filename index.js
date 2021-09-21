const express = require('express')
const app = express()
var http = require('http').createServer(app);


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


http.listen(8080, () => {
    console.log('Listen on port 8080!')
})


