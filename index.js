const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if(message.content === "!ping"){
        message.channel.send('Pong');
    }
})


client.login('NDg1OTM3MTYwNjg0MzA2NDMz.DoeY8g.7Gb0Nx0MI-o-ISysYsMxvx9pCbs');

