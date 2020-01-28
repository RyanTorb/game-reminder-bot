var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      gameRegex = /^\game$/;

  if(request.text && gameRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;
  var nextGame = new Date();
  nextGame.setMonth(1);
  var firstGame = new Date();
  firstGame.setMonth(1);
  firstGame.setDate(9);
  var secondGame = new Date();
  secondGame.setMonth(1);
  secondGame.setDate(16);
  var thirdGame = new Date();
  thirdGame.setMonth(1);
  thirdGame.setDate(23);
  if(today.getDate() < firstGame.getDate()){
    nextGame.setDate(firstGame.getDate());}
  else if(today.getDate() < secondGame.getDate()){
    nextGame.setDate(secondGame.getDate());}
  else if(today.getDate() < thirdGame.getDate()){
    nextGame.setDate(thirdGame.getDate());}
  if(today.getMonth() < nextGame.getMonth() || (today.getMonth()==nextGame.getMonth() && today.getDate() < thirdGame.getDate())){
    var date1 = "Great question! Our next game is on " + today.getFullYear()+'-'+(today.getMonth()+1)+'-'+nextGame.getDate();}
  else{
    var date1 = "There is no next game! I'll see y'all next season! (Unless there are playoff games and Ryan didn't update my code, in which case blame him and not me)";}
  botResponse = date1;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
