const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
client.on("ready", () => {
  client.user.setStatus('dnd')
  client.user.setGame(`-Help | ${client.guilds.size} Guilds | Version 1.0.1`)
  console.log(`Loaded All Commands For ${client.user.tag} | On Port ${config.port}`)
console.log(`Logged In As ${client.user.tag} And In ${client.guilds.size} Guilds`)
});

client.on("message", async message => {
  




  console.log(`${client.user.tag} Has Sent A Command Message`)
  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
if (command === "stats") {
  const embed = new Discord.RichEmbed()
  .setTitle('Shift Statistics')
  .setDescription(`Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\n\nNode: 9.3.8\n\nBot Version: 1.0.1\n\nLibrary: Discord.JS\n\nServers: ${client.guilds.size}`)
  message.channel.send({embed});
  }
  
  
  if (command === "help") {
 const embed = new Discord.RichEmbed()
  .setTitle('Shift Commands')
  .setDescription('Stats - Gives Some Useful Bot Statistics\n\nInvite - Invite Shift To Your Server')
  message.channel.send({embed});
  }


     if (command === 'invite') {
     const embed = new Discord.RichEmbed()
     .setTitle('Invite Shift')
     .setDescription('Join My Support Guild [Here](https://discord.gg/WD32wRt)\n\nInvite Me To Your Guild [Here](https://discordapp.com/api/oauth2/authorize?client_id=410859256393367552&permissions=536210518&scope=bot)')
     message.channel.send({embed});
     }
  
if (command === '8ball') {
		const replies = ['Outlook Not So Good', 'Very Doubtful', 'My Sources Say No', 'Shut Up', 'No', 'Ask Again Later', 'Yes', 'It Is Certain', 'Most Likely', 'Outlook Good'];
		message.replytext = Math.floor((Math.random() * replies.length) + 0);
		return message.reply(replies[message.replytext]);
	  }

});

client.login(config.token)
