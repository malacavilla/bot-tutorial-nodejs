var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

var broadcastUsers = ["23871134", "21638470", "26657376"]; //Mala, wieso, ROKC mod

// List out botIds with GroupId as the key and BotId as the value
// Used when sending out messages, will pass along the request.group_id to know what bot should send
var botIDs = {};
botIDs["13618173"] = "e7a98860bd11119968d528468e"; // MODS
botIDs["13665537"] = "8c91f6d78c972ded7f1bae5794"; // Armenia
botIDs["17242956"] = "6b12ddf10a062c0f26f16bd324"; // Team 1
botIDs["17242959"] = "1951304f8e3615db48bf024175"; // Team 2
botIDs["17242960"] = "390f206b49dc5a8b09ef0f177f"; // Team 3
botIDs["17242964"] = "89e5faf8a51b78733748b64533"; // Team 4
botIDs["17242966"] = "31deb321735fde7192e6ac275e"; // Team 5
botIDs["17242967"] = "23b456e67df0bdfec471b592fc"; // Team 6
botIDs["17242970"] = "460a97f112209000a22e96c692"; // Team 7
botIDs["17242971"] = "67a55cf1715e5387a05740e5e0"; // Team 8
botIDs["17242974"] = "f5e47a1f3db341db3441891d58"; // Team 9
botIDs["17242976"] = "0c82a6aedf02b956ea778b2c7f"; // Team 10
botIDs["17242980"] = "6ef4e564b0608b376f86663568"; // Team 11
botIDs["17242983"] = "660c1021ae357eaff3534cd8a3"; // Team 12
botIDs["17242985"] = "e97bd4f938ff21c17d5345eac3"; // Team 13
botIDs["17242987"] = "1ad505b5ed10f10d2c8ec63df3"; // Team 14

var spreadSheets = {};
spreadSheets["17242956"] = "https://docs.google.com/spreadsheets/d/1fsDkk0PB_Tyftzmtrtuc06QbYkLuTvdeb0EIoPwmlfM";
spreadSheets["17242959"] = "https://docs.google.com/spreadsheets/d/1iOZ1SGJi1Wt1zFz_KkXt2xT9vHyKLS4sgTuIE_FBNFc/edit#gid=0";
spreadSheets["17242960"] = "https://docs.google.com/spreadsheets/d/1A7o4gxJfpkpIGNY8k4Q5CQQg6F1VB4FQI99X_Q_7TuM/edit";
spreadSheets["17242964"] = "https://docs.google.com/spreadsheets/d/1Is4--oPKYJ_ZrxTkdOrGoBf17bTfkfN19Qv6IlB4zZc/edit";
spreadSheets["17242966"] = "https://docs.google.com/spreadsheets/d/1nauTERjCg2iVXj0wBAeBsnIuPjAHP4KixSmCZXOVnWY/edit";
spreadSheets["17242967"] = "https://docs.google.com/spreadsheets/d/1325KW-lki6vTVlMj-M96bEzUQ2zu_TrYyyS75n90Yfs/edit#gid=0";
spreadSheets["17242970"] = "https://docs.google.com/spreadsheets/d/1z6xBj6cxI7eRybTk_2FO8ekricAtO1wfsivPhAUjfqc/edit";
spreadSheets["17242971"] = "https://docs.google.com/spreadsheets/d/1Qr6iQx9mjLC44LRNbgG9k7EmbbtupXhdIZ0SSqe0qbY/edit";
spreadSheets["17242974"] = "https://docs.google.com/spreadsheets/d/1LAP8zhW4PTsYiy9ivkzLg0Xx-1ZH8LLc9R7yA_4mj5A/edit";
spreadSheets["17242976"] = "https://docs.google.com/spreadsheets/d/1ZOW9p9VQpffvajvnXAI5Gsfdg60CJF0293OPROA6Zlk/edit";
spreadSheets["13670576"] = "https://docs.google.com/spreadsheets/d/1a4BoCi9ESdnS-gRfq6vD0sczt5p9O4iZloNn9v-WdZ4/edit";
spreadSheets["17242980"] = "https://docs.google.com/spreadsheets/d/17GSV-e37isH6EQs875pWkxp3oEH4OoKm-6_ZamQTIQQ/edit";
spreadSheets["17242983"] = "https://docs.google.com/spreadsheets/d/1TMAkgSvavtzEELPOY3ml8TSzK4ZGFV2Duiicb6d_Z-I/edit#gid=0";
spreadSheets["17242985"] = "https://docs.google.com/spreadsheets/d/1IZLjw51ISs0xkUyFi1G4ThTKZZ6CCPf9DhVqYDZjxT0/edit";
spreadSheets["17242987"] = "https://docs.google.com/spreadsheets/d/1gRKcrnr_qAhnlIp0QMoGISFO9bZBdWFwYulojymaPW4/edit";

// Things that change every challenge
var rulesLink = "https://www.reddit.com/r/ROKCFIT/comments/3o5der/rokcfit6_official_rules/";
var standingsLink = "https://docs.google.com/spreadsheets/d/1yaHSN3W2rJ_21QjJLe6GzpH4N7jID0YOZxFYw2w_UjQ/edit#gid=1099722267";

var motivationalQuotes = ["Random teams? Doesn't matter. You all get to be in my swole presence.", "Great Brodin's raven! Lifting is double points! Time to sit on my iron throne.", "Sexist robot says more donkey kicks, less clothing.", "PINTS FOR POINTS!", "Boobalicious female ,work out naked at home. I will coach you via Hangout", "Man up and work out. Feels are for the weak.", "No butt stuff for the first week.", "For the friendships!", "Wall sit! But not on the cat.", "LoneWolf2015", "All the points!", "You look tense, where's that Hitachi MagicWand.", "fookinipad", "Just walk everywhere.", "For the points.", "Girl, go try on cute dresses.", "Go get Chipotle for some points.", "You can't even? Stop being a basic bitch.", "Spread your own sheet, asshole.", "SHUT UP SOCO!"];
var magicEightBallAnswers = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, smoke again.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Snort me and try again later.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
var voteAnswers = ["Yes, lets pound a rack and ", "Naw man, let's not "];
var challengeResponses = ["Run {0} miles {1}.", "Drop and give me {0} pushups, {1}.", "{0} BURPEES! NOW {1}!", "Give me {0} bicycle crunches {1}.", "Wall sit for {0} minutes for me {1}.", "Give me {0} of those donkey kicks {1}, you sexy girl.", "Mountain climb for {0} seconds with me {1}.", "Dance party for {0} minutes. Come and and break a groove with me {1}.", "Bro! Bet you can't pound {0} Natty Lites with me. C'mon {1} let's get wild."];
var robotHelpLink = "https://www.reddit.com/r/ROKCFIT/wiki/robot";

