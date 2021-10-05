const socket = io();
//const users = [];
const {username} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
});


const sendform = document.getElementById("send-form");
const sendmsg = document.getElementById("msg");
const userlist = document.getElementById("users");

//new user join
socket.emit("new-user" , {username});

//get users
socket.on("online-users", ({users}) => {
    console.log(users);
    outputUsers(users);
})

//listen to msg from server
socket.on("message" , msg => {
    console.log(msg);
    outputMessage(msg);
});


socket.on("user-connected" , msg => {
    console.log(msg);
});

//submitting msg
sendform.addEventListener("submit" , (e) => {
    e.preventDefault();
    //get input txt
    const msg = sendmsg.value;
    //emit msg to server
    socket.emit("chatMsg" , msg)
    //clear input field
    sendmsg.value = '';
    sendmsg.focus();
})

//output msg to DOM
function outputMessage(msg) {
    const div = document.createElement('div');
    div.className = "message";
    div.innerHTML = `<span>${msg.username}</span>: ${msg.txt}`;
    const chatcontent = document.getElementById("chatcontent");
    chatcontent.appendChild(div);
};
//
function outputUsers(users) {
    console.log =(users);
    userlist.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join()}`;
}


