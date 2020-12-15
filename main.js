//Packages
const Discord = require('discord.js')
const Server = require('minecraft-server-util');
const ytdl = require('ytdl-core');
const {PREFIX, TOKEN, YT_API_KEY} = require('./config.json');
const search = require('youtube-search');
const fs = require('fs');
const opts = {
    maxResults: 3,
    key: YT_API_KEY,
    type: 'video'
};

var queue = []; // The queue list that is used globally.

//Discord
const client = new Discord.Client({ disableEveryone: true });
client.login(TOKEN)


client.on('ready', () => {
    console.log(client.user.tag + ' Online!')
    client.user.setActivity('preforia.net', ({ type: 'PLAYING' }))
});


//Command Handler
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

LogMessages = true;

client.on('message', message => {
    if (LogMessages) LogMessage(message.author.username, message.channel.name, message.content)
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    let args = message.content.slice(PREFIX.length).split(" ")
    const command = args.shift();

    //Handling commands
    switch(command.toLowerCase()) {
        case 'help':
            client.commands.get('help').execute(message, Discord);
            break;
        case 'status':
            client.commands.get('status').execute(message, Discord, Server);
            break;
        case 'play':
            client.commands.get('play').execute(message, Discord, args, ytdl, opts, search, queue);
            break;
        case 'stop':
            client.commands.get('stop').execute(message, Discord, queue);
            break;
        case 'skip':
            client.commands.get('skip').execute(message, Discord, ytdl, queue);
            break;
        case 'search':
            client.commands.get('search').execute(message, Discord, args, search, opts, ytdl);
            break;
        case 'queue':
            client.commands.get('queue').execute(message, Discord, args, ytdl, queue);
            break;
        case 'clear':
            client.commands.get('clear').execute(message, Discord, args);
            break;
        case 'vote':
            client.commands.get('vote').execute(message, Discord, args);
            break;
        default:
            const errorEmbed = new Discord.MessageEmbed()
            .setColor('00E8FF')
            .setDescription(':warning: That command does not exist. Type `!help` for list of commands.')
            message.channel.send(errorEmbed).then(errorEmbed => {
                errorEmbed.delete({timeout: 10000})
        })
    }
})

function LogMessage(author, channel, message) {
    console.log(author + ' in ' + channel + ' >> ' + message)
}