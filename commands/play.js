module.exports = {
    name: "play",
    description: "Plays some music",
    execute(message, Discord, args, ytdl, opts, search, queue) {


        if (!message.member.voice.channel) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: You need to be in a voice channel.')
            message.channel.send(errorEmbed)
        }

        play(args.slice(0).join(" "));


        async function play(song) {
            const voiceChannel = message.member.voice.channel
            const connection = await voiceChannel.join();
            if (ytdl.validateURL(song)) {
                console.log(song);
                const songInfo = await (await ytdl.getInfo(song))
                sendMusicEmbed(songInfo)
                if (queue.length == 0) {
                    queue.push(song)
                    const dispatcher = connection.play(ytdl(song))
                    dispatcher.on('finish', () => {
                        queue.shift(song)
                        if (queue.length == 0) {
                            voiceChannel.leave()
                        } else {
                            const dispatcher = connection.play(ytdl(queue[0]))
                        }
                    })
                } else {

                    message.channel.send("Song `Queued!`")
                    queue.push(song)
                }
            } else {
                try {
                    let results = await search(song, opts).catch(err => console.log(err))
                    if (results) {
                        let youtubeResults = results.results
                        let i = 0
                        let titles = youtubeResults.map(result => {
                            i++
                            return i + ") " + result.title
                        })
                        let selected = youtubeResults[0]
                        play(selected.link);
                    }
                    return
                } catch (err) {
                    const error2Embed = new Discord.MessageEmbed()
                    .setColor('00E8FF')
                    .setDescription(':warning: Video not found...')
                    message.channel.send(error2Embed => {
                        error2Embed.delete({timeout: 8000})
                    })
                }
            }

            function sendMusicEmbed(song) {
                const MusicEmbed = new Discord.MessageEmbed()
                .setColor('00E8FF')
                .setTitle(song.videoDetails.title)
                .setURL(song.videoDetails.video_url)
                .setAuthor(song.videoDetails.author.name, song.videoDetails.author.thumbnails[0].url)
                .setThumbnail(song.videoDetails.thumbnail.thumbnails[1].url)
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Views: ', value: song.videoDetails.viewCount.toLocaleString(), inline: true },
                    { name: 'Likes:', value: song.videoDetails.likes.toLocaleString(), inline: true },
                    { name: 'Dislikes:', value: song.videoDetails.dislikes.toLocaleString(), inline: true },
                )
                .setTimestamp()
                .setFooter('Queued by ' + message.author.username, message.author.avatarURL());
                message.channel.send(MusicEmbed)
            }
        }
    }
}