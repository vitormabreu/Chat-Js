var express=require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

app.get('/', function(req, res){
res.send('Server rodando na porta...');
});

//SocketIO
io.on("connection", function (client) {
    console.log('usuário conectado');
});

http.listen(4200, function(){
console.log('listening on port 4200');
});