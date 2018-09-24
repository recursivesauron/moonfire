const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  // escape out immediately if the message isn't for us, or if the message is BY us
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  // rip out the first arg in the split array, lowercase it, and remove it from the array, creating an args only
  const command = args.shift().toLowerCase();

  if(!client.commands.has(command)){
    message.reply(`Unknown command. ${prefix}commands for a full list of available commands.`);
    return;
  }

  try{
    client.commands.get(command).execute(message, args);
  }
  catch(error){
    console.log(error);
    message.reply('Something went wrong trying to execute that command.');
  }
});

client.login(token);
