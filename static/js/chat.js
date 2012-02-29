var socket;
function initialize(email, channel)
{
    console.log(email);
    console.log(channel);
    console.log(location);
    socket = new io.Socket(location.hostname, {port:12421});
    socket.on('message', function(data){
         console.log(data);
	alert(data);
    });
    socket.on('connect', function(){
        console.log("Imma connectad!");
        console.log(socket);
        socket.send({email: email, channel:channel});
    });
    socket.connect();
}