module.exports = {
    name: "stop",
    description: "Stops the song",
    execute(message, Discord, queue) {

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: You need to be in a voice channel.')
            message.channel.send(errorEmbed).then(errorEmbed => {
                errorEmbed.delete({timeout: 8000})
            })
        } else {
            voiceChannel.leave();
            queue = []
        }
    }
}