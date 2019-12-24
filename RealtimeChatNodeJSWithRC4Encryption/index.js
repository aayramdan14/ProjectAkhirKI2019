const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var startTimes;
var enkripsi;
var latency;
app.get('/', function(req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('enkripsi', function(enc, startTime) {
      startTimes = startTime;
      enkripsi = enc;
      latency = Date.now() - startTimes;
      console.log(socket.username + ': ' + enc + ' Start time : ' + startTime + ' end Time : ' + Date.now() + ' : ' + latency);
    });

    // socket.on('endtime', function(endTime) {
    //     endTime = Date.now();
        // latency = endTime - startTimes;
    //     console.log(socket.username + ' : ' + enkripsi + ' : ' + enkripsi.length + ':  Start time : ' + startTimes + ' end Time : ' + endTime + ' : ' + latency);  
    // });

    socket.on('chat_message', function(message) {     
        io.emit('chat_message', socket.username, message);
    });

});


const server = http.listen(8000, function() {
    console.log('listening on 10.146.242.67:8000');
});


// function rc4(key, str) {
//     var s = [], j = 0, x, res = '';
//     for (var i = 0; i < 256; i++) {
//       s[i] = i;
//     }
//     for (i = 0; i < 256; i++) {
//       j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
//       x = s[i];
//       s[i] = s[j];
//       s[j] = x;
//     }
//     i = 0;
//     j = 0;
//     for (var y = 0; y < str.length; y++) {
//       i = (i + 1) % 256;
//       j = (j + s[i]) % 256;
//       x = s[i];
//       s[i] = s[j];
//       s[j] = x;
//       res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
//     }
//     return res;
//   }