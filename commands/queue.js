module.exports = {
    name: "queue",
    description: "Song queue",
    async execute(message, Discord, args, ytdl, queue) {

            if (queue.length == 0) {
                const queueEmbed = new Discord.MessageEmbed()
                .setColor('00E8FF')
                .setDescription('Queue is empty...')
                message.channel.send(queueEmbed).then(queueEmbed => {
                    queueEmbed.delete({timeout: 8000})
                })
            } else {
                const QueueEmbed = new Discord.MessageEmbed()
                QueueEmbed.setTitle("Queue")
                QueueEmbed.setTimestamp()
                QueueEmbed.setFooter('preforia.net', 'https://i.imgur.com/ZD8M6Ac.png');
                QueueEmbed.setAuthor(message.author.username, message.author.avatarURL())
                QueueEmbed.setColor('00E8FF')
                var times = 1
                for (var i = 0; i < queue.length; i++) {
                    const song = await (await ytdl.getInfo(queue[i])).videoDetails
                    if (i == 0) {
                        QueueEmbed.addField("Playing...", song.title, false)
                    } else {
                        QueueEmbed.addField(times, song.title, false)
                        times++
                    }
                }
                message.channel.send(QueueEmbed)
            }

        getServerPlaylist(args.slice(0).join(" "));

        function getServerPlaylist(playlist) {
    
            return playlist;
        }
    }
}