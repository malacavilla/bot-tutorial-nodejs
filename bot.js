var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/,
      botSpreadsheet = "robot spreadsheet",
      botCookbook = "robot cookbook";

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    robotSpeak(cool());
    this.res.end();
  } else if(request.text && botSpreadsheet == request.text) {
    this.res.writeHead(200);
    robotSpeak("https://docs.google.com/spreadsheets/d/1TyjcRLjlfaitQaMijvCZBXy2P2pbgjkahQOC6FgaG_A/edit#gid=2054962079");
    this.res.end();
  } else if(request.text && botCookbook == request.text) {
    this.res.writeHead(200);
    robotSpeak("https://docs.google.com/document/d/1-FOsecUkDyI_y_GTHPfJvw9y3vgLdaLa5ODo6DpT_fg/edit");
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function robotSpeak(botResponse) {
  var options, body, botReq;

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
