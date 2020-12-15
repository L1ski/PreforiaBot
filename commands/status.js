module.exports = {
    name: "status",
    description: "Sends a server status embed",
    execute(message, Discord, Server) {

        Server.status('preforia.net', { port: 25565 }).then((response) => {
            var status = null
            if (response == null) {
                var status = "Offline"
            } else {
                var status = "Online"
            }

            const StatusEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setAuthor('Preforia.net', 'https://i.imgur.com/ZD8M6Ac.png', 'https://preforia.net/')
            .setTitle('Server Statistics')
            .setThumbnail('https://i.imgur.com/ZD8M6Ac.png')
            .setFooter('Requested by ' + message.author.username, message.author.avatarURL())
            .setTimestamp()
            .addFields(
                {name: 'Online Players', value: '**' + response.onlinePlayers + '**' + '/' + '**' + response.maxPlayers + '**', inline: true },
                {name: '\u200b', value: '\u200b', inline: true },
                {name: 'Status', value: '**' + status + '**', inline: true }
            )
            message.channel.send(StatusEmbed)
        })
    }
}