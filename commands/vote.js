module.exports = {
    name: 'vote',
    description: 'Sends a vote to text channel',
    execute(message, Discord, args) {

        
        if(message.member.roles.cache.some(r=>['Testi2', 'Moderator'].includes(r.name)) ) {
            
            if (!args[1]) {
                const voteEmbed = new Discord.MessageEmbed()
                .setColor('#0095b6')
                .setDescription(':warning: You cannot send an empty poll.')
                message.channel.send(voteEmbed).then(voteEmbed =>{
                  voteEmbed.delete ({timeout: 8000})
                })
                return;
              };
              const vote2Embed = new Discord.MessageEmbed()
              .setTitle('Vote')
              .setColor('#0095b6')
              .setDescription(args.slice(0).join(" "))
              .setFooter('Vote made by ' + message.author.username, message.author.avatarURL())
              .setTimestamp()
              .addFields(
                {name: '\u200b', value: 'Yes = 🟢', inline: false },
                {name: '\u200b', value: 'No = 🔴', inline: false }
              )
      
              message.channel.send(vote2Embed).then(messageReaction => {
                messageReaction.react('🟢');
                messageReaction.react('🔴');
              });

        } else {
          const voteErrorEmbed = new Discord.MessageEmbed()
          .setColor('#0095b6')
          .setDescription(':warning: You do not have permissions to execute that command.')
          message.channel.send(voteErrorEmbed).then(voteErrorEmbed =>{
            voteErrorEmbed.delete({timeout: 8000})
            .catch(console.error)
          })
        }
    }
}