module.exports = function(io) {
    io.on('connection', (socket) => {
        var currentdate = new Date();
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
          + (currentdate.getMonth()+1)  + "/"
          + currentdate.getFullYear() + " @ "
          + currentdate.getHours() + ":"
          + currentdate.getMinutes() + ":"
          + currentdate.getSeconds();
        console.log('a user connect', datetime)
        var message = socket.handshake.query['message'];
        console.log(message);
        console.log(socket.id)

        io.to(socket.id).emit('message', 'hehe from server');
   });
}