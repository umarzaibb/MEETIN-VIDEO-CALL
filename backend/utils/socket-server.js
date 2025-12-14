let Server = require('socket.io').Server;

let port = 3000;
let io_option = {
  cors: {
    origin: "http://localhost:5173", // Make sure this is the exact URL of your frontend app
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true // This enables cookies and other credentials to be sent
  }
};

let io = new Server(io_option);
console.log(io);

io.on('connection', (socket) => {
   console.log('=> User connected with id: ', socket.id);

   socket.on('disconnect', () => {
     console.log('User disconnected with id: ', socket.id);
   });
});

io.listen(port);
console.log('Socket server listening on port 3000');
