const express = require('express');
const socket = require('socket.io');
const app = express();
const server = app.listen(3000,()=>{console.log('SERVER RUNNING ON PORT 3000')});

app.use(express.static('public'));

//SERVER SIDE SOCKET IO SETTING
 //CONNECT SOCKET WITH APP LISTEN
const io = socket(server);
io.on('connection',(socket)=>{
	console.log('Socket Connected');
	//COLLECT DATA FROM CLIENT SIDE
	socket.on('chat', (data)=>{
		//SEND THAT DATA TO THE CLIENT SIDE (FOR SENDING, IT WILL BE'sockets')
		io.sockets.emit('chat', data)
	});

	//COLLECT TYIPING STATUS FROM CLIENT SIDE
	socket.on('typing', (status)=>{
		//SEND THAT STATUS TO THE CLIENT SIDE (FOR BROADCAST, IT WILL BE'socket' NO io.)
		socket.broadcast.emit('typing', status)
	});
})
