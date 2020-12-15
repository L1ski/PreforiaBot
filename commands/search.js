const { BroadcastDispatcher } = require("discord.js")
const play = require("./play")

module.exports = {
    name: "search",
    description: "Youtube song search",
    execute(message, Discord, args, search, opts, ytdl) {
        
        const voiceChannel = message.member.voice.channel

        if (args.length < 1) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: Usage: !search <video-name>')
            message.channel.send(errorEmbed).then(errorEmbed => {
                errorEmbed.delete({timeout: 8000})
            })
            return
        }
        if (!voiceChannel) {
            const error2Embed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: You need to be in a voice channel.')
            message.channel.send(error2Embed).then(error2Embed => {
                error2Embed.delete({timeout: 8000})
            })
            return
        }
        
        searchFor(args.slice(0).join(" "));

        async function searchFor(song) {
            let results = await search(song, opts).catch(err => console.log(err))
            if (results) {
                let youtubeResults = results.results
                let i = 0
                let titles = youtubeResults.map(result => {
                    i++
                    return i + ") " + result.title
                })
                const searchEmbed = new Discord.MessageEmbed()
                .setColor('00E4FF')
                .setTitle('Song search')
                .setDescription('Type the number of the song in the chat so you can play it')
                .setFooter('Search made by ' + message.author.username, message.author.avatarURL())
                .setTimestamp()
                .addFields(
                    {name: '\u200b', value: titles.join("\n"), inline: false }
                )
                message.channel.send(searchEmbed)

                filter = m => (m.author.id === message.author.id) //&& m.content >= 1 && m.content <= youtubeResults.length;
                let collected = await message.channel.awaitMessages(filter, { max: 1 });
                let selected = youtubeResults[collected.first().content -1]
                if (selected != null) {
                    const connection = voiceChannel.join()
                        .then(connection => {
                            connection.play(selected.link)
                        });
                }
            }
        }
    }
}