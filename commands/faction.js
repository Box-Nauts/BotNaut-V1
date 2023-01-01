const { Client, MessageEmbed, Collection, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const request = require(`request`);
const path = require('path');

module.exports = {
    name: 'faction',
    description: "does factions stuff",

    async run(message, args, client) {

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const log = await requireUncached(`../utilities/logging`);

        // const TheMan = 398907393427243008
        // if (message.author.id != TheMan) {
        //     return message.reply("You do not have permission!");
        // }

        if (!args[1]) {
            return;
        }

        var facData;
        var adData;
        var PData;
        try {
            //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            facData = JSON.parse(fs.readFileSync("./Arena/Factions.json", "utf8"))
            adData = JSON.parse(fs.readFileSync("./Arena/Ads.json", "utf8"))
        } catch (e) {
            console.log(e);
            return;
        }

        if (PData.players[message.author.id].faction == undefined) {
            PData.players[message.author.id].faction = 0;

            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
            console.log("Correcting faction.")
        }

        if (!PData.players[message.author.id].faction) {
            //PData.players[message.author.id].faction = 0;

            //try {
            //fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
            //} catch (e) {
            //console.log(e);
            // return;
            //}
            console.log("Correcting faction test.")
        }

        if (args[1].toLowerCase() == "help") {
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Faction Commands | ( ) Required < > Optional`)
                .setDescription(`All currently available faction commands.`)
                .addField('Basic Commands', '*Faction Help - Lists all commands.', true)
                .addField('Faction Commands', '*Faction List - Lists all factions.\n*Faction Join (Number) - Join a faction.\n*Faction Info (Number) - Gives the factions info.\n*Faction Bank - Lists factions bank amount.\n*Faction Bank Deposit (Amount) - Deposit some money into your factions bank.', false)
                .addField('Admin Commands', '*Faction Bank Withdrawal (Amount) - Take from your factions bank.\n*Faction Kick (Person) - Kick a member from your faction.\n*Faction Admins Add (Person) - Add someone as an Admin.\n*Faction Admins Remove (Person) - Remove someones admin perms.\n*Faction Admins List - List all your admins.\n*Faction Ad Create - Create an ad for your faction(Cost: $4k from bank).', true)
                .addField('Edit Commands', '*Faction Edit Locked (True/False) - Lock users from joining your faction.\n*Faction Edit Purpose - Edit the factions purpose(Purpose 250 Character MAX).\n*Faction Edit Lore - Edit the factions lore(Purpose 1024 Character MAX).\n*Faction Edit Discord - Edit the link sent to users(Must be invite format! ``https://discord.gg/boxnauts``).\n*Faction Edit Color1 - Change primary color(Must be hex code format! #012345).\n*Faction Edit Color2 - Change secondary color(Must be hex code format! #012345).', true)
                .setTimestamp()
                .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

            message.reply({ embeds: [embed] });
        }

        if (args[1].toLowerCase() == "stats") {
            if (PData.players[message.author.id].faction == 0) {
                message.reply("You need a faction!")
                return;
            }

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Faction Stats`)
                .addField('Wins', `${facData.factions[PData.players[message.author.id].faction].stats.wins}`, true)
                .addField('Loses', `${facData.factions[PData.players[message.author.id].faction].stats.loses}`, true)
                .addField('W/L Ratio', `${(facData.factions[PData.players[message.author.id].faction].stats.wins / facData.factions[PData.players[message.author.id].faction].stats.loses)}`, true)
                .addField('Games Played', `${facData.factions[PData.players[message.author.id].faction].stats.gamesPlayed}`, true)
                .addField('Tokens', `${facData.factions[PData.players[message.author.id].faction].stats.tokens}`, true)
                .setTimestamp()
                .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

            message.reply({ embeds: [embed] });
        }

        if (args[1].toLowerCase() == "info") {
            if (args[2]) {
                if (!facData.factions[args[2]]) {
                    message.reply("Unknown Faction!")
                    return;
                }

                var factionsL = Object.keys(facData.factions)

                const embed = new MessageEmbed()
                    .setColor(`${facData.factions[args[2]].color1}`)
                    .setTitle(`${facData.factions[args[2]].name.slice(0, 24)}`)
                    .setDescription(`Do *Faction Join ${args[2]} to join!`)
                    .addField(`Locked`, `${facData.factions[args[2]].locked}`, true)
                    .addField(`Color 1`, `${facData.factions[args[2]].color1}`, true)
                    .addField(`Color 2`, `${facData.factions[args[2]].color2}`, true)
                    .addField(`Purpose`, `${facData.factions[args[2]].purpose.slice(0, 250)}`, true)
                    .addField(`Lore`, `${facData.factions[args[2]].lore.slice(0, 1024)}`, true)
                    .setTimestamp()
                    .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/315537267693191169/943036107380121670/Botnaut_copy.png' });

                message.reply({ embeds: [embed] });
                return;
            } else {
                message.reply("Need a faction to view! *Faction Info #")
                return;
            }
        }

        if (args[1].toLowerCase() == "bank") {
            if (PData.players[message.author.id].faction == 0) {
                message.reply("You need a faction!")
                return;
            }

            if (!args[2]) {
                message.reply(`Your faction's bank currently has ${facData.factions[PData.players[message.author.id].faction].stats.tokens} Tokens.`)
                return;
            }

            if (args[2].toLowerCase() == "give") {
                const TheMan = 398907393427243008
                const TheMan2 = 222153421745160192
                if (message.author.id != TheMan && message.author.id != TheMan2) {
                    return message.reply("You do not have permission!");
                }

                if (!args[3]) {
                    message.reply("You need an amount to deposit! *Faction Bank Give (Amount) (Faction Number)")
                    return;
                }

                if (!Number.isInteger(parseInt(args[3]))) {
                    message.reply("Amount MUST be a number! *Faction Bank Give (Amount) (Faction Number)")
                    return;
                }

                if (parseInt(args[3]) <= 0) {
                    message.reply("Amount MUST be a positive number! *Faction Bank Give (Amount) (Faction Number)")
                    return;
                }

                if (args[4] && facData.factions[args[4]]) {

                    facData.factions[args[4]].stats.tokens += parseInt(args[3])

                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    message.reply(`You have given ${parseInt(args[3])} Tokens to ${facData.factions[args[4]].name}.`)
                    return;

                } else {
                    message.reply("Faction MUST be listed! *Faction Bank Give (Amount) (Faction Number)")
                    return;
                }
            }

            if (args[2].toLowerCase() == "take") {
                const TheMan = 398907393427243008
                const TheMan2 = 222153421745160192
                if (message.author.id != TheMan && message.author.id != TheMan2) {
                    return message.reply("You do not have permission!");
                }

                if (!args[3]) {
                    message.reply("You need an amount to deposit! *Faction Bank Take (Amount) (Faction Number)")
                    return;
                }

                if (!Number.isInteger(parseInt(args[3]))) {
                    message.reply("Amount MUST be a number! *Faction Bank Take (Amount) (Faction Number)")
                    return;
                }

                if (parseInt(args[3]) <= 0) {
                    message.reply("Amount MUST be a positive number! *Faction Bank Take (Amount) (Faction Number)")
                    return;
                }

                if (args[4] && facData.factions[args[4]]) {

                    if(facData.factions[args[4]].stats.tokens <= parseInt(args[3])){
                        facData.factions[args[4]].stats.tokens = 0
                    } else {
                        facData.factions[args[4]].stats.tokens -= parseInt(args[3])
                    }

                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    message.reply(`You have taken ${parseInt(args[3])} Tokens from ${facData.factions[args[4]].name}.`)
                    return;

                } else {
                    message.reply("Faction MUST be listed! *Faction Bank Take (Amount) (Faction Number)")
                    return;
                }
            }

            if (args[2].toLowerCase() == "set") {
                const TheMan = 398907393427243008
                const TheMan2 = 222153421745160192
                if (message.author.id != TheMan && message.author.id != TheMan2) {
                    return message.reply("You do not have permission!");
                }

                if (!args[3]) {
                    message.reply("You need an amount to deposit! *Faction Bank Set (Amount) (Faction Number)")
                    return;
                }

                if (!Number.isInteger(parseInt(args[3]))) {
                    message.reply("Amount MUST be a number! *Faction Bank Set (Amount) (Faction Number)")
                    return;
                }

                if (parseInt(args[3]) <= 0) {
                    message.reply("Amount MUST be a positive number! *Faction Bank Set (Amount) (Faction Number)")
                    return;
                }

                if (args[4] && facData.factions[args[4]]) {

                    facData.factions[args[4]].stats.tokens = parseInt(args[3])

                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    message.reply(`You have set ${facData.factions[args[4]].name} to ${parseInt(args[3])} Tokens.`)
                    return;

                } else {
                    message.reply("Faction MUST be listed! *Faction Bank Set (Amount) (Faction Number)")
                    return;
                }
            }

            if (args[2].toLowerCase() == "deposit") {
                if (!args[3]) {
                    message.reply("You need an amount to deposit! *Faction Bank Deposit (Amount)")
                    return;
                }

                if (!Number.isInteger(parseInt(args[3]))) {
                    message.reply("Amount MUST be a number! *Faction Bank Deposit (Amount)")
                    return;
                }

                if (parseInt(args[3]) <= 0) {
                    message.reply("Amount MUST be a positive number! *Faction Bank Deposit (Amount)")
                    return;
                }

                if (PData.players[message.author.id].tokens < parseInt(args[3])) {
                    message.reply("You dont have enough money to deposit that amount!")
                    return;
                }

                PData.players[message.author.id].tokens -= parseInt(args[3])
                facData.factions[PData.players[message.author.id].faction].stats.tokens += parseInt(args[3])

                try {
                    fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }

                message.reply(`You have deposited ${parseInt(args[3])} Tokens.`)
                return;
            }

            if (args[2].toLowerCase() == "withdrawal") {
                if (!facData.factions[PData.players[message.author.id].faction].leader == message.author.id) {
                    if(facData.factions[PData.players[message.author.id].faction].admins){
                        if(!facData.factions[PData.players[message.author.id].faction].admins[message.author.id]){
                            message.reply("No Permission!")
                            return;
                        }
                    } else {
                        message.reply("No Permission!")
                        return;
                    }
                }

                if (!args[3]) {
                    message.reply("You need an amount to deposit! *Faction Bank Withdrawal (Amount)")
                    return;
                }

                if (!Number.isInteger(parseInt(args[3]))) {
                    message.reply("Amount MUST be a number! *Faction Bank Withdrawal (Amount)")
                    return;
                }

                if (parseInt(args[3]) <= 0) {
                    message.reply("Amount MUST be a positive number! *Faction Bank Withdrawal (Amount)")
                    return;
                }

                if (facData.factions[PData.players[message.author.id].faction].stats.tokens < parseInt(args[3])) {
                    message.reply("The bank does not have enough money to Withdrawal that amount!")
                    return;
                }

                PData.players[message.author.id].tokens += parseInt(args[3])
                facData.factions[PData.players[message.author.id].faction].stats.tokens -= parseInt(args[3])

                try {
                    fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }

                message.reply(`You have withdrawn ${parseInt(args[3])} Tokens.`)
                return;
            }
        }

        if (args[1].toLowerCase() == "kick") {
            if (!facData.factions[PData.players[message.author.id].faction].leader == message.author.id || !facData.factions[PData.players[message.author.id].faction].admins[message.author.id]) {
                message.reply("No Permission!")
                return;
            }

            if (!message.mentions.members.first()) {
                message.reply("Person MUST be mentioned! *Faction Kick (Person)")
                return;
            }

            let mentioned = message.mentions.members.first()

            if (facData.factions[PData.players[message.author.id].faction].leader == mentioned.id || facData.factions[PData.players[message.author.id].faction].admins[mentioned.id]) {
                message.reply("You cannot kick the leader or an admin!")
                return;
            }

            const FactionRole = facData.factions[PData.players[message.author.id].faction].role

            if (message.guild != null) {
                console.log("Removing Faction Role")
                var FactionRoleReal = message.member.guild.roles.cache.find(role => role.id === FactionRole);
                mentioned.roles.remove(FactionRoleReal);
            }

            if (facData.factions[PData.players[message.author.id].faction].members) {
                delete facData.factions[PData.players[message.author.id].faction].members[mentioned.id]
            }

            PData.players[mentioned.id].faction = 0

            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }

            message.reply(`You have kicked ${mentioned.username} from your faction!`)
            return;
        }


        if (args[1].toLowerCase() == "list") {
            var factionsL = Object.keys(facData.factions)
            var FactionList = {}

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Random Faction List`)
                .setDescription(`Do *Faction Info # to view more info!`)
                //.addField('Random Factions', FactionList.slice(0, 10).join("\n"), true)
                .setTimestamp()
                .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/315537267693191169/943036107380121670/Botnaut_copy.png' });

            var i = 0
            let rand = Math.floor(Math.random() * (factionsL.length - 0) + 0)
            //FactionList[rand] = { hello: true }
            while (i < factionsL.length) {
                rand = Math.floor(Math.random() * (factionsL.length - 0) + 0)
                while (FactionList[rand]) {
                    rand = Math.floor(Math.random() * (factionsL.length - 0) + 0)
                }

                FactionList[rand] = { hello: true }
                embed.addField(`#${factionsL[rand]} - ${facData.factions[factionsL[rand]].name.slice(0, 24)}`, `${facData.factions[factionsL[rand]].purpose.slice(0, 250)}`, true)
                //FactionList.push(`#${factionsL[rand]}`, `${facData.factions[factionsL[rand]].name.slice(0, 24)} - ${facData.factions[factionsL[rand]].purpose.slice(0, 46)}`)
                i++
            }

            //embed.addField('Random Factions', FactionList.slice(0, 10).join("\n"), true)

            message.reply({ embeds: [embed] });
            return;
        }


        if (args[1].toLowerCase() == "ad") {

            var isAdmin = false
            if(facData.factions[PData.players[message.author.id].faction].admins){
                if(!facData.factions[PData.players[message.author.id].faction].admins[message.author.id]){
                    message.reply("No Permission!")
                    return;
                } else {
                    isAdmin = true
                }
            }

            if (!facData.factions[PData.players[message.author.id].faction] && !facData.factions[PData.players[message.author.id].faction].leader == message.author.id && !isAdmin) {
                message.reply("No Permission!")
                return;
            }

            

            if (args[2] && args[2].toLowerCase() == "create") {
                const cost = 4000
                if(facData.factions[PData.players[message.author.id].faction].stats.tokens < cost){
                    message.reply(`Not enough tokens in the bank! Cost: ${cost} Arena Tokens.`)
                    return;
                }

                if(adData.ads.queuedAds[PData.players[message.author.id].faction]){
                    message.reply(`You already have an ad queued!`)
                    return;
                }

                /* Responds to the message that activated it */
                message.channel.send({ content: "Please send your faction's ad. 2000 Character Max!" });
                /* This is what we will be looking for, messages that match a certain criteria */
                const filter = m => m.author.id === message.author.id
                /* This is the collector being created, we put in the filter, and we also configure the time */
                const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                /* This is our collector function, it is active while the collector is alive */
                collector.on('collect', m => {

                    if (m.content.length > 2000) {
                        m.channel.send({ content: "Your faction ad failed! Ad is to long! Keep it below 2000 characters." })
                        m.delete()
                        collector.stop();
                        return;
                    }

                    adData.ads.queuedAds[PData.players[message.author.id].faction] = { ad: m.content }
                    facData.factions[PData.players[message.author.id].faction].stats.tokens -= cost

                    try {
                        fs.writeFileSync('./Arena/Ads.json', JSON.stringify(adData, null, 2), 'utf8')
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    m.channel.send({ content: "Your faction ad was successfully created!" })

                    m.delete()
                    collector.stop();
                    return;
                });

                /* This is triggered on death of the collector */
                collector.on('end', collected => {
                    if (collected.size > 0) {
                        /* Message sent at the end of the collection period if something was collected*/
                        return;
                    } else {
                        log.run(collected, 2)
                        message.reply("Your faction ad has timed out. Please redo your submission.");
                        return;
                    }
                });
            }
        }


        if (args[1].toLowerCase() == "edit") {
            if (!facData.factions[PData.players[message.author.id].faction] || !facData.factions[PData.players[message.author.id].faction].leader == message.author.id) {
                message.reply("No Permission!")
                return;
            }

            if (args[2] && args[2].toLowerCase() == "locked") {
                if (args[3] && args[3].toLowerCase() == "true") {
                    facData.factions[PData.players[message.author.id].faction].locked = "true"
                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                    message.reply("Your faction has been locked!")
                } else if (args[3] && args[3].toLowerCase() == "false") {
                    facData.factions[PData.players[message.author.id].faction].locked = "false"
                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                    message.reply("Your faction has been unlocked!")
                } else {
                    message.reply("Invalid Usage! *Faction Edit Locked (true/false)")
                    return;
                }
            }

            if (args[2] && args[2].toLowerCase() == "purpose") {
                /* Responds to the message that activated it */
                message.channel.send({ content: "Please send your faction's purpose. 250 Character Max!" });
                /* This is what we will be looking for, messages that match a certain criteria */
                const filter = m => m.author.id === message.author.id
                /* This is the collector being created, we put in the filter, and we also configure the time */
                const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                /* This is our collector function, it is active while the collector is alive */
                collector.on('collect', m => {

                    if (m.content.length > 250) {
                        m.channel.send({ content: "Your faction purpose failed! Purpose is to long! Keep it below 250 characters." })
                        m.delete()
                        collector.stop();
                        return;
                    }

                    facData.factions[PData.players[message.author.id].faction].purpose = m.content

                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    m.channel.send({ content: "Your faction purpose was successful!" })

                    m.delete()
                    collector.stop();
                    return;
                });

                /* This is triggered on death of the collector */
                collector.on('end', collected => {
                    if (collected.size > 0) {
                        /* Message sent at the end of the collection period if something was collected*/
                        return;
                    } else {
                        log.run(collected, 2)
                        message.reply("Your faction purpose has timed out. Please redo your submission.");
                        return;
                    }
                });
            }

            if (args[2] && args[2].toLowerCase() == "lore") {
                /* Responds to the message that activated it */
                message.channel.send({ content: "Please send your faction's lore. 1024 Character Max!" });
                /* This is what we will be looking for, messages that match a certain criteria */
                const filter = m => m.author.id === message.author.id
                /* This is the collector being created, we put in the filter, and we also configure the time */
                const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                /* This is our collector function, it is active while the collector is alive */
                collector.on('collect', m => {

                    if (m.content.length > 1024) {
                        m.channel.send({ content: "Your faction lore failed! lore is to long! Keep it below 1024 characters." })
                        m.delete()
                        collector.stop();
                        return;
                    }

                    facData.factions[PData.players[message.author.id].faction].lore = m.content

                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    m.channel.send({ content: "Your faction lore was successful!" })

                    m.delete()
                    collector.stop();
                    return;
                });

                /* This is triggered on death of the collector */
                collector.on('end', collected => {
                    if (collected.size > 0) {
                        /* Message sent at the end of the collection period if something was collected*/
                        return;
                    } else {
                        log.run(collected, 2)
                        message.reply("Your faction lore has timed out. Please redo your submission.");
                        return;
                    }
                });
            }

            if (args[2] && args[2].toLowerCase() == "discord") {
                /* Responds to the message that activated it */
                message.channel.send({ content: "Please send your faction's discord. INVITE LINKS ONLY!" });
                /* This is what we will be looking for, messages that match a certain criteria */
                const filter = m => m.author.id === message.author.id
                /* This is the collector being created, we put in the filter, and we also configure the time */
                const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                /* This is our collector function, it is active while the collector is alive */
                collector.on('collect', m => {

                    if (!m.content.includes("https://discord.gg/")) {
                        m.channel.send({ content: "Your faction discord failed! Must be in invite format! https://discord.gg/boxnauts." })
                        m.delete()
                        collector.stop();
                        return;
                    }

                    facData.factions[PData.players[message.author.id].faction].discordlink = m.content

                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    m.channel.send({ content: "Your faction discord was successful!" })

                    m.delete()
                    collector.stop();
                    return;
                });

                /* This is triggered on death of the collector */
                collector.on('end', collected => {
                    if (collected.size > 0) {
                        /* Message sent at the end of the collection period if something was collected*/
                        return;
                    } else {
                        log.run(collected, 2)
                        message.reply("Your faction discord has timed out. Please redo your submission.");
                        return;
                    }
                });
            }

            if (args[2] && args[2].toLowerCase() == "color1") {
                /* Responds to the message that activated it */
                message.channel.send({ content: "Please send your faction's color1. Must be hex code format #012345!" });
                /* This is what we will be looking for, messages that match a certain criteria */
                const filter = m => m.author.id === message.author.id
                /* This is the collector being created, we put in the filter, and we also configure the time */
                const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                /* This is our collector function, it is active while the collector is alive */
                collector.on('collect', m => {

                    if (!m.content.includes("#") || m.content.length > 7 || m.content.length < 7) {
                        m.channel.send({ content: "Your faction color1 failed! Must be in hex code format! #012345." })
                        m.delete()
                        collector.stop();
                        return;
                    }

                    facData.factions[PData.players[message.author.id].faction].color1 = m.content

                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    m.channel.send({ content: "Your faction color1 was successful!" })

                    m.delete()
                    collector.stop();
                    return;
                });

                /* This is triggered on death of the collector */
                collector.on('end', collected => {
                    if (collected.size > 0) {
                        /* Message sent at the end of the collection period if something was collected*/
                        return;
                    } else {
                        log.run(collected, 2)
                        message.reply("Your faction color1 has timed out. Please redo your submission.");
                        return;
                    }
                });
            }

            if (args[2] && args[2].toLowerCase() == "color2") {
                /* Responds to the message that activated it */
                message.channel.send({ content: "Please send your faction's color2. Must be hex code format #012345!" });
                /* This is what we will be looking for, messages that match a certain criteria */
                const filter = m => m.author.id === message.author.id
                /* This is the collector being created, we put in the filter, and we also configure the time */
                const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                /* This is our collector function, it is active while the collector is alive */
                collector.on('collect', m => {

                    if (!m.content.includes("#") || m.content.length > 7 || m.content.length < 7) {
                        m.channel.send({ content: "Your faction color2 failed! Must be in hex code format! #012345." })
                        m.delete()
                        collector.stop();
                        return;
                    }

                    facData.factions[PData.players[message.author.id].faction].color2 = m.content

                    try {
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    m.channel.send({ content: "Your faction color2 was successful!" })

                    m.delete()
                    collector.stop();
                    return;
                });

                /* This is triggered on death of the collector */
                collector.on('end', collected => {
                    if (collected.size > 0) {
                        /* Message sent at the end of the collection period if something was collected*/
                        return;
                    } else {
                        log.run(collected, 2)
                        message.reply("Your faction color2 has timed out. Please redo your submission.");
                        return;
                    }
                });
            }
        }


        if (args[1].toLowerCase() == "join") {
            if (args.length < 2 || !Number.isInteger(parseInt(args[2]))) {
                message.reply("Need a faction to join! *Faction join (Number)")
            }

            if (PData.players[message.author.id].faction != 0) {
                message.reply("You are already in a faction! Please leave the faction to join a new one.")
                return;
            }

            if (!facData.factions[args[2]]) {
                message.reply("Invalid Faction!")
                return;
            }

            if (facData.factions[args[2]].locked == "true") {
                message.reply("That faction is currently locked.")
                return;
            }

            const FactionRole = facData.factions[args[2]].role

            if (message.guild != null) {
                console.log("Giving Faction Role")
                var FactionRoleReal = message.member.guild.roles.cache.find(role => role.id === FactionRole);
                message.member.roles.add(FactionRoleReal);
            }

            PData.players[message.author.id].faction = parseInt(args[2])
            facData.factions[parseInt(args[2])].members[message.author.id] = { name: message.author.username }

            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }

            message.reply("You have joined the faction!")

            const userA1 = await client.users.fetch(message.author.id);

            try {
                userA1.send(`Discord link: ${facData.factions[parseInt(args[2])].discordlink}`);
            } catch (error) {
                console.log(error)
                return;
            }
            return;
        }


        if (args[1].toLowerCase() == "leave") {
            if (PData.players[message.author.id].faction == 0) {
                message.reply("You are not in a faction.")
                return;
            }

            const FactionRole = facData.factions[PData.players[message.author.id].faction].role

            if (message.guild != null) {
                console.log("Removing Faction Role")
                var FactionRoleReal = message.member.guild.roles.cache.find(role => role.id === FactionRole);
                message.member.roles.remove(FactionRoleReal);
            }

            if (facData.factions[PData.players[message.author.id].faction].members) {
                delete facData.factions[PData.players[message.author.id].faction].members[message.author.id]
            }

            PData.players[message.author.id].faction = 0

            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }

            message.reply("You have left your faction!")
            return;
        }

        if (args[1].toLowerCase() == "admin") {
            if (!facData.factions[PData.players[message.author.id].faction] || !facData.factions[PData.players[message.author.id].faction].leader == message.author.id) {
                message.reply("No Permission!")
                return;
            }

            if (!args[2]) {
                message.reply("Invalid Command! *Faction Admin (Add/Remove/List)")
                return;
            }

            if (args[2].toLowerCase() == "add") {
                if (!message.mentions.members.first()) {
                    message.reply("Person MUST be mentioned! *Faction Add (Person)")
                    return;
                }

                let mentioned = message.mentions.members.first()

                if (facData.factions[PData.players[message.author.id].faction].admins) {
                    facData.factions[PData.players[message.author.id].faction].admins[mentioned.id] = { name: mentioned.user.username }
                } else {
                    facData.factions[PData.players[message.author.id].faction].admins = {}
                    facData.factions[PData.players[message.author.id].faction].admins[mentioned.id] = { name: mentioned.user.username }
                }

                try {
                    fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }

                message.reply(`You have added ${mentioned.user.username} as an admin of your faction!`)
                return;
            }

            if (args[2].toLowerCase() == "remove") {
                if (!message.mentions.members.first()) {
                    message.reply("Person MUST be mentioned! *Faction Add (Person)")
                    return;
                }

                let mentioned = message.mentions.members.first()

                if (facData.factions[PData.players[message.author.id].faction].admins) {
                    delete facData.factions[PData.players[message.author.id].faction].admins[mentioned.id]
                }

                try {
                    fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }

                message.reply(`You have removed ${mentioned.username} as an admin of your faction!`)
                return;
            }

            if (args[2].toLowerCase() == "list") {

                if (facData.factions[PData.players[message.author.id].faction].admins) {
                    var keys = Object.keys(facData.factions[PData.players[message.author.id].faction].admins)

                    AList = []

                    keys.forEach(key => {
                        AList.push(facData.factions[PData.players[message.author.id].faction].admins[key].name)
                    })

                    console.log(AList)

                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Faction Admins`)
                        .addField('Current Admins', AList.slice(0, 25).join("\n"), true)
                        .setTimestamp()
                        .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                    message.reply({ embeds: [embed] });
                    return;
                }

                message.reply(`Error Occured! You may not have admins.`)
                return;
            }
        }


        if (args[1].toLowerCase() == "create") {

            const TheMan = 398907393427243008
            if (message.author.id != TheMan) {
                return message.reply("You do not have permission!");
            }

            if (PData.players[message.author.id].tokens < 4000) {
                message.reply("You dont have enough tokens to create a faction! Cost: 4000")
                return;
            }

            if (PData.players[message.author.id].faction != 0) {
                message.reply("You are already in a faction! Please leave the faction to create a new one.")
                return;
            }

            function AskForName() {
                /* Responds to the message that activated it */
                message.channel.send({ content: "Please send your faction's name." });
                /* This is what we will be looking for, messages that match a certain criteria */
                const filter = m => m.author.id === message.author.id
                /* This is the collector being created, we put in the filter, and we also configure the time */
                const collector = message.channel.createMessageCollector({ filter, time: 30000 });

                /* This is our collector function, it is active while the collector is alive */
                collector.on('collect', m => {

                    if (m.content.length >= 26) {
                        m.channel.send({ content: "Your faction creation failed! Name is to long! Keep it below 25 characters." })
                        m.delete()
                        collector.stop();
                        return;
                    }

                    var fackeys = Object.keys(facData.factions)
                    var i = 0;
                    for (i = 0; i < fackeys.length; i++) {
                        if (facData.factions[fackeys[i]].name.includes(m.content)) {
                            m.channel.send({ content: "Your faction creation failed! Name already in use." })
                            m.delete()
                            collector.stop();
                            return;
                        }
                    }

                    facData.factions[fackeys.length + 1] = {
                        name: m.content,
                        lore: "CHANGE ME!",
                        purpose: "CHANGE ME!",
                        leader: m.author.id,
                        coleader: "None",
                        color1: "#000000",
                        color2: "#FFFFFF",
                        discordlink: "Discord.gg/Boxnauts",
                        role: "",
                        admins: [],
                        locked: "true",
                        ads: {},
                        stats: {
                            tokens: 250,
                            wins: 0,
                            loses: 0,
                            gamesPlayed: 0,
                            event: {
                                wins: 0,
                                loses: 0,
                                gamesPlayed: 0
                            }
                        },
                        members: { [m.author.id]: { name: m.author.username } }
                    }

                    PData.players[message.author.id].tokens - 4000
                    PData.players[message.author.id].faction = fackeys.length + 1

                    const FactionLeader = "915209591690768415"

                    if (!message.member.roles.cache.some(role => role.id === FactionLeader)) {
                        var FactionLeaderReal = message.member.guild.roles.cache.find(role => role.id === FactionLeader);
                        message.member.roles.add([FactionLeaderReal]);
                    }

                    try {
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        fs.writeFileSync('./Arena/Factions.json', JSON.stringify(facData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    log.run('[Faction Created] - ' + m.author.username, 1)
                    m.channel.send({ content: "Your faction creation was successful! Please use the edit command for the rest." })

                    m.delete()
                    collector.stop();
                    return;
                });

                /* This is triggered on death of the collector */
                collector.on('end', collected => {
                    if (collected.size > 0) {
                        /* Message sent at the end of the collection period if something was collected*/
                        return;
                    } else {
                        log.run(collected, 2)
                        message.reply("Your faction creation has timed out. Please redo your submission.");
                        return;
                    }
                });
            }



            AskForName()
            return;



            // const dir = './factions';
            // var dirLength = 0;

            // const tempdir = './tempfactions';
            // var tempDirLength = 0;

            // try {
            //     tempDirLength = fs.readdirSync(tempdir).length + 1
            //     dirLength = fs.readdirSync(dir).length + 1
            // } catch (error) {
            //     console.log(error)
            //     message.reply("Error starting submission. Please try again later.")
            //     return;
            // }

            // var tempImagePath = `./tempfactions/${tempDirLength}/logo.png`
            // var tempFolderPath = `./tempfactions/${tempDirLength}`
            // var tempJsonFilePath = `./tempfactions/${tempDirLength}/faction.json`

            // var ImagePath = `./factions/${dirLength}/logo.png`
            // var FolderPath = `./factions/${dirLength}`
            // var JsonFilePath = `./factions/${dirLength}/faction.json`

            // if (!fs.existsSync(tempFolderPath)) {
            //     fs.mkdirSync(tempFolderPath);
            // }
            // fs.writeFileSync(tempJsonFilePath, `{ "hello": 0 }`, function (err) { if (err) console.log(err) });

            // var FData;
            // try {
            //     FData = JSON.parse(fs.readFileSync(tempJsonFilePath, "utf8"))
            // } catch (e) {
            //     console.log(e);
            //     message.reply('An error occured, try again later.');
            //     return;
            // }

            // FData = {
            //     info: {
            //         name: "None",
            //         lore: "None",
            //         purpose: "None",
            //         leader: message.author.id.toString(),
            //         coleader: "None",
            //         color1: "#fffff",
            //         color2: "#0000f",
            //         discordlink: "None",
            //         locked: false
            //     },
            //     stats: {
            //         tokens: 250,
            //         wins: 0,
            //         loses: 0,
            //         gamesPlayed: 0,
            //         event: {
            //             wins: 0,
            //             loses: 0,
            //             gamesPlayed: 0
            //         }
            //     },
            //     ads: {}
            // }

            // try {
            //     fs.writeFileSync(tempJsonFilePath, JSON.stringify(FData, null, 2), 'utf8')
            // } catch (e) {
            //     console.log(e);
            //     message.reply('An error occured, try again later.');
            //     return;
            // }

            // function download(url) {
            //     fetch(url)
            //         .then(res =>
            //             res.body.pipe(fs.createWriteStream(imageFilePath))
            //         )
            // }






            // async function AskForImage() {
            //     /* Responds to the message that activated it */
            //     message.channel.send({ content: "Please send your faction's logo as a png." });
            //     /* This is what we will be looking for, messages that match a certain criteria */
            //     const filter = m => m.author.id === message.author.id
            //     /* This is the collector being created, we put in the filter, and we also configure the time */
            //     const collector = message.channel.createMessageCollector({ filter, time: 30000 });

            //     /* This is our collector function, it is active while the collector is alive */
            //     collector.on('collect', m => {

            //         let a = m.attachments.first();

            //         if (fs.existsSync(tempFolderPath)) {
            //             try {
            //                 request(a.url).pipe(fs.createWriteStream(tempImagePath))
            //             } catch (error) {
            //                 console.log(error)
            //                 m.channel.send({ content: "Error downloading your logo." })
            //                 return;
            //             }

            //             // if (a) {//checks if an attachment is sent
            //             //     let fileType = a.filename.split(".")
            //             //     console.log(fileType[0])
            //             //     if (fileType[0] == `png`) {//Download only png (customize this)
            //             //         console.log(a.url)
            //             //         download(a.url);//Function I will show later
            //             //     } else {
            //             //         return message.reply("Please make sure the file is PNG!")
            //             //     }
            //             // } else {
            //             //     console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA');
            //             // }
            //             log.run('[Faction Image Submitted] - ' + m.author.username, 1)
            //             m.channel.send({ content: "Your faction's logo was successfully submitted" })
            //             //m.reply('Your faction logo was successfully submitted');
            //         }

            //         m.delete()
            //         collector.stop();
            //         AskForName()
            //     });

            //     /* This is triggered on death of the collector */
            //     collector.on('end', collected => {
            //         if (collected.size > 0) {
            //             /* Message sent at the end of the collection period if something was collected*/
            //             return;
            //         } else {
            //             message.reply("Your faction's logo submission timed out. Please redo your submission.");
            //             log.run(collected, 2)
            //             return;
            //         }
            //     });
            // }


            // function AskForName() {
            //     /* Responds to the message that activated it */
            //     message.channel.send({ content: "Please send your faction's name." });
            //     /* This is what we will be looking for, messages that match a certain criteria */
            //     const filter = m => m.author.id === message.author.id
            //     /* This is the collector being created, we put in the filter, and we also configure the time */
            //     const collector = message.channel.createMessageCollector({ filter, time: 30000 });

            //     /* This is our collector function, it is active while the collector is alive */
            //     collector.on('collect', m => {
            //         if (fs.existsSync(tempFolderPath)) {
            //             FData.info.name = m.content
            //             try {
            //                 fs.writeFileSync(tempJsonFilePath, JSON.stringify(FData, null, 2), 'utf8')
            //             } catch (e) {
            //                 console.log(e);
            //                 m.reply('An error occured, try again later.');
            //                 return;
            //             }
            //             log.run('[Faction Name Submitted] - ' + m.author.username, 1)
            //             m.channel.send({ content: "Your faction's name was successfully submitted" })
            //             //m.reply('Your faction name was successfully submitted');
            //         }

            //         m.delete()
            //         collector.stop();
            //         AskForPurpose()
            //     });

            //     /* This is triggered on death of the collector */
            //     collector.on('end', collected => {
            //         if (collected.size > 0) {
            //             /* Message sent at the end of the collection period if something was collected*/
            //             return;
            //         } else {
            //             log.run(collected, 2)
            //             message.reply("Your faction's name timed out. Please redo your submission.");
            //             return;
            //         }
            //     });
            // }


            // function AskForPurpose() {
            //     /* Responds to the message that activated it */
            //     message.channel.send({ content: "Please send your faction's purpose." });
            //     /* This is what we will be looking for, messages that match a certain criteria */
            //     const filter = m => m.author.id === message.author.id
            //     /* This is the collector being created, we put in the filter, and we also configure the time */
            //     const collector = message.channel.createMessageCollector({ filter, time: 30000 });

            //     /* This is our collector function, it is active while the collector is alive */
            //     collector.on('collect', m => {
            //         if (fs.existsSync(tempFolderPath)) {
            //             FData.info.purpose = m.content
            //             try {
            //                 fs.writeFileSync(tempJsonFilePath, JSON.stringify(FData, null, 2), 'utf8')
            //             } catch (e) {
            //                 console.log(e);
            //                 m.reply('An error occured, try again later.');
            //                 return;
            //             }
            //             log.run('[Faction Purpose Submitted] - ' + m.author.username, 1)
            //             m.channel.send({ content: "Your faction's purpose was successfully submitted" })
            //             //m.reply('Your faction name was successfully submitted');
            //         }

            //         m.delete()
            //         collector.stop();
            //         AskForLore()
            //     });

            //     /* This is triggered on death of the collector */
            //     collector.on('end', collected => {
            //         if (collected.size > 0) {
            //             /* Message sent at the end of the collection period if something was collected*/
            //             return;
            //         } else {
            //             log.run(collected, 2)
            //             message.reply("Your faction's purpose timed out. Please redo your submission.");
            //             return;
            //         }
            //     });
            // }


            // function AskForLore() {
            //     /* Responds to the message that activated it */
            //     message.channel.send({ content: "Please send your faction's lore." });
            //     /* This is what we will be looking for, messages that match a certain criteria */
            //     const filter = m => m.author.id === message.author.id
            //     /* This is the collector being created, we put in the filter, and we also configure the time */
            //     const collector = message.channel.createMessageCollector({ filter, time: 30000 });

            //     /* This is our collector function, it is active while the collector is alive */
            //     collector.on('collect', m => {
            //         if (fs.existsSync(tempFolderPath)) {
            //             FData.info.lore = m.content
            //             try {
            //                 fs.writeFileSync(tempJsonFilePath, JSON.stringify(FData, null, 2), 'utf8')
            //             } catch (e) {
            //                 console.log(e);
            //                 m.reply('An error occured, try again later.');
            //                 return;
            //             }
            //             log.run('[Faction Lore Submitted] - ' + m.author.username, 1)
            //             m.channel.send({ content: "Your faction's lore was successfully submitted" })
            //             //m.reply('Your faction name was successfully submitted');
            //         }

            //         m.delete()
            //         collector.stop();
            //         AskForLink()
            //     });

            //     /* This is triggered on death of the collector */
            //     collector.on('end', collected => {
            //         if (collected.size > 0) {
            //             /* Message sent at the end of the collection period if something was collected*/
            //             return;
            //         } else {
            //             log.run(collected, 2)
            //             message.reply("Your faction's lore timed out. Please redo your submission.");
            //             return;
            //         }
            //     });
            // }


            // function AskForLink() {
            //     /* Responds to the message that activated it */
            //     message.channel.send({ content: "Please send your faction's discord link." });
            //     /* This is what we will be looking for, messages that match a certain criteria */
            //     const filter = m => m.author.id === message.author.id
            //     /* This is the collector being created, we put in the filter, and we also configure the time */
            //     const collector = message.channel.createMessageCollector({ filter, time: 30000 });

            //     /* This is our collector function, it is active while the collector is alive */
            //     collector.on('collect', m => {
            //         if (fs.existsSync(tempFolderPath)) {
            //             FData.info.discordlink = m.content
            //             try {
            //                 fs.writeFileSync(tempJsonFilePath, JSON.stringify(FData, null, 2), 'utf8')
            //             } catch (e) {
            //                 console.log(e);
            //                 m.reply('An error occured, try again later.');
            //                 return;
            //             }
            //             log.run('[Faction Lore Submitted] - ' + m.author.username, 1)
            //             m.channel.send({ content: "Your faction's discord link was successfully submitted" })
            //             //m.reply('Your faction name was successfully submitted');
            //         }

            //         m.delete()
            //         collector.stop();
            //         AskForColor1()
            //     });

            //     /* This is triggered on death of the collector */
            //     collector.on('end', collected => {
            //         if (collected.size > 0) {
            //             /* Message sent at the end of the collection period if something was collected*/
            //             return;
            //         } else {
            //             log.run(collected, 2)
            //             message.reply("Your faction's discord link timed out. Please redo your submission.");
            //             return;
            //         }
            //     });
            // }


            // function AskForColor1() {
            //     /* Responds to the message that activated it */
            //     message.channel.send({ content: "Please send your faction's primary color. EX: #F74830" });
            //     /* This is what we will be looking for, messages that match a certain criteria */
            //     const filter = m => m.author.id === message.author.id
            //     /* This is the collector being created, we put in the filter, and we also configure the time */
            //     const collector = message.channel.createMessageCollector({ filter, time: 30000 });

            //     /* This is our collector function, it is active while the collector is alive */
            //     collector.on('collect', m => {
            //         if (fs.existsSync(tempFolderPath)) {
            //             FData.info.color1 = m.content
            //             try {
            //                 fs.writeFileSync(tempJsonFilePath, JSON.stringify(FData, null, 2), 'utf8')
            //             } catch (e) {
            //                 console.log(e);
            //                 m.reply('An error occured, try again later.');
            //                 return;
            //             }
            //             log.run('[Faction Color1 Submitted] - ' + m.author.username, 1)
            //             m.channel.send({ content: "Your faction's primary color was successfully submitted" })
            //             //m.reply('Your faction name was successfully submitted');
            //         }

            //         m.delete()
            //         collector.stop();
            //         AskForColor2()
            //     });

            //     /* This is triggered on death of the collector */
            //     collector.on('end', collected => {
            //         if (collected.size > 0) {
            //             /* Message sent at the end of the collection period if something was collected*/
            //             return;
            //         } else {
            //             log.run(collected, 2)
            //             message.reply("Your faction's primary color timed out. Please redo your submission.");
            //             return;
            //         }
            //     });
            // }


            // function AskForColor2() {
            //     /* Responds to the message that activated it */
            //     message.channel.send({ content: "Please send your faction's secondary color. EX: #79F730" });
            //     /* This is what we will be looking for, messages that match a certain criteria */
            //     const filter = m => m.author.id === message.author.id
            //     /* This is the collector being created, we put in the filter, and we also configure the time */
            //     const collector = message.channel.createMessageCollector({ filter, time: 30000 });

            //     /* This is our collector function, it is active while the collector is alive */
            //     collector.on('collect', m => {
            //         if (fs.existsSync(tempFolderPath)) {
            //             FData.info.color2 = m.content
            //             try {
            //                 fs.writeFileSync(tempJsonFilePath, JSON.stringify(FData, null, 2), 'utf8')
            //             } catch (e) {
            //                 console.log(e);
            //                 m.reply('An error occured, try again later.');
            //                 return;
            //             }
            //             log.run('[Faction Color2 Submitted] - ' + m.author.username, 1)
            //             m.channel.send({ content: "Your faction's secondary color was successfully submitted" })
            //             //m.reply('Your faction name was successfully submitted');
            //         }

            //         m.delete()
            //         collector.stop();
            //         Finalize()
            //     });

            //     /* This is triggered on death of the collector */
            //     collector.on('end', collected => {
            //         if (collected.size > 0) {
            //             /* Message sent at the end of the collection period if something was collected*/
            //             return;
            //         } else {
            //             log.run(collected, 2)
            //             message.reply("Your faction's secondary color timed out. Please redo your submission.");
            //             return;
            //         }
            //     });
            // }


            // function Finalize() {
            //     if (!fs.existsSync(FolderPath)) {
            //         fs.mkdirSync(FolderPath);
            //     }

            //     try {
            //         //fs.copyFileSync(tempImagePath, ImagePath);
            //         fs.copyFileSync(tempJsonFilePath, JsonFilePath);
            //     } catch (error) {
            //         console.log(error);
            //         return;
            //     }

            //     PData.players[message.author.id].tokens - 4000
            //     PData.players[message.author.id].faction = dirLength



            //     const FactionLeader = "915209591690768415"

            //     if (!message.member.roles.cache.some(role => role.id === FactionLeader)) {
            //         var FactionLeaderReal = message.member.guild.roles.cache.find(role => role.id === FactionLeader);
            //         message.member.roles.add([FactionLeaderReal]);
            //     }

            //     try {
            //         fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
            //     } catch (e) {
            //         console.log(e);
            //         return;
            //     }

            //     message.channel.send({ content: "Your faction creation was successful!" });
            // }


            // function AskForAd() {
            //     let filter = m => m.author.id === message.author.id
            //     message.reply(`Please send your faction ad.`).then(() => {
            //         message.channel.awaitMessages(filter, {
            //             max: 1,
            //             time: 30000,
            //             errors: ['time']
            //         })
            //             .then(message => {
            //                 message = message.first()
            //                 if (message.content.length >= 2000) {
            //                     let over = message.content.length - 2000
            //                     message.reply('Your ad is to long to be posted. Please keep it within 2000 characters. You are ' + over + ' characters over the limit.');
            //                     return;
            //                 }

            //                 if (fs.existsSync(tempFolderPath)) {
            //                     fs.writeFileSync(tempFilePath, message.content, function (err) { if (err) console.log(err) });
            //                     if (fs.existsSync(FolderPath)) {
            //                         fs.copyFile(tempNameFilePath, nameFilePath, (err) => { if (err) throw err; });
            //                         fs.copyFile(tempFilePath, FilePath, (err) => { if (err) throw err; });
            //                         fs.copyFile(tempImageFilePath, imageFilePath, (err) => { if (err) throw err; });
            //                     } else {
            //                         fs.mkdirSync(FolderPath);
            //                         fs.copyFile(tempNameFilePath, nameFilePath, (err) => { if (err) throw err; });
            //                         fs.copyFile(tempFilePath, FilePath, (err) => { if (err) throw err; });
            //                         fs.copyFile(tempImageFilePath, imageFilePath, (err) => { if (err) throw err; });
            //                     }
            //                     log.run('[Faction AD Submitted] - ' + message.author.username, 1)
            //                     message.reply('Your faction AD was successfully submitted');
            //                 }
            //                 else {
            //                     fs.mkdirSync(tempFolderPath);
            //                     fs.writeFileSync(tempFilePath, message.content, function (err) { if (err) console.log(err) });
            //                     if (fs.existsSync(FolderPath)) {
            //                         fs.copyFile(tempNameFilePath, nameFilePath, (err) => { if (err) throw err; });
            //                         fs.copyFile(tempFilePath, FilePath, (err) => { if (err) throw err; });
            //                         fs.copyFile(tempImageFilePath, imageFilePath, (err) => { if (err) throw err; });
            //                     } else {
            //                         fs.mkdirSync(FolderPath);
            //                         fs.copyFile(tempNameFilePath, nameFilePath, (err) => { if (err) throw err; });
            //                         fs.copyFile(tempFilePath, FilePath, (err) => { if (err) throw err; });
            //                         fs.copyFile(tempImageFilePath, imageFilePath, (err) => { if (err) throw err; });
            //                     }
            //                     log.run('[Faction AD Submitted] - ' + message.author.username, 1)
            //                     message.reply('Your faction AD was successfully submitted');
            //                 }

            //                 message.delete()
            //             })
            //             .catch(collected => {
            //                 message.reply('Your faction ad timed out. Please redo your submission.');
            //                 log.run(collected, 2)
            //                 return;
            //             });
            //     })
            // }


            // AskForName()

            // log.run('[CREATE FACTION] - ' + message.author.username, 1)
            // return;
        }

        return;

        // if (args[1] == "create") {
        //     const fs = require('fs');
        //     let request = require(`request`);
        //     const path = require('path');

        //     let FolderPath = `./factions/${message.member.id}`
        //     let FilePath = `./factions/${message.member.id}/ad.txt`
        //     let nameFilePath = `./factions/${message.member.id}/name.txt`
        //     let imageFilePath = `./factions/${message.member.id}/logo.png`

        //     let tempFolderPath = `./tempfactions/${message.member.id}`
        //     let tempFilePath = `./tempfactions/${message.member.id}/ad.txt`
        //     let tempNameFilePath = `./tempfactions/${message.member.id}/name.txt`
        //     let tempImageFilePath = `./tempfactions/${message.member.id}/logo.png`

        //     function download(url) {
        //         fetch(url)
        //             .then(res =>
        //                 res.body.pipe(fs.createWriteStream(imageFilePath))
        //             )
        //     }

        //     async function AskForImage() {
        //         let filter = m => m.author.id === message.author.id
        //         message.reply(`Please send your faction logo or banner.`).then(() => {
        //             message.channel.awaitMessages(filter, {
        //                 max: 1,
        //                 time: 30000,
        //                 errors: ['time']
        //             })
        //                 .then(message => {
        //                     message = message.first()
        //                     let a = message.attachments.first();


        //                     if (fs.existsSync(tempFolderPath)) {
        //                         request(a.url).pipe(fs.createWriteStream(tempImageFilePath))
        //                         // if (a) {//checks if an attachment is sent
        //                         //     let fileType = a.filename.split(".")
        //                         //     console.log(fileType[0])
        //                         //     if (fileType[0] == `png`) {//Download only png (customize this)
        //                         //         console.log(a.url)
        //                         //         download(a.url);//Function I will show later
        //                         //     } else {
        //                         //         return message.reply("Please make sure the file is PNG!")
        //                         //     }
        //                         // } else {
        //                         //     console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA');
        //                         // }
        //                         log.run('[Faction Image Submitted] - ' + message.author.username, 1)
        //                         message.reply('Your faction Image was successfully submitted');
        //                     }
        //                     else {
        //                         fs.mkdirSync(tempFolderPath);
        //                         request(a.url).pipe(fs.createWriteStream(tempImageFilePath))
        //                         // if (a) {//checks if an attachment is sent
        //                         //     let fileType = a.filename.split(".")
        //                         //     console.log(fileType[0])
        //                         //     if (fileType[0] == `png`) {//Download only png (customize this)
        //                         //         console.log(a.url)
        //                         //         download(a.url);//Function I will show later
        //                         //     } else {
        //                         //         return message.reply("Please make sure the file is PNG!")
        //                         //     }
        //                         // } else {
        //                         //     console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA');
        //                         // }
        //                         log.run('[Faction Image Submitted] - ' + message.author.username, 1)
        //                         message.reply('Your faction Image was successfully submitted');
        //                     }

        //                     message.delete()
        //                     AskForName()
        //                 })
        //                 .catch(collected => {
        //                     message.reply('Your faction Image timed out. Please redo your submission.');
        //                     log.run(collected, 2)
        //                     return;
        //                 });
        //         })
        //     }

        //     async function AskForName() {
        //         let filter = m => m.author.id === message.author.id
        //         message.reply(`Please send your faction name.`).then(() => {
        //             message.channel.awaitMessages(filter, {
        //                 max: 1,
        //                 time: 30000,
        //                 errors: ['time']
        //             })
        //                 .then(message => {
        //                     message = message.first()
        //                     if (fs.existsSync(tempFolderPath)) {
        //                         fs.writeFileSync(tempNameFilePath, message.content, function (err) { if (err) console.log(err) });
        //                         log.run('[Faction Name Submitted] - ' + message.author.username, 1)
        //                         message.reply('Your faction name was successfully submitted');
        //                     }
        //                     else {
        //                         fs.mkdirSync(tempFolderPath);
        //                         fs.writeFileSync(tempNameFilePath, message.content);
        //                         log.run('[Faction Name Submitted] - ' + message.author.username, 1)
        //                         message.reply('Your faction name was successfully submitted');
        //                     }

        //                     message.delete()
        //                     AskForAd()
        //                 })
        //                 .catch(collected => {
        //                     log.run(collected, 2)
        //                     message.reply('Your faction name timed out. Please redo your submission.');
        //                     return;
        //                 });
        //         })
        //     }

        //     async function AskForAd() {
        //         let filter = m => m.author.id === message.author.id
        //         message.reply(`Please send your faction ad.`).then(() => {
        //             message.channel.awaitMessages(filter, {
        //                 max: 1,
        //                 time: 30000,
        //                 errors: ['time']
        //             })
        //                 .then(async message => {
        //                     message = message.first()
        //                     if (message.content.length >= 2000) {
        //                         let over = await message.content.length - 2000
        //                         message.reply('Your ad is to long to be posted. Please keep it within 2000 characters. You are ' + over + ' characters over the limit.');
        //                         return;
        //                     }

        //                     if (fs.existsSync(tempFolderPath)) {
        //                         fs.writeFileSync(tempFilePath, message.content, function (err) { if (err) console.log(err) });
        //                         if (fs.existsSync(FolderPath)) {
        //                             fs.copyFile(tempNameFilePath, nameFilePath, (err) => { if (err) throw err; });
        //                             fs.copyFile(tempFilePath, FilePath, (err) => { if (err) throw err; });
        //                             fs.copyFile(tempImageFilePath, imageFilePath, (err) => { if (err) throw err; });
        //                         } else {
        //                             fs.mkdirSync(FolderPath);
        //                             fs.copyFile(tempNameFilePath, nameFilePath, (err) => { if (err) throw err; });
        //                             fs.copyFile(tempFilePath, FilePath, (err) => { if (err) throw err; });
        //                             fs.copyFile(tempImageFilePath, imageFilePath, (err) => { if (err) throw err; });
        //                         }
        //                         log.run('[Faction AD Submitted] - ' + message.author.username, 1)
        //                         message.reply('Your faction AD was successfully submitted');
        //                     }
        //                     else {
        //                         fs.mkdirSync(tempFolderPath);
        //                         fs.writeFileSync(tempFilePath, message.content, function (err) { if (err) console.log(err) });
        //                         if (fs.existsSync(FolderPath)) {
        //                             fs.copyFile(tempNameFilePath, nameFilePath, (err) => { if (err) throw err; });
        //                             fs.copyFile(tempFilePath, FilePath, (err) => { if (err) throw err; });
        //                             fs.copyFile(tempImageFilePath, imageFilePath, (err) => { if (err) throw err; });
        //                         } else {
        //                             fs.mkdirSync(FolderPath);
        //                             fs.copyFile(tempNameFilePath, nameFilePath, (err) => { if (err) throw err; });
        //                             fs.copyFile(tempFilePath, FilePath, (err) => { if (err) throw err; });
        //                             fs.copyFile(tempImageFilePath, imageFilePath, (err) => { if (err) throw err; });
        //                         }
        //                         log.run('[Faction AD Submitted] - ' + message.author.username, 1)
        //                         message.reply('Your faction AD was successfully submitted');
        //                     }

        //                     message.delete()
        //                 })
        //                 .catch(collected => {
        //                     message.reply('Your faction ad timed out. Please redo your submission.');
        //                     log.run(collected, 2)
        //                     return;
        //                 });
        //         })
        //     }


        //     AskForImage()

        //     log.run('[CREATE FACTION] - ' + message.author.username, 1)
        //     return true;
        // }
    }


}