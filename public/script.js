var socket = io();

let btn = document.getElementById('btn');
btn.onclick = function exce() {
    socket.emit('from_client');
}

socket.on('from_server', () => {
    console.log("Collected a event from server");
    const div = document.createElement('div');
    div.innerText = 'New Event from Server';
    document.body.appendChild(div);
});