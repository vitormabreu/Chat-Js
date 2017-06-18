var express=require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

app.use(express.static('./assets'));
app.use(express.static('./node_modules'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//SocketIO evento de conexão
io.on("connection", function (client) {
	client.on("join", function(name){
		console.log("Joined: " + name);
		clients[client.id] = name;
		client.emit("update", "Você acaba de se conectar ao chat.");
		client.broadcast.emit("update", name + " entrou no chat.")
	});

	//SocketIO evento de envio de mensagens
	client.on("send", function(msg){
		console.log("Message: " + msg);
		client.broadcast.emit("chat", clients[client.id], msg);
	});
	
	//SocketIO evento de desconexão
	client.on("disconnect", function(){
		console.log("Disconnect");
		io.emit("update", clients[client.id] + " saiu da sala.");
		delete clients[client.id];
	});
});

http.listen(4200, function(){
	console.log('server escutando na porta 4200');
});