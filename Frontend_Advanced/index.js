const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const formatMsg = require('./tool/msg');
const {joinUser,getCurUser,userleave,getOnlineUser} = require('./tool/users')



//set static webpage
app.use(express.static(path.join(__dirname , "UI")));



//execute when Client connects
io.on('connection', socket => {
    socket.on("new-user", ({username}) => {
        const user = joinUser(socket.id , username);
        socket.broadcast.emit("message" , formatMsg("" , `New user ${user.username} joins the chat.`));
        io.emit("online-user" , {users: getOnlineUser()});
    });
  

    //listen for chatMsg
    socket.on("chatMsg", msg => {
        const user = getCurUser(socket.id);
        io.emit("message" ,formatMsg(user.username, msg));
    });

    //execute when client disconnect
    socket.on("disconnect", () => {
        const user = userleave(socket.id)
        if(user) {
            io.emit("message" , formatMsg("" ,`User ${user.username} has left the chat`));
        }
        io.emit("online-user" , {users: getOnlineUser()});
    });

    
    
});



server.listen(3000, () => {
    console.log("server started at http://localhost:3000");
});



