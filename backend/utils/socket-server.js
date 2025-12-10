let Server= require('socket.io').Server;

let port=3000;
let io_option={
  cors: {
    origin: ["https://localhost:5173"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
}

let io=new Server(io_option);
console.log(io);

io.on('connection', (socket)=>{
   console.log( '=> User connected in with id: ', socket.id );
});

io.on('disconnect', (socket)=>{
  console.log( 'User disconnected with id: ', socket.id );
})

io.listen(port);