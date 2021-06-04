const Discord = require('discord.js');
const fs = require('fs'); //node.js file reading
const client = new Discord.Client();
require('dotenv').config(); //lets the bot token be stored in a private file


client.login(process.env.TOKEN); //logs the bot into the server

client.on('ready', () => {
    console.log('Bot is ready'); //prints if the bot is working
});

client.on("message", (msg) => {
  if (msg.content === "r!raccoon") { //if the bot is triggered
    fs.readdir("./rpics", (err, files) => { //opens the directory for reading and sends the files inside to an array
      if (err)
        console.log(err);
      else {
        const max = files.length; //sets array to number of files in the picture directory
        const rand = Math.floor(Math.random() * max + 1); //sets a random number between 1 and the number of files in the picture directory
        files.forEach(file => { //iterates through the array
          let fTest = file.split('.'); //cuts the current file into two elements (name and extension)
          let fNum = Number(fTest[0]); //converts the string to an actual number
          if (fNum === rand) { //strictly compares fNum to the generated random number
            const attachment = new Discord.MessageAttachment("./rpics/" + file); //if it matches, it attaches the corresponding file to a variable
            if (fNum === 42) {
              msg.reply("YOU GOT RUE-COONED!", attachment); //posts the image plus Rue easter egg <3
              console.log(attachment) //sends a message to the console for debugging and monitoring
            } else {
              msg.reply(attachment) //posts image
              console.log(attachment) //sends a message to the console for debugging and monitoring
            }
          }
        });
      }
    });
  }
});
