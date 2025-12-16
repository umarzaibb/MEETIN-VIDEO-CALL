let Server = require("socket.io").Server;

function removeSocketFromRoom(socketId, rooms) {
  for (let i = 0; i < rooms.length; i++) {
    const userIndex = rooms[i].user.indexOf(socketId);
    if (userIndex !== -1) {
      rooms[i].user.splice(userIndex, 1);
      rooms[i].username.splice(userIndex, 1);
      return true;
    }
  }
  return false; // Socket not found in any room
}

let room = []; //syntax: room=[roomID, user=[], username=[] ]
let port = 3000;
let io_option = {
  cors: {
    origin: "http://localhost:5173", // Make sure this is the exact URL of your frontend app
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true, // This enables cookies and other credentials to be sent
  },
};

let io = new Server(io_option);

io.on("connection", (socket) => {
  console.log(
    `=============> User :${socket.id} connected to socket.io <===========`
  );

  socket.on("join-meeting", ({ roomID, username }) => {
    let isRoomCreated = room.find((r) => roomID == r.roomID);
    if (!isRoomCreated) {
      let roomObject = {
        roomID: roomID,
        user: [socket.id],
        username: [username],
      };

      room.push(roomObject);
      console.log(room);
    } else {
      room.filter((obj) => {
        if (obj.roomID == roomID) {
          obj.user.push(socket.id);
          obj.username.push(username);
        }
        console.log(room);
      });
    }

    let toSendUser = room.filter((r) => roomID === r.roomID)[0];
    toSendUser.user.forEach((r) => {
      io.to(r).emit("Get-Connected-User", {
        newUsers: toSendUser.user,
        usernames: toSendUser.username,
      });
    });
  });

  socket.on("disconnect", () => {
    console.log(
      `*********> User :${socket.id} disconnected to socket.io <*********`
    );
    let UsersRoom = room.filter(r =>{ return r.user.includes(socket.id)});
    removeSocketFromRoom(socket.id, room);
    
    if(UsersRoom[0]?.user) {
      UsersRoom[0].user.forEach((r) => {
      io.to(r).emit("Get-Connected-User", {
        newUsers: UsersRoom[0].user,
        usernames: UsersRoom[0].username,
      });
    });
    }
  });
});

io.listen(port);
console.log("Socket server listening on port 3000");
