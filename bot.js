var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

var broadcastUsers = ["23871134", "21638470", "26657376"]; //Mala, wieso, ROKC mod

// List out botIds with GroupId as the key and BotId as the value
// Used when sending out messages, will pass along the request.group_id to know what bot should send
var botIDs = {};
botIDs["11667779"] = "ef2f1fde5b177598e3f5b95a5a"; //Danicker
botIDs["13670400"] = "a32bf06537c098828f4f89933e"; //Team 1
botIDs["13665537"] = "8c91f6d78c972ded7f1bae5794"; // Team 2: Armenia
botIDs["13670516"] = "445942a7e13af25971922f955e"; // Team 3
botIDs["13670568"] = "8d6b69fee508b36bdf9fa543dd"; // Team 4
botIDs["13668827"] = "68e63a18a541637607b337fb75"; // Team 5
botIDs["13670517"] = "6d4fd61e5aed08d4cea946737c"; // Team 6
botIDs["13670448"] = "0960a48163c18427b30250b3a8"; // Team 7
botIDs["13670548"] = "8cb565801f24dcc87e00a68414"; // Team 8
botIDs["13670439"] = "f189bb99a24c7c3cf6f456487e"; // Team 9
botIDs["11675131"] = "1f0c18a1908e8c951d6d2082ac"; // Team 10: HAY YASE to SOUP and NUDES
botIDs["13670576"] = "0b1c1c29f1962eb8e246204eaf"; // Team 11
botIDs["13668832"] = "c1103e58c3bbdcbf268142cb1e"; // Team 12
botIDs["13670555"] = "abd788c1c85bed24dd58b7389d"; // Team 13
botIDs["13668834"] = "ba920432fe32088bb985b335af"; // Team 14

var spreadSheets = {};
spreadSheets["13670400"] = "https://docs.google.com/spreadsheets/d/1uPcMtoZhwPWaqrS65tt-3sMgeZ9FB22AMVvjt3nvNro/edit";
spreadSheets["13665537"] = "https://docs.google.com/spreadsheets/d/1_By_xS1E5lK3c360LZYOu0YVgXPzk3osYDlyvsgczOQ/edit#gid=0";
spreadSheets["13670516"] = "https://docs.google.com/spreadsheets/d/1S01WN89x5N_HXjzC3IQcrnv6RiGXsZjjswFcAPGPqwM/edit#gid=0";
spreadSheets["13670568"] = "https://docs.google.com/spreadsheets/d/1OYfHO6EpxRDA8yVToZK943EOa6Zyqulh7km2_HRXk50/edit#gid=0";
spreadSheets["13668827"] = "https://docs.google.com/spreadsheets/d/1oPQri2xlTFn8PZbNCKwvdjbU0Se4XdhXumlm9-LMCnU/edit";
spreadSheets["13670517"] = "https://docs.google.com/spreadsheets/d/10h6wberi1o0rrjG6WBf1F9zRPgckrtgL3N2tVvIoCnA/edit#gid=0";
spreadSheets["13670448"] = "https://docs.google.com/spreadsheets/d/1FL6ln3IBjst5auL2reT_c7MjVEo_Wo-nfTBUPlRPLI8/edit";
spreadSheets["13670548"] = "https://docs.google.com/spreadsheets/d/1V4qg1mR-WJRg1pV2v61WjfTkGxJCUnJjhSILKuEYGe0/edit";
spreadSheets["13670439"] = "https://docs.google.com/spreadsheets/d/1VmllqkfCQIfb3GV9xVIR0z6JOr4hYMuTtjhYrwPacYg/edit#gid=0";
spreadSheets["11675131"] = "https://docs.google.com/spreadsheets/d/1Z2Fk1ijxn4yZxX2bD9aCO9tNSBbHZRh7RqVSO4umZqs/edit";
spreadSheets["13670576"] = "https://docs.google.com/spreadsheets/d/1a4BoCi9ESdnS-gRfq6vD0sczt5p9O4iZloNn9v-WdZ4/edit";
spreadSheets["13668832"] = "https://docs.google.com/spreadsheets/d/17sJ5uzqvgAljIZIt3L0r69TU0Rhzlj8ATyBOZXnc_Cg/edit";
spreadSheets["13670555"] = "https://docs.google.com/spreadsheets/d/1faV2doVSU3eGWRSRTwGweqOkuYvlMj5bGtqD0IVdZ5I/edit#gid=0";
spreadSheets["13668834"] = "https://docs.google.com/spreadsheets/d/1iTCUXL7uzAcHXCe3yhatwsOV9LI-1R1rh1e5HmKb1dk/edit";

var motivationalQuotes = ["Sexist robot says more donkey kicks, less clothing.", "PINTS FOR POINTS!", "Boobalicious female ,work out naked at home. I will coach you via Hangout", "Man up and work out. Feels are for the weak.", "No butt stuff for the first week.", "For the friendships!", "Wall sit! But not on the cat.", "LoneWolf2015", "All the points!", "You look tense, where's that Hitachi MagicWand.", "fookinipad", "Just walk everywhere.", "For the points.", "Girl, go try on cute dresses.", "Go get Chipotle for some points.", "You can't even? Stop being a basic bitch.", "Spread your own sheet, asshole.", "SHUT UP SOCO!"];
var magicEightBallAnswers = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, smoke again.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Snort me and try again later.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
var voteAnswers = ["Yes, lets pound a rack and ", "Naw man, let's not "];
var challengeResponses = ["Run {0} miles {1}.", "Drop and give me {0} pushups, {1}.", "{0} BURPEES! NOW {1}!", "Give me {0} bicycle crunches {1}.", "Wall sit for {0} minutes for me {1}.", "Give me {0} of those donkey kicks {1}, you sexy girl.", "Mountain climb for {0} seconds with me {1}.", "Dance party for {0} minutes. Come and and break a groove with me {1}.", "Bro! Bet you can't pound {0} Natty Lites with me. C'mon {1} let's get wild."];

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
