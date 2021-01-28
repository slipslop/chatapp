const app = require('express')(); // const app = express()

const http = require('http').Server(app);

const io = require('socket.io')(http);

let users = [];

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');

});

io.on('connection', (socket) => {

    console.log('a user connected');
    
    io.emit('new connection');

    socket.on('chat message', (msg) => {
       io.emit('chat message', {msg: msg, username : socket.username});
    });

    socket.on('set username', function(username, callback) {
        console.log('setting username ' + username);
        if(users.includes(username)) {
            callback(false);
        }
        socket.username = username;
        users.push(username);
        callback(true);
        io.emit('user joined', username);
    });

});

http.listen(process.env.PORT || 5000, () => {

});