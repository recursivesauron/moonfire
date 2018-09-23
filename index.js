const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
       
    //escape out immediately if the message isn't for us, or if the message is BY us
    if(!message.content.startsWith(prefix) || message.author.bot){
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //rip out the first arg in the split array, lowercase it, and remove it from the array, creating an args only 
    
    if(command === 'ping'){
        message.channel.send('Pong');
    }
    else if (command === 'kick') {        
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
    
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
    else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }
       
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });
    
        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    }
    else if (command === 'prune') {
        const amount = parseInt(args[0]) +1;//+1 to include this command's message implicitly.
    
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        }
        else if(amount <= 1 || amount > 20){
            return message.reply('Only delete under 20 messages at a time.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('There was an error trying to prume messages in this channel. Are you trying to only delete messages older than 2 weeks?');
        });
    }
    else{
        console.log('Unknown command:' + command);
    }
})


client.login(token);