var latestFlashMessage = "";

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/,
      botSpreadsheet = "robot spreadsheet",
      botCookbook = "robot cookbook",
      botMotivate = "robot motivate",
      botChallenge = "robot challenge",
      botBroadcast = "robot broadcast",
      botVote = "robot vote",
      botChallenge = "robot challenge",
	  botHelp = "robot help",
	  botRules = "robot rules",
	  botStandings = "robot standings",
	  botLinks = "robot links",
	  botFlash = "robot flash",
	  botFlashBroadcast = "robot flashbroadcast",
	  botRobotDefault = "robot";	  

  console.log("USER ID = " + request.user_id);
  console.log(request.name + "- with response: " + request.text + "...")

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    robotSpeak(cool(), request.group_id);
    this.res.end();
  } else if(request.text && botSpreadsheet == request.text.trim().toLowerCase()) {
    this.res.writeHead(200);
    robotSpeak(spreadSheets[request.group_id], request.group_id);
    this.res.end();
  } else if(request.text && botHelp == request.text.trim().toLowerCase()) {
    this.res.writeHead(200);
    robotSpeak(robotHelpLink, request.group_id);
    this.res.end();
  } else if(request.text && botRules == request.text.trim().toLowerCase()) {
    this.res.writeHead(200);
    robotSpeak(rulesLink, request.group_id);
    this.res.end();
  } else if(request.text && botStandings == request.text.trim().toLowerCase()) {
    this.res.writeHead(200);
    robotSpeak(standingsLink, request.group_id);
    this.res.end();
  } else if(request.text && botFlash == request.text.trim().toLowerCase()) {
    this.res.writeHead(200);
    robotSpeak(latestFlashMessage, request.group_id);
    this.res.end();
  } else if(request.text && botLinks == request.text.trim().toLowerCase()) {
    this.res.writeHead(200);
    robotSpeak("Team Spreadsheet: " + spreadSheets[request.group_id] + "\nRules: " + rulesLink + "\nStandings: " + standingsLink, request.group_id);
    this.res.end();
  } else if(request.text && botCookbook == request.text.trim().toLowerCase()) {
    this.res.writeHead(200);
    robotSpeak("https://docs.google.com/document/d/1-FOsecUkDyI_y_GTHPfJvw9y3vgLdaLa5ODo6DpT_fg/edit", request.group_id);
    this.res.end();
  } else if(request.text && botMotivate == request.text.trim().toLowerCase()) {
    this.res.writeHead(200);
    robotSpeak(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)], request.group_id);
    this.res.end();
  } else if (request.text && request.text.trim().toLowerCase().startsWith(botRobotDefault) && request.text.toLowerCase().endsWith("?")) {
    var message = request.text.substring(5, request.text.length);
    this.res.writeHead(200);
    robotSpeak(magicEightBallAnswers[Math.floor(Math.random() * motivationalQuotes.length)], request.group_id);
    this.res.end();
  } else if(request.text && request.text.toLowerCase().startsWith(botVote)) {
    this.res.writeHead(200);
    var message = request.text.substring(10, request.text.length);
    robotSpeak(voteAnswers[Math.floor(Math.random() * voteAnswers.length)] + message, request.group_id);
    this.res.end();
  } else if(request.text && request.text.toLowerCase().startsWith(botChallenge)) {
    this.res.writeHead(200);
    robotSpeak(String.format(challengeResponses[Math.floor(Math.random() * challengeResponses.length)], Math.floor(Math.random() * 50),request.name), request.group_id);
    this.res.end();
  } else if(request.text && request.text.toLowerCase().startsWith(botBroadcast) && broadcastUsers.includes(request.user_id)) {
    this.res.writeHead(200);
    robotSpeakManyLanguages(request.text.substring(15, request.text.length));
    this.res.end();
  } else if(request.text && request.text.toLowerCase().startsWith(botFlashBroadcast) && broadcastUsers.includes(request.user_id)) {
    this.res.writeHead(200);
	var message = request.text.substring(20, request.text.length);
	latestFlashMessage = message;
    robotSpeakManyLanguages(message);
    this.res.end();
  } else if(request.text && request.text.toLowerCase().startsWith(botRobotDefault)) {
	var message = request.text.substring(5, request.text.length);
    this.res.writeHead(200);
    robotSpeak("Sorry " + request.name + " I can't " + message, request.group_id);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function robotSpeakManyLanguages(botResponse) {
  for (groupId in botIDs) {
    console.log('~~LOOP SPEAK ' + botResponse + ' to ' + botIDs[groupId]);
    robotSpeak(botResponse, groupId);
  }
}

function robotSpeak(botResponse, groupId) {
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botIDs[groupId],
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

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

if (![].includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
        (searchElement !== searchElement && currentElement !== currentElement)) {
          return true;
        }
        k++;
      }
      return false;
    };
  }

  String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
      // "gm" = RegEx options for Global search (more than one instance)
      // and for Multiline search
      var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
      theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
  }

exports.respond = respond;
