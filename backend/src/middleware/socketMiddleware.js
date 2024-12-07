const socketIO = require("socket.io");
const { ANNOTATION_TOOL_URL } = require("../config/config");

const initializeSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: `${ANNOTATION_TOOL_URL}`, // Allow your frontend's origin
      methods: ["GET", "POST"], // Allowed HTTP methods
      credentials: true, // Allow credentials if needed
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("annotation_added", (data) => {
      socket.broadcast.emit("annotation_added", data); // Broadcast to other clients
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
};

module.exports = initializeSocket;
