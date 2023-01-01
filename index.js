const { Client, Intents, RichEmbed, MessageEmbed, Collection, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES], partials:["CHANNEL", "GUILD_MEMBER"] }); //({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const PREFIX = '*';
const token = require('./config.json').token;
const cm = require(`./utilities/checkMessage`);
const l = require(`./utilities/logging`);
const f = require(`./utilities/facAdUtil`);

//---------------TODO------------------//
//Make previews and confirm command for factions. This will allow a channel to be made inside factions channel
//that is only viewable by the creator of said faction. Then they can do *factions confirm to push the update from temp to production
//Suggestions channel
//Auto mod with reactions.
//Auto cooldown on detection of scam
//Rock paper scissors thing jabba dmed about. Each element gets their own thing

//Betting systems for coins?

var channel;

const fs = require('fs');
const request = require(`request`);

const blacklistURL = "https://raw.githubusercontent.com/BuildBot42/discord-scam-links/main/list.txt"
const blacklistPATH = "./utilities/blacklist.txt"

let blacklist = [
    "discrode-gifte",
    "diiscord-nittro",
    "dliscord.com",
    "discord.giveaweys",
    "steamcomminuty",
    "discord-nitro",
    "discorcl.link",
    "steancomunnity",
    "discoord-apps",
    "zikex.uk",
    "nitro-gg",
    "clonex",
    "discozd",
    "nitro for"
]

const attacks = {
    "Fire": {
        "Melee": "Fireball",
        "Defense": "Blast Wave",
        "Ranged": "Scorch"
    },
    "Void": {
        "Melee": "Void Force",
        "Defense": "Cursed Nightmare",
        "Ranged": "Warp Slam"
    },
    "Rock": {
        "Melee": "Spike Strip",
        "Defense": "Diamond Shell",
        "Ranged": "Magma Missle"
    },
    "Zombie": {
        "Melee": "Toxic Ooze",
        "Defense": "Resurrection",
        "Ranged": "Fiery Chop"
    },
    "Electric": {
        "Melee": "Electric Pulse",
        "Defense": "Magnetic Shield",
        "Ranged": "Thunderfury"
    },
    "Nature": {
        "Melee": "Pod Shot",
        "Defense": "Spirit Block",
        "Ranged": "Moon Beam"
    },
    "Air": {
        "Melee": "Ancient Winds",
        "Defense": "Storm Shield",
        "Ranged": "Hurricane"
    },
    "Water": {
        "Melee": "Water Cannon",
        "Defense": "Hyrdo Shell",
        "Ranged": "Mud Gun"
    },
    "Poison": {
        "Melee": "Toxic Sting",
        "Defense": "Acid Smog",
        "Ranged": "Devastating Rend"
    },
    "Psychic": {
        "Melee": "Eerie Pulse",
        "Defense": "Lunar Defence",
        "Ranged": "Psycho Force"
    },
};

client.commands = new Collection();
client.utils = new Collection();


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const utilFiles = fs.readdirSync('./utilities/').filter(file => file.endsWith('.js'));
for (const file of utilFiles) {
    const util = require(`./utilities/${file}`);

    client.utils.set(util.name, util);
}


client.once('ready', async () => {

    function requireUncached(module) {
        delete require.cache[require.resolve(module)];
        return require(module);
    }

    const log = await requireUncached(`./utilities/logging`);
    const aDutil = await requireUncached(`./utilities/facAdUtil`);
    const arenaUtil = await requireUncached(`./utilities/arenaUtil`);
    const arenaLeadUtil = await requireUncached(`./utilities/arenaLeadUtil`);

    try {
        let file = fs.createWriteStream(blacklistPATH)
        request(blacklistURL).pipe(file)
        blacklist = fs.readFileSync(blacklistPATH).toString().split("\n");
    } catch (error) {
        log.run(error)
    }


    log.run('Botnaut is online!', 1)
    client.user.setActivity("Use *Help", {
        type: "STREAMING",
        url: "https://www.twitch.tv/papa__jabba"
    });

    setInterval(function () {
        var matchData;
        //var PData;
        try {
            matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
            //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        } catch (e) {
            console.log(e);
            return;
        }

        arenaUtil.run(client)
    }, 15000) //30000 30sec - 900000 15min - 600000 10min

    setInterval(function () {
        arenaLeadUtil.run(client)
    }, 1800000) //3600000 - 30min 1800000

    setInterval(function () {
        aDutil.run(client)
    }, 900000) //3600000 - 30min 1800000

    // var number = 0;
    // setInterval(function () {
    //     number = parseInt(fs.readFileSync('./number.txt', 'utf8'));
    //     var returnedValue = aDutil.run(client, MessageAttachment, number)
    //     returnedValue.then(function(result) {
    //         //number = result;
    //         fs.writeFileSync('./number.txt', result.toString(), function (err) { if (err) console.log(err) });
    //         console.log("The return was " + result)
    //     });
    // }, 600000) //30000 30sec - 900000 15min - 600000 10min
});

client.on('interactionCreate', interaction => {
    function requireUncached(module) {
        delete require.cache[require.resolve(module)];
        return require(module);
    }
    const log = requireUncached(`./utilities/logging.js`);

    if (!interaction.isButton()) return;

    var split = interaction.customId.split("-");

    if (split.length < 2) {
        return;
    }

    if (split[0] == "Melee" || split[0] == "Defense" || split[0] == "Ranged") {
        var matchData;
        var PData;
        try {
            matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        } catch (e) {
            console.log(e);
            return;
        }

        if (matchData.currentMatch["match-" + split[1]] && matchData.currentMatch["match-" + split[1]].players[interaction.user.id] && matchData.currentMatch["match-" + split[1]].players[interaction.user.id].selectedAttack != "true") {
            matchData.currentMatch["match-" + split[1]].players[interaction.user.id].selectedAttack = "true"
            matchData.currentMatch["match-" + split[1]].players[interaction.user.id].chosenAttack = split[0]

            //interaction.channel.send(`${interaction.member.user} has selected their attack!`)
            interaction.reply({ content: `You have selected: ${split[0] + " - " + attacks[PData.players[interaction.user.id].naut.type][split[0].toString()]}` });

            //console.log(interaction.customId + " - " + attacks[PData.players[interaction.member.user.id].type][interaction.customId.toString()])
            try {
                fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
        } else {
            return;
        }
    } else {
        return;
    }
});
client.on('messageCreate', async message => {
    function requireUncached(module) {
        delete require.cache[require.resolve(module)];
        return require(module);
    }
    const log = await requireUncached(`./utilities/logging.js`);

    if (message.guild != null) {
        const checkMessage = await requireUncached(`./utilities/checkMessage.js`);
        var returnedValue = checkMessage.run(client, message, blacklist)
        var badMessage = false;
        await returnedValue.then(function (result) {
            badMessage = result
        });

        if (badMessage) {
            return;
        }

        const checkArenaMessage = await requireUncached(`./utilities/ArenaMessageCheck.js`);
        checkArenaMessage.run(client, message)
    }

    if(message.mentions.members.first() != null){
        let mentioned = message.mentions.members.first()

        if(mentioned.user.id == client.user.id){
            if(message.content.toLowerCase().includes("ban")){
                message.reply("Ok this user has been banned! /S")
                return;
           }
        }
    }

    //CHECK COMMANDS
    if (message.author.id === client.user.id || !message.content.startsWith(PREFIX) || message.author.bot) return;

    let args = message.content.substring(PREFIX.length).split(" ");

    try {
        //let commandFile = require(`./commands/${args[0]}.js`)
        //commandFile.run(message, args, client)
        client.commands.get(args[0].toLowerCase()).run(message, args, client, Discord)
    } catch (error) {
        //log.run(error, 2)
        return;
    }
});

// client.on('messageReactionAdd', async (reaction, user) => {

//     if (reaction.message.partial) await reaction.message.fetch();
//     if (reaction.partial) await reaction.fetch();
//     if (user.bot) return;
//     if (!reaction.message.guild) return;

//     const youtubeNotify = reaction.message.guild.roles.cache.find(role => role.name === "Youtube Squad");
//     const twitchNotify = reaction.message.guild.roles.cache.find(role => role.name === "Twitch Squad");
//     const allNotify = reaction.message.guild.roles.cache.find(role => role.name === "Notification Squad");

//     const youtubeEmoji = client.emojis.cache.find(emoji => emoji.name === "Comet");
//     const twitchEmoji = client.emojis.cache.find(emoji => emoji.name === "CometLogo");
//     const allEmoji = client.emojis.cache.find(emoji => emoji.name === "SquickyToy");

//     if(reaction.message.channel.id == "865241019862876190"){
//         if(reaction.emoji.name === "Comet") {
//             await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(youtubeNotify);
//         }
//         if(reaction.emoji.name === "CometLogo") {
//             await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(twitchNotify);
//         }
//         if(reaction.emoji.name === "SquickyToy") {
//             await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(allNotify);
//         }
//     } else {
//         return;
//     }

// });

// client.on('messageReactionRemove', async (reaction, user) => {

//     if (reaction.message.partial) await reaction.message.fetch();
//     if (reaction.partial) await reaction.fetch();
//     if (user.bot) return;
//     if (!reaction.message.guild) return;

//     const youtubeNotify = reaction.message.guild.roles.cache.find(role => role.name === "Youtube Squad");
//     const twitchNotify = reaction.message.guild.roles.cache.find(role => role.name === "Twitch Squad");
//     const allNotify = reaction.message.guild.roles.cache.find(role => role.name === "Notification Squad");

//     const youtubeEmoji = client.emojis.cache.find(emoji => emoji.name === "Comet");
//     const twitchEmoji = client.emojis.cache.find(emoji => emoji.name === "CometLogo");
//     const allEmoji = client.emojis.cache.find(emoji => emoji.name === "SquickyToy");

//     if(reaction.message.channel.id == "865241019862876190"){
//         if(reaction.emoji.name === "Comet") {
//             await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(youtubeNotify);
//         }
//         if(reaction.emoji.name === "CometLogo") {
//             await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(twitchNotify);
//         }
//         if(reaction.emoji.name === "SquickyToy") {
//             await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(allNotify);
//         }
//     } else {
//         return;
//     }

// });


client.login(token);