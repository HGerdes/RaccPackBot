const Discord = require('discord.js');
const fs = require('fs'); //node.js file reading
const client = new Discord.Client();
require('dotenv').config(); //lets the bot token be stored in a private file
const seedRandom = require('seedrandom'); //RNG

const prefix = "r$";


client.login(process.env.TOKEN); //logs the bot into the server

client.on('ready', () => {
    console.log('Bot is ready'); //prints if the bot is working
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix)) { //exits the function if the message doesnt contain r$
    return;
  } else if (msg.content.startsWith(prefix + "raccoon")) {
    let message = chooseFile(); //receives image file and image number from chooseFile

    if (message[1] === 42) {
      msg.reply("YOU GOT RUE-COONED!", message[0]); //posts cute picture of Rue plus Rue easter egg <3
    } else {
      msg.reply(message[0]) //posts image of Raccoon
    }

  } else if (msg.content.startsWith(prefix + "ping")) {
    ping = Date.now() - msg.createdTimestamp; //basic ping
    msg.reply(`Ping time is ${ping} ms.`)

  } else if (msg.content.startsWith(prefix + "help")) {
    msg.reply("type 'r$raccoon' for a raccoon pic, type 'r$ping' for the latency between the bot's server and your server.");
  }
});

// not used anymore
// let randNum = (max) => {
//   const rand = Math.floor(Math.random() * max + 1);
//   return rand;
// }

let seededRNG = (max) => {
  let rng = seedRandom();
  let d = new Date();
  let seed = d.getTime();
  return Math.floor(rng(seed) * max + 1);
}

let readFiles = (path) => {
  const files = fs.readdirSync(path); //opens the directory for reading and sends the files inside to an array
  return files;
}

let chooseFile = () => {
  const files = readFiles("./rpics"); //receives array from readFiles
  const rng = seededRNG(files.length); //generates random number based on how many pics there are

  for (let i = 0; i < files.length; i++) { //iterates through the array
    let file = files[i];
    let fTest = file.split('.'); //cuts the current file into two elements (name and extension)
    let fNum = Number(fTest[0]); //converts the string to an actual number

    if (fNum === rng) { //strictly compares fNum to the generated random number
      const attachment = new Discord.MessageAttachment("./rpics/" + file); //if it matches, it attaches the corresponding file to a variable
      return [attachment, fNum];
    }
  }
}
