module.exports = {
    name: "help",
    description: "Sends help embed",
    execute(message, Discord) {

        const HelpEmbed = new Discord.MessageEmbed()
            .setTitle("Do you need help?")
            .setAuthor('Preforia.net', "https://i.imgur.com/ZD8M6Ac.png", "https://preforia.net/")
            .setDescription('"Im here to help you! If you encounter any glitches/errors with this bot, report them to me. This is only a BETA-Version" -L1ski')
            .setThumbnail("https://i.imgur.com/ZD8M6Ac.png")
            .setColor("00E8FF")
            .addField("\u200b", "\u200b", false)
            .addField("!help", "Gives this command.", false)
            .addField("!link <minecraft name>", "Starts the linking progress of Discord-Minecraft accounts", false)
			.addField("!accounts", "Shows you your linked accounts.", false)
            .addField("!status", "Sends status message of the server.", false)
            .addField("\u200b", "\u200b", false)
            .addField("!play <URL | Video-name>", "Plays song in your current voice channel.", false)
            .addField("!stop", "Stops the current song and clears playlist.", false)
            .addField("!skip", "Skips current song.", false)
            .addField("!search <video>", "Searches video from youtube.", false)
            .addField("!queue", "Shows queued songs.", false)
            .setFooter(message.author.username, message.author.avatarURL())
            .setTimestamp()
            message.channel.send(HelpEmbed)
    }
}