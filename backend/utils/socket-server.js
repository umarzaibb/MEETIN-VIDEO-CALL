let Server = require("socket.io").Server;

function sendConnectedUser(meetingID) {
  for (let i = 0; i < meetings[meetingID].length; i++) {
    let obj = {};
    for (let j = 0; j < meetings[meetingID].length; j++) {
      obj[meetings[meetingID][j]] = usernames[meetings[meetingID][j]];
    }
    io.to(meetings[meetingID][i]).emit("get-connected-users", {
      allUsers: obj,
    });
  }
}

function join_meeting ({ socketID,meetingID, username })  {
    if (meetings[meetingID]) {
      meetings[meetingID].push(socketID);
    } else {
      meetings[meetingID] = [socketID];
    }

    usernames[socketID] = username;
    sendConnectedUser(meetingID);
  }

function disconnect ({socketID})  {
    delete usernames[socketID];
    Object.entries(meetings).forEach(([Key, val]) => {
      if (val.includes(socketID)) {
        let index = val.indexOf(socketID);
        meetings[Key].splice(index, 1);
        sendConnectedUser(Key);
      }
    });
    console.log(usernames);
    console.log(meetings);
    console.log(
      `*********> User :${socketID} disconnected to socket.io <*********`
    );
  }

let meetings = {}; //syntax: meetings= { meetingID: users[] }
let usernames = {}; //syntax: usernames= {socketID: username}
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

  let socketID=socket.id;
  console.log(
    `=============> User :${socket.id} connected to socket.io <===========`
  );

  socket.on("join-meeting", ({ meetingID, username})=> {
    join_meeting({socketID,meetingID, username});
  });

  socket.on('signal-ice-candidate', ({ice, senderID, receiverID})=>{
        io.to(receiverID).emit('signal-ice-candidate', {ice, senderID});
  })
  
   socket.on('signal-offer', ({offer, senderID, receiverID})=>{
        io.to(receiverID).emit('signal-offer', {offer, senderID});
  })

  socket.on('signal-answer', ({answer, senderID, receiverID})=>{
        io.to(receiverID).emit('signal-answer', {answer, senderID});
  })

  socket.on("disconnect", ()=> {disconnect({socketID})});
});

io.listen(port);
console.log("Socket server listening on port 3000");
