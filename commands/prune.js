module.exports = {
    name: 'prune',
    description: 'deletes the argumented amount of messages from the current channel (assuming the messages are within the past two weeks).',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1; // +1 to include this command's message implicitly.

        if (isNaN(amount)) {
            return message.reply("that doesn't seem to be a valid number.");
        } 
        else if (amount <= 1 || amount > 20) {
            return message.reply('Only delete under 20 messages at a time.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send(
                'There was an error trying to prume messages in this channel. Are you trying to only delete messages older than 2 weeks?'
            );
        });
    }
}