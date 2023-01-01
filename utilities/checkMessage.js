module.exports = {
    name: 'checkMessage',
    description: "Checks Messages for scams",
    guilds: [
        "887226341429231648",//Boxnauts
        "919659368021114940",//Boxnauts Testing
        "714696925500145725",//Okami Squadron
        "195687811733651456",//TinyTank800
        "822745002391502849",//Shiko Kiro
        "877646469270736947",//Paper Bag Games
    ],

    async run(client, message, blacklist) {
        let blacklistFILE = './utilities/blacklist.txt'
        const fs = require('fs');
        blacklist = fs.readFileSync(blacklistFILE).toString().split("\n");

        const TheMan = 398907393427243008
        if (message.author.id === client.user.id) {
            return true;
        }

        // if(message.guild === null) {
        //     return true;
        // }

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const log = await requireUncached(`./logging`);

        const keywords = [
            "free",
            "nitro",
            "months",
            "nitro for",
            "clonex",
            "giveaway",
            "promo"
        ]

        // var blacklistLinks = [
        //     "discrode-gifte",
        //     "diiscord-nittro",
        //     "dliscord.com",
        //     "discord.giveaweys",
        //     "steamcomminuty",
        //     "discord-nitro",
        //     "discorcl.link",
        //     "steancomunnity",
        //     "discoord-apps",
        //     "zikex.uk",
        //     "nitro-gg",
        //     "clonex",
        //     "discozd",
        //     
        // ]

        const allowedLinks = [
            "discord.gg/boxnaut",
        ]

        const { MessageEmbed } = require('discord.js');

        //const WarnChannel = "921948928780406854"
        const WarnChannel = "921948928780406854"
        let CorpStaffRole = "897233662406455357"

        //var matchData;
        var PData;
        try {
            //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        } catch (e) {
            console.log(e);
            return;
        }

        if (!PData.players[message.author.id]) {
            PData.players[message.author.id] = { type: "None", name: message.member.displayName.toString(), tokens: 124, wins: 0, loses: 0, gamesPLayed: 0, faction: 0, event: { wins: 0, loses: 0, gamesPlayed: 0 } }
            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
        }

        if (!message.member.roles.cache.some(role => role.id === CorpStaffRole) && message.author.id != "235148962103951360") {

            var tagged = 0;
            for (var i = 0; i <= keywords.length; i++) {
                if (message.content.toLowerCase().includes(keywords[i])) {
                    tagged += 1
                    if (tagged >= 2) {
                        message.reply(`${message.author} That is not allowed thank you :D`);

                        //const CorpStaff = message.guild.roles.cache.find(role => role.id == "897233662406455357");
                        //const Notification = message.guild.roles.cache.find(role => role.id == "925277863190593616");

                        const exampleEmbed = new MessageEmbed()
                            .setColor('#FF0000')
                            .setTitle('Forbidden Words')
                            .setThumbnail(message.author.displayAvatarURL())
                            .setDescription('**Name:** ' + message.author.username + ' | **ID:** ' + message.author.id)
                            .addField('Message:', message.content, true)
                            .addField('In:', message.channel.name, true)
                            //.addField('Mentions', `${Moderator},${CorpStaff}`)
                            .setTimestamp();
                        
                        const Moderator = message.guild.roles.cache.find(role => role.id == "911762951617257553");
                        const Agent = message.guild.roles.cache.find(role => role.id == "944823437027844136");

                        client.channels.cache.get(WarnChannel).send({
                            content: `${Moderator} ${Agent}`,
                            embeds: [exampleEmbed]
                            //embed: exampleEmbed
                          }).then(function () {
                            log.run("[FORBIDDEN WORDS] " + message.author.username + " | " + message.author.id + " MSG: " + message.content, 2)
                            //console.warn("[FORBIDDEN WORDS] " + message.author.username + " | " + message.author.id);
                            message.delete();
                        })
                        return true;
                    }
                }
            }
        }

        for (var i = 0; i < blacklist.length; i++) {
            //console.log(blacklist[i])
            var splitList = blacklist[i].split(".")
            if (splitList[0].toLowerCase() != "discord" && splitList[0].toLowerCase() != "discordapp" && splitList[0].toLowerCase() != "nitro" && splitList[1] != null) {
                if (message.content.toLowerCase().includes(blacklist[i]) && blacklist[i] != '' && !message.content.toLowerCase().includes("https://discord.gg/") /*|| message.content.toLowerCase().includes(splitList[0].toLowerCase()) && blacklist[i] != ''*/) {
                    message.reply(`${message.author} That is not allowed thank you :D`);

                    //const CorpStaff = message.guild.roles.cache.find(role => role.id == "897233662406455357");

                    const exampleEmbed = new MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Forbidden Link')
                        .setThumbnail(message.author.displayAvatarURL())
                        .setDescription('**Name:** ' + message.author.username + ' | **ID:** ' + message.author.id)
                        .addField('Message', message.content, true)
                        .addField('In:', message.channel.name, true)
                        //.addField('Mentions', `${Moderator},${CorpStaff}`)
                        .setTimestamp();

                    const Moderator = message.guild.roles.cache.find(role => role.id == "911762951617257553");
                    const Agent = message.guild.roles.cache.find(role => role.id == "944823437027844136");

                    client.channels.cache.get(WarnChannel).send({
                        content: `${Moderator} ${Agent}`,
                        embeds: [exampleEmbed]
                        //embed: exampleEmbed
                    }).then(function () {
                        log.run("[FORBIDDEN LINK] " + message.author.username + " | " + message.author.id + " MSG: " + message.content, 2)
                        //console.warn("[FORBIDDEN WORDS] " + message.author.username + " | " + message.author.id);
                        message.delete();
                    })
                    return true;
                }
            }
        }

        return false;
    }
}