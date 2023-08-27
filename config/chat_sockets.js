const socketIO = require("socket.io");

module.exports = (server) => {
  const io = socketIO(server, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"]
        },
    });

  io.on("connection", (socket) => {
    console.log("New Connection received:", socket.id);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });

    socket.on("join_room", function (data) {
      console.log("joining request as received", data);
      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });

      socket.on('send_message', function(data){
        io.in(data.chatroom).emit('receive_message', data);
    });

  });
};
