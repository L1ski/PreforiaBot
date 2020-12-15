module.exports = {
    name: "skip",
    description: "Skips a song",
    async execute(message, Discord, ytdl, queue) {

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: You need to be in a voice channel.')
            message.channel.send(errorEmbed).then(errorEmbed => {
                errorEmbed.delete({timeout: 8000})
            })
        } else if (queue.length < 2) {
            const queueEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription('Queue is empty...')
            message.channel.send(queueEmbed).then(queueEmbed => {
                queueEmbed.delete({timeout: 8000})
            })
            return
        } else if (queue.length > 0 ) {
            const skipEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription('Song skipped by **' + message.author.tag+ '**')
            message.channel.send(skipEmbed).then(skipEmbed => {
                skipEmbed.delete({timeout: 8000})
            })
        queue.shift(queue[0])
        var connection = await voiceChannel.join()
        const dispatcher = connection.play(ytdl(queue[0]))
        dispatcher.on('finish', () => {
            queue.shift(queue[0])
            if (queue.length == 0) {
                voiceChannel.leave()
            } else {
                const dispatcher = connection.play(ytdl(queue[0]))
            }
        })
        }

    }
}