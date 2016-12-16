const fs = require('fs');
const oscRaw = fs.readFileSync('data/motuOscLPFRec.dec', 'utf-8').split("\n");



var components = {
  canvas: "#N canvas 185 22 1200 517 12;",
  peach: "#X obj 600 50 import mrpeach;",
  udpsend: {
    create: "#X obj 250 150 udpsend;",
    connector: 1
  },
  connect: {
    create: "#X msg 250 50 connect 127.0.0.1 64495;",
    connector: 2
  },
  disconnect: {
    create: "#X msg 250 100 disconnect;",
    connector: 3
  },
  ctlin: {
    create: "#X obj 50 27 ctlin;",
    connector: 4
  },
  slider: {
    create: "#X obj 50 55 hsl 128 15 0 127 0 0 empty empty empty -2 -8 0 10 -262144 -1 -1 0 1;",
    connector: 5
  }
};

var j = 0;
var start_x = 290;
var start_y = 300;
var messageIndex = 6;

console.log(components.canvas + "\n\r" + 
            components.peach + "\n\r" + 
            components.udpsend.create + "\n\r" + 
            components.connect.create + "\n\r" + 
            components.disconnect.create + "\n\r" + 
            components.ctlin.create + "\n\r" + 
            components.slider.create
          );

for (var i = 40; i < oscRaw.length - 0; i += 1) {
  if(1) {
    // write individual message boxes containting the osc packet
    console.log("#X msg " + start_x + " " + start_y + " " + oscRaw[i] + ";");

    // connect each individual message box to the usdpsend object
    console.log("#X connect " + messageIndex + " 0 " + components.udpsend.connector + " 0;");


    // create the conditional object for comparing midi value to the osc message
    console.log("#X obj " + (start_x - 150) + " " + (start_y - 40) + " == " + j + ";");
    
    // create the spigot mechanism which takes a booleon value from the above conditional
    // and passes commands to the desired message
    console.log("#X obj " + (start_x - 90) + " " + (start_y - 20) + " spigot;");

    // connect each conditional to its respective spigot
    console.log("#X connect " + (messageIndex + 1) + " 0 " + (messageIndex + 2) + " 0;");
    console.log("#X connect " + (messageIndex + 1) + " 0 " + (messageIndex + 2) + " 1;");

    // connect each conditional to the slider
    console.log("#X connect " + components.slider.connector + " 0 " + (messageIndex + 1) + " 0;");

    // connect each spigot to trigger its respective message
    console.log("#X connect " + (messageIndex + 2) + " 0 " + (messageIndex) + " 0;");

    messageIndex += 3;
    start_y += 50;
    j += 1;
  }
};

console.log("#X connect " + components.ctlin.connector + " 0 " + components.slider.connector + " 0;");
console.log("#X connect " + components.connect.connector + " 0 " + components.udpsend.connector + " 0;");
console.log("#X connect " + components.disconnect.connector + " 0 " + components.udpsend.connector + " 0;");
