var socket = io();


var connectionCount = document.getElementById('connection-count');

socket.on('usersConnection', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.id);
  });
}

var voteTally = document.getElementById('current-tally');

socket.on('voteCount', function (votes) {
  voteTally.innerText = 'Vote Tally: ' +
                        ' Denver: ' + votes.A +
                        '________New York: ' + votes.B +
                        '________Moon: ' + votes.C +
                        '________4th Dimension: ' + votes.D 
});

var yourVote = document.getElementById('your-vote');

socket.on('vote', function (vote) {
  if(vote == "A"){
    yourVote.innerText = 'Your vote: Denver (really?)'  
  } else if(vote == "B"){
    yourVote.innerText = 'Your vote: New York (are you sure?)'  
  }else if(vote == "C"){
    yourVote.innerText = 'Your vote: The Moon!'  
  }else if(vote == "D"){
    yourVote.innerText = 'Your vote: 4th Dimension!'  
  }
});