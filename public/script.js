var socket = io();

let btn = document.getElementById('btn');
let inputMsg = document.getElementById('newmsg');
let msgList = document.getElementById('msglist');

btn.onclick = function exce() {
    // client sending a message
    socket.emit('msg_send', { 
        msg: inputMsg.value
    })
}

// all clients have listner and it'll active they'll receive message
socket.on('msg_rcvd',(data) => {
    let limsg = document.createElement('li');
    limsg.innerText = data.msg;
    msgList.appendChild(limsg)
})