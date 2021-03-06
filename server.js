const http = require('http');
const express = require('express');



const app = express();

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(_dirname + '/public/index.html');
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, function (){
  console.log('listening on port ' + port);
})

module.exports = server;

const socketIo = require('socket.io');
const io = socketIo(server);

var votes = {};

io.on('connection', function (socket){
  console.log('a user has connected!', io.engine.clientsCount);
  io.sockets.emit('usersConnection', io.engine.clientsCount);
  io.sockets.emit('voteCount', countVotes(votes));
  socket.emit('statusMessage', 'You have connected.');
  
  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    console.log(votes);
    io.sockets.emit('usersConnection', io.engine.clientsCount); 
    io.sockets.emit('voteCount', countVotes(votes));
  });
  
  socket.on('message', function (channel, message) {
    if(channel === 'voteCast'){
      votes[socket.id] = message;
      console.log(votes);
      io.sockets.emit('voteCount', countVotes(votes));
      socket.emit('vote', message);
    }
  });
});

function countVotes(votes) {
  debugger;
  var voteCount = {
    A: 0,
    B: 0,
    C: 0,
    D: 0
  };
  for (vote in votes) {
    voteCount[votes[vote]]++
  }
  return voteCount;
}


