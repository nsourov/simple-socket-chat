//CONNECT SOCKET ON CLIENT SIDE
const socket = io.connect('http://localhost:3000/');
//INPUTS
let message = document.getElementById('message');
let handle = document.getElementById('handle');

//DOMS
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

//CLICK EVENT
btn.addEventListener('click',()=>{
	socket.emit('chat',{
		message: message.value,
		handle: handle.value
	});
	message.value = '';
	handle.value = '';
});

//TYPING EVENT
message.addEventListener('keypress', ()=>{
	socket.emit('typing', handle.value);
});




//RETRIEVING DATA FORM SERVER SIDE
socket.on('chat', (data)=>{
	//SEND DATA ON DOM
	feedback.innerHTML= '';
	output.innerHTML+= `<p><strong>${data.handle}: ${data.message}</strong></p>`
})

//RETRIEVING DATA FORM SERVER SIDE
socket.on('typing', (typing)=>{
	//SEND DATA ON DOM
	feedback.innerHTML= `<p><em>${typing} is typing...</em></p>`
})