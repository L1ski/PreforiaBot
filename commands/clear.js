module.exports = {
    name: 'clear',
    description: 'Clears a specific amount of messages 1-100',
    async execute(message, Discord, args) {

        if(message.member.roles.cache.some(r=>['Admin', 'Moderator'].includes(r.name)) ) {
            const replyEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: You have to type the amount of messages that you want to delete.')
            if(!args[0]) return message.reply(replyEmbed).then(replyEmbed => {
            replyEmbed.delete({timeout: 8000})
            })

            const reply2Embed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: You have to enter a real number.')
            if(isNaN(args[0])) return message.reply(reply2Embed).then(replyEmbed => {
            replyEmbed.delete({timeout: 8000})
            })

            const reply3Embed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: You cannot delete more than 100 messages at once.')
            if(args[0] > 100) return message.reply(reply3Embed).then(reply3Embed => {
                reply3Embed.delete({timeout: 8000})
            })

            const reply4Embed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: You have to delete atleast one message.')
            if(args[0] < 1) return message.reply(reply4Embed).then(reply4Embed => {
                reply4Embed.delete({timeout: 8000})
            })


            await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                message.channel.bulkDelete(messages);
            })

        } else {
            const clearErrorEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: You do not have permissions to execute that command.')
            message.channel.send(clearErrorEmbed).then(clearErrorEmbed => {
                clearErrorEmbed.delete({timeout: 8000})
            })
        }
    }
}