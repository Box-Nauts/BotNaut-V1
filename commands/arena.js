const { Client, MessageEmbed, Collection, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const Canvas = require('canvas');

const arenaChannel = '938661421485527090'

module.exports = {
    name: 'arena',
    description: "Arena Commands",
    guilds: [
        "919659368021114940",//Boxnauts Testing
    ],

    //////////////////////NOTES/////////////////////////
    // Add betting on matches.
    // Trading nauts
    // multiple nauts
    // 1v1 Command
    // check if players are fighting the same people over and over.
    // Send warning for people using same attack a bunch while vs same player
    // daily or every amoint of day claims
    // more gambling


    async run(message, args, client, Discord) {

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const arenaLeadUtil = await requireUncached(`../utilities/arenaLeadUtil`);
        const log = await requireUncached(`../utilities/logging`);

        // const TheMan = 398907393427243008
        // if (message.author.id != TheMan) {
        //     return message.reply("You do not have permission!");
        // }

        let GenesisRole = "938401505676001343"
        let ModRole = "911762951617257553"
        let CorpStaffRole = "897233662406455357"
        let WhitelistRole = "897234218495651880"
        let ogBoxnautRole = "937467471881973760"
        let earlySupporter = "935850927011799070"
        let Factionlead = "915209591690768415"
        // if (!message.member.roles.cache.some(role => role.id === GenesisRole) && !message.member.roles.cache.some(role => role.id === ModRole) && !message.member.roles.cache.some(role => role.id === CorpStaffRole) && !message.member.roles.cache.some(role => role.id === WhitelistRole) && !message.member.roles.cache.some(role => role.id === ogBoxnautRole) && !message.member.roles.cache.some(role => role.id === earlySupporter) && !message.member.roles.cache.some(role => role.id === Factionlead)) {
        //     message.reply("You do not have permission!")
        //     return;
        // }

        if (message.guild != null) {
            //if (message.channel.id != "938665699021324318" && message.channel.id != "954077618783797268") {
                //message.reply("Please use the correct channel for this command!")
                //return;
            //}
        }

        //var userType = "NONE"

        // if (message.member.roles.cache.some(role => role.id === '935891001548091483')) {
        //     userType = "Nature"
        // } else if (message.member.roles.cache.some(role => role.id === '935891204988633208')) {
        //     userType = "Poison"
        // } else if (message.member.roles.cache.some(role => role.id === '935891452909723678')) {
        //     userType = "Zombie"
        // } else if (message.member.roles.cache.some(role => role.id === '935891555900878889')) {
        //     userType = "Electric"
        // } else if (message.member.roles.cache.some(role => role.id === '935891610850443284')) {
        //     userType = "Fire"
        // } else if (message.member.roles.cache.some(role => role.id === '935891684674388028')) {
        //     userType = "Water"
        // } else if (message.member.roles.cache.some(role => role.id === '935891838710214656')) {
        //     userType = "Air"
        // } else if (message.member.roles.cache.some(role => role.id === '935891916569059328')) {
        //     userType = "Void"
        // } else if (message.member.roles.cache.some(role => role.id === '935891988346204200')) {
        //     userType = "Rock"
        // } else if (message.member.roles.cache.some(role => role.id === '935892105203695708')) {
        //     userType = "Psychic"
        // }

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

        const arenaGodnaut = "937481957753880646"
        const arenaWarlord = "935854260720115752"
        const arenaGeneral = "935855456826568725"
        const arenaCommander = "935855678344527952"
        const arenaNovice = "935854127068618762"
        const WhitelistR = "938965905902288957"//944560610132230154
        const OGWhitelist = "937467471881973760"
        if (message.guild != null) {
            if (PData.players[message.author.id].wins) {
                if (PData.players[message.author.id].wins >= 1000) {//ARENA Godnaut
                    if (!message.member.roles.cache.some(role => role.id === arenaGodnaut) || !message.member.roles.cache.some(role => role.id === WhitelistR) || !message.member.roles.cache.some(role => role.id === OGWhitelist)) {
                        console.log("Giving Arena Roles")
                        var arenaGodnautReal = message.member.guild.roles.cache.find(role => role.id === arenaGodnaut);
                        var WhitelistReal = message.member.guild.roles.cache.find(role => role.id === WhitelistR);
                        var OGWhitelistReal = message.member.guild.roles.cache.find(role => role.id === OGWhitelist);
                        message.member.roles.add([arenaGodnautReal, WhitelistReal, OGWhitelistReal]);
                        var arenaWarlordReal = message.member.guild.roles.cache.find(role => role.id === arenaWarlord);
                        var arenaGeneralReal = message.member.guild.roles.cache.find(role => role.id === arenaGeneral);
                        var arenaCommanderReal = message.member.guild.roles.cache.find(role => role.id === arenaCommander);
                        var arenaNoviceReal = message.member.guild.roles.cache.find(role => role.id === arenaNovice);
                        message.member.roles.remove([arenaWarlordReal, arenaGeneralReal, arenaCommanderReal, arenaNoviceReal]);
                    }
                } else if (PData.players[message.author.id].wins >= 300) {//ARENA Warlord
                    if (!message.member.roles.cache.some(role => role.id === arenaWarlord) || !message.member.roles.cache.some(role => role.id === WhitelistR)) {
                        console.log("Giving Arena Roles")
                        var arenaWarlordReal = message.member.guild.roles.cache.find(role => role.id === arenaWarlord);
                        var WhitelistReal = message.member.guild.roles.cache.find(role => role.id === WhitelistR);
                        message.member.roles.add([arenaWarlordReal, WhitelistReal]);
                        var arenaGeneralReal = message.member.guild.roles.cache.find(role => role.id === arenaGeneral);
                        var arenaCommanderReal = message.member.guild.roles.cache.find(role => role.id === arenaCommander);
                        var arenaNoviceReal = message.member.guild.roles.cache.find(role => role.id === arenaNovice);
                        message.member.roles.remove([arenaGeneralReal, arenaCommanderReal, arenaNoviceReal]);
                    }
                } else if (PData.players[message.author.id].wins >= 200) {//Whitelist
                    if (!message.member.roles.cache.some(role => role.id === WhitelistR)) {
                        console.log("Giving Arena Roles")
                        var WhitelistReal = message.member.guild.roles.cache.find(role => role.id === WhitelistR);
                        message.member.roles.add(WhitelistReal);
                    }
                } else if (PData.players[message.author.id].wins >= 75) {//ARENA General
                    if (!message.member.roles.cache.some(role => role.id === arenaGeneral)) {
                        console.log("Giving Arena Roles")
                        var arenaGeneralReal = message.member.guild.roles.cache.find(role => role.id === arenaGeneral);
                        message.member.roles.add(arenaGeneralReal);
                        var arenaCommanderReal = message.member.guild.roles.cache.find(role => role.id === arenaCommander);
                        var arenaNoviceReal = message.member.guild.roles.cache.find(role => role.id === arenaNovice);
                        message.member.roles.remove([arenaCommanderReal, arenaNoviceReal]);
                    }
                } else if (PData.players[message.author.id].wins >= 30) {//ARENA Commander
                    if (!message.member.roles.cache.some(role => role.id === arenaCommander)) {
                        console.log("Giving Arena Roles")
                        var arenaCommanderReal = message.member.guild.roles.cache.find(role => role.id === arenaCommander);
                        message.member.roles.add(arenaCommanderReal);
                        var arenaNoviceReal = message.member.guild.roles.cache.find(role => role.id === arenaNovice);
                        message.member.roles.remove(arenaNoviceReal);
                    }
                } else if (PData.players[message.author.id].wins >= 10) {//ARENA Novice
                    if (!message.member.roles.cache.some(role => role.id === arenaNovice)) {
                        console.log("Giving Arena Roles")
                        var arenaNoviceReal = message.member.guild.roles.cache.find(role => role.id === arenaNovice);
                        message.member.roles.add(arenaNoviceReal);
                    }
                }
            }
        }

        const BTypes = [
            "Fire",
            "Void",
            "Rock",
            "Zombie",
            "Electric",
            "Nature",
            "Air",
            "Water",
            "Poison",
            "Psychic"
        ]

        const elements = [
            "Hydrogen",
            "Potassium",
            "Francium",
            "Cobalt",
            "Titanium",
            "Germanium",
            "Boron",
            "Sulfur",
            "Fluorine",
            "Beryllium",
            "Phosphorus",
            "Bismuth",
            "Lithium",
            "Niobium",
            "Helium",
            "Iron",
            "Strontium",
            "Uranium",
            "Carbon",
            "Rubidium",
            "Chlorine",
            "Magnesium",
            "Tungsten",
            "Neon",
            "Sodium",
            "Selenium",
            "Bromine",
            "Bohrium",
            "Barium",
            "Argon",
            "Oxygen",
            "Caesium",
            "Iodine",
            "Nitrogen",
            "Silicone",
            "Krypton",
            "Scandium",
            "Indium",
            "Calcium",
            "Radium"
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
            "PSYCHIC": {
                "Melee": "Eerie Pulse",
                "Defense": "Lunar Defence",
                "Ranged": "Psycho Force"
            },
        };

        if (!args[1]) {
            message.reply("Unknown command! Use *Arena Help")
            return;
        }


        //----------------------DELETE DEAD BOXNAUTS----------------------//
        //var matchData;
        var PData;
        try {
            //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        } catch (e) {
            console.log(e);
            return;
        }

        if (PData.players[message.author.id].naut) {
            if (PData.players[message.author.id].naut.hp <= 0) {
                message.reply("*Your boxnaut suddenly collapses and crumbles into elemental dust.*")
                delete PData.players[message.author.id].naut;
                PData.players[message.author.id].name = message.member.displayName.toString()

                try {
                    fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }
            }
        }
        //----------------------DELETE DEAD BOXNAUTS----------------------//


        if (args[1].toLowerCase() == "queue" || args[1].toLowerCase() == "q") {
            var matchData;
            //var PData;
            try {
                matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            message.reply(`Currently ${Object.keys(matchData.currentQueue).length} users in queue!`)
        }


        if (args[1].toLowerCase() == "join") {
            var matchData;
            var PData;
            try {
                matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (!PData.players[message.author.id].naut) {
                message.reply("You dont have a boxnaut yet. Please use *Arena buy.")
                return;
            }

            //if (PData.players[message.author.id].naut.hp <= 0) {
            //message.reply("Your boxnaut is broken. Please use *Arena buy.")
            //return;
            //}


            var date1 = new Date(); // 9:00 AM
            PData.players[message.author.id].naut.date = date1

            const user = await client.users.fetch(message.author.id);
            user.send("Confirming i can send you messages.").catch(async err => {
                console.log(err);
                message.reply("You need to turn on dms for this server so the bot can allow you to play!");
                return;
            });;

            if (!matchData.currentQueue[message.author.id]) {
                matchData.currentQueue[message.author.id] = { name: message.member.displayName.toString() }
                PData.players[message.author.id].name = message.member.displayName.toString()
                //console.log(matchData)
                try {
                    fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                    fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }

                message.reply(`You have joined The Arena queue. You will be notified when your match begins. Currently ${Object.keys(matchData.currentQueue).length} users in queue!`)
                return;
            } else {

                message.reply(`You are already in the queue. Currently ${Object.keys(matchData.currentQueue).length} users in queue!`)
                return;
            }
        }


        if (args[1].toLowerCase() == "leave") {
            var matchData;
            //var PData;
            try {
                matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (matchData.currentQueue[message.author.id]) {
                delete matchData.currentQueue[message.author.id];
                //console.log(matchData)
                try {
                    fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }

                message.reply(`You have left The Arena queue.`)
                return;
            } else {

                message.reply(`You are not currently in the queue.`)
                return;
            }
        }


        if (args[1].toLowerCase() == "help") {
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Arena Commands | ( ) Required < > Optional`)
                .setDescription(`All currently available arena commands.`)
                //.addField('*Arena Help', 'Lists all commands.', true)
                .addField('Basic Commands', '*Arena Help - Lists all commands.', true)
                .addField('Queue Commands', '*Arena Join - Joins the arena queue.\n*Arena Leave - Leaves the arena queue.\n*Arena Queue - View the current queue.', true)
                //.addField('*Arena Join', 'Joins the arena queue.', true)
                //.addField('*Arena Leave', 'Leaves the arena queue.', true)
                //.addField('*Arena Queue', 'View the current queue.', true)
                .addField('Boxnaut Commands', '*Arena Buy - Buy your boxnaut(Costs: 124).\n*Arena Dismantle - Dismantle your boxnaut(Costs: 124).\n*Arena Repair - Repair your boxnaut(Costs: 248).\n*Arena Boxnaut <Person> - View your/persons boxnaut.\n*Arena Stock - Lists stock availible to purchase.\n*Arena Owned - Lists all owned nauts.', false)
                .addField('Stats Commands', '*Arena Stats <Person> - Lists your/persons stats.\n*Arena Event Stats <Person> - Lists your/persons event stats.\n*Arena Tokens <Person> - View your/persons token balance.\n*Arena Tip (Amount) (Person) - Tip some tokens to a friend!', true)
                //.addField('*Arena Tokens', 'View your token balance.', true)
                //.addField('*Arena Buy', 'Buy your boxnaut.', true)
                //.addField('*Arena Dismantle', 'Dismantle your boxnaut.', true)
                //.addField('*Arena Repair', 'Repair your boxnaut.', true)
                //.addField('*Arena Boxnaut', 'View your boxnaut.', true)
                //.addField('*Arena Stats', 'Lists your stats.', true)
                //.addField('*Arena Event Stats', 'Lists your event stats.', true)
                .setTimestamp()
                .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

            message.reply({ embeds: [embed] });
        }


        if (args[1].toLowerCase() == "leaderboard") {
            const TheMan = 398907393427243008
            if (message.author.id != TheMan) {
                return message.reply("You do not have permission!");
            }

            arenaLeadUtil.run(client)

            message.reply("Updated")
        }


        if (args[1].toLowerCase() == "event") {
            //var matchData;
            var PData;
            var Config;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (args[2].toLowerCase() == "clear") {
                const TheMan = 398907393427243008
                if (message.author.id != TheMan) {
                    return message.reply("You do not have permission!");
                }

                var keys = Object.keys(PData.players)
                for (var i = 0; i < keys.length; i++) {
                    PData.players[keys[i]].event = { wins: 0, loses: 0, gamesPlayed: 0 }
                }

                message.reply("You have wiped event data!")
            }

            if (args[2].toLowerCase() == "start") {
                const TheMan = 398907393427243008
                const TheMan2 = 222153421745160192
                if (message.author.id != TheMan && message.author.id != TheMan2) {
                    return message.reply("You do not have permission!");
                }

                Config.eventStart = true
                message.reply("You have started the event!")
            }

            if (args[2].toLowerCase() == "end") {
                const TheMan = 398907393427243008
                const TheMan2 = 222153421745160192
                if (message.author.id != TheMan && message.author.id != TheMan2) {
                    return message.reply("You do not have permission!");
                }

                Config.eventStart = false
                message.reply("You have stopped the event!")
            }

            if (args[2].toLowerCase() == "stats") {
                if (!PData.players[message.author.id]) {
                    message.reply("You dont have any stats yet. Try again later.")
                    return;
                }

                if (message.mentions.members.first()) {
                    let mentioned = message.mentions.members.first()

                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${mentioned.user.username}'s Event Stats`)
                        .addField('Wins', PData.players[mentioned.id].event.wins.toString(), true)
                        .addField('Loses', PData.players[mentioned.id].event.loses.toString(), true)
                        .addField('W/L Ratio', (PData.players[mentioned.id].event.wins / PData.players[mentioned.id].event.loses).toString(), true)
                        .addField('Games Played', PData.players[mentioned.id].event.gamesPlayed.toString(), true)
                        .setTimestamp()
                        .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                    message.reply({ embeds: [embed] });
                    return;
                }

                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Your Event Stats`)
                    .addField('Wins', PData.players[message.author.id].event.wins.toString(), true)
                    .addField('Loses', PData.players[message.author.id].event.loses.toString(), true)
                    .addField('W/L Ratio', (PData.players[message.author.id].event.wins / PData.players[message.author.id].event.loses).toString(), true)
                    .addField('Games Played', PData.players[message.author.id].event.gamesPlayed.toString(), true)
                    .setTimestamp()
                    .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                message.reply({ embeds: [embed] });
            }

            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                fs.writeFileSync('./Arena/Config.json', JSON.stringify(Config, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
        }


        if (args[1].toLowerCase() == "pause") {
            const TheMan = 398907393427243008
            if (message.author.id != TheMan) {
                return message.reply("You do not have permission!");
            }

            //var PData;
            var Config;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (args[2].toLowerCase() == "start") {
                Config.pauseArena = true
                message.reply("You have paused the arena!")
            }

            if (args[2].toLowerCase() == "end") {
                Config.pauseArena = false
                message.reply("You have ended the pause on arena!")
            }

            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                fs.writeFileSync('./Arena/Config.json', JSON.stringify(Config, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
        }


        if (args[1].toLowerCase() == "buy") {

            //var matchData;
            var PData;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (PData.players[message.author.id].naut) {
                if (PData.players[message.author.id].naut.hp > 0) {
                    message.reply("You already own a boxnaut.")
                    return;
                }
            }

            var stocks = [
                "Air-0", "Air-1", "Air-2", "Air-3", "Air-4", "Air-5", "Air-6", "Air-7", "Air-8", "Air-9", "Air-10", "Air-11", "Air-12",
                "Electric-0", "Electric-1", "Electric-2", "Electric-3", "Electric-4", "Electric-5", "Electric-6", "Electric-7", "Electric-8", "Electric-9", "Electric-10", "Electric-11", "Electric-12",
                "Fire-0", "Fire-1", "Fire-2", "Fire-3", "Fire-4", "Fire-5", "Fire-6", "Fire-7", "Fire-8", "Fire-9", "Fire-10", "Fire-11", "Fire-12",
                "Nature-0", "Nature-1", "Nature-2", "Nature-3", "Nature-4", "Nature-5", "Nature-6", "Nature-7", "Nature-8", "Nature-9", "Nature-10", "Nature-11", "Nature-12",
                "Poison-0", "Poison-1", "Poison-2", "Poison-3", "Poison-4", "Poison-5", "Poison-6", "Poison-7", "Poison-8", "Poison-9", "Poison-10", "Poison-11", "Poison-12",
                "Psychic-0", "Psychic-1", "Psychic-2", "Psychic-3", "Psychic-4", "Psychic-5", "Psychic-6", "Psychic-7", "Psychic-8", "Psychic-9", "Psychic-10", "Psychic-11", "Psychic-12",
                "Rock-0", "Rock-1", "Rock-2", "Rock-3", "Rock-4", "Rock-5", "Rock-6", "Rock-7", "Rock-8", "Rock-9", "Rock-10", "Rock-11", "Rock-12",
                "Void-0", "Void-1", "Void-2", "Void-3", "Void-4", "Void-5", "Void-6", "Void-7", "Void-8", "Void-9", "Void-10", "Void-11", "Void-12",
                "Water-0", "Water-1", "Water-2", "Water-3", "Water-4", "Water-5", "Water-6", "Water-7", "Water-8", "Water-9", "Water-10", "Water-11", "Water-12",
                "Zombie-0", "Zombie-1", "Zombie-2", "Zombie-3", "Zombie-4", "Zombie-5", "Zombie-6", "Zombie-7", "Zombie-8", "Zombie-9", "Zombie-10", "Zombie-11", "Zombie-12"
            ]

            var Nautkeys = Object.keys(PData.players)
            var i = 0;
            for (i = 0; i < Nautkeys.length; i++) {
                if (PData.players[Nautkeys[i]].naut) {
                    const index = stocks.indexOf(`${PData.players[Nautkeys[i]].naut.type}-${PData.players[Nautkeys[i]].naut.imageN}`);
                    if (index > -1) {
                        stocks.splice(index, 1); // 2nd parameter means remove one item only
                    }
                }
            }

            var AvailCount = 0;

            for (i = 0; i < stocks.length; i++) {
                var split = stocks[i].split("-")
                if (split[1] != 0) {
                    AvailCount += 1;
                }
            }

            if (AvailCount < 1) {
                message.reply("Stock is currently out! Try again later.")
                const Verified = "938965905902288957"
                const Recruit = "909724008243662899"
                const AVerify = "953768584516104222"

                if (!message.member.roles.cache.some(role => role.id === Verified)) {
                    setTimeout(function () {
                        message.member.roles.add([Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                }
                return;
            }

            var cost = 124

            if (PData.players[message.author.id].tokens >= cost) {
                PData.players[message.author.id].tokens -= cost
            } else {
                message.reply(`You do not have enough tokens to buy a naut. Costs ${cost} Arena Tokens.`)
                return;
            }

            let RandomNaut = Math.floor(Math.random() * (stocks.length - 0) + 0)
            var RandNaut = stocks[RandomNaut].split("-")

            while (RandNaut[1] == 0) {
                RandomNaut = Math.floor(Math.random() * (stocks.length - 0) + 0)
                RandNaut = stocks[RandomNaut].split("-")
            }


            let randElement = Math.floor(Math.random() * (elements.length - 0)) + 0
            var min = 1
            var max = 1000
            let rand = Math.floor(Math.random() * (max - min + 1)) + min;
            let randINC = Math.floor(Math.random() * (1000 - 1 + 1)) + 1
            var element = elements[randElement]

            var rarity;
            var hp;
            if (rand <= 400) {//Common CAN LOSE 8 GAMES
                rarity = "Common"
                hp = 12
            } else if (rand <= 700) {//Uncommon CAN LOSE 16 GAMES
                rarity = "Uncommon"
                hp = 24
            } else if (rand <= 870) {//Rare CAN LOSE 41 GAMES
                rarity = "Rare"
                hp = 56
            } else if (rand <= 950) {//Epic CAN LOSE 83 GAMES
                rarity = "Epic"
                hp = 134
            } else if (rand <= 1000) {//Legendary CAN LOSE 166 GAMES
                rarity = "Legendary"
                hp = 256
            }
            if (randINC == 666) {
                if (stocks[`${RandNaut[0]}${RandNaut[1]}`]) {
                    rarity = "GODLIKE"
                    hp = 472

                    PData.players[message.author.id].naut = { rarity: rarity.toString(), hp: hp, element: element, imageN: 0, type: RandNaut[0] }

                    try {
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    SendImage();
                    return;
                } else {
                    rarity = "Legendary"
                    hp = 500
                }
            }

            PData.players[message.author.id].naut = { rarity: rarity.toString(), hp: hp, element: element, imageN: RandNaut[1], type: RandNaut[0] }

            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }

            SendImage();

            async function SendImage() {
                const NatureRole = "935891001548091483"
                const PoisonRole = "935891204988633208"
                const ZombieRole = "935891452909723678"
                const ElectricRole = "935891555900878889"
                const FireRole = "935891610850443284"
                const WaterRole = "935891684674388028"
                const AirRole = "935891838710214656"
                const VoidRole = "935891916569059328"
                const RockRole = "935891988346204200"
                const PsychicRole = "935892105203695708"

                const Verified = "938965905902288957"
                const Recruit = "909724008243662899"
                const AVerify = "953768584516104222"

                message.member.roles.remove([NatureRole, PoisonRole, ZombieRole, ElectricRole, FireRole, WaterRole, AirRole, VoidRole, RockRole, PsychicRole]);

                if (RandNaut[0] == "Nature") {//Nature
                    setTimeout(function () {
                        message.member.roles.add([NatureRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                } else if (RandNaut[0] == "Poison") {//Poison
                    setTimeout(function () {
                        message.member.roles.add([PoisonRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                } else if (RandNaut[0] == "Zombie") {//Zombie
                    setTimeout(function () {
                        message.member.roles.add([ZombieRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                } else if (RandNaut[0] == "Electric") {//Electric
                    setTimeout(function () {
                        message.member.roles.add([ElectricRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                } else if (RandNaut[0] == "Fire") {//Fire
                    setTimeout(function () {
                        message.member.roles.add([FireRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                } else if (RandNaut[0] == "Water") {//Water
                    setTimeout(function () {
                        message.member.roles.add([WaterRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                } else if (RandNaut[0] == "Air") {//Air
                    setTimeout(function () {
                        message.member.roles.add([AirRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                } else if (RandNaut[0] == "Void") {//Void
                    setTimeout(function () {
                        message.member.roles.add([VoidRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                } else if (RandNaut[0] == "Rock") {//Rock
                    setTimeout(function () {
                        message.member.roles.add([RockRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                } else if (RandNaut[0] == "Psychic") {//Psychic
                    setTimeout(function () {
                        message.member.roles.add([PsychicRole, Verified, Recruit]);
                    }, 1000);
                    setTimeout(function () {
                        message.member.roles.remove(AVerify);
                    }, 2000);
                }

                const canvas = Canvas.createCanvas(75, 75);
                const context = canvas.getContext('2d');
                const background = await Canvas.loadImage(`./Arena/Resources/Backgrounds/${rarity.toString()}.png`);
                var naut;
                if (randINC == 666) {
                    naut = await Canvas.loadImage(`./Arena/Resources/Types/${RandNaut[0]}/${RandNaut[0]} Godnaut.png`);
                } else {
                    naut = await Canvas.loadImage(`./Arena/Resources/Types/${RandNaut[0]}/${RandNaut[0]} ${RandNaut[1]}.png`);
                }

                // This uses the canvas dimensions to stretch the image onto the entire canvas
                context.drawImage(background, 0, 0, canvas.width, canvas.height);

                // Draw a shape onto the main canvas
                context.drawImage(naut, canvas.width / 2 - naut.width / 2, canvas.height / 2 - naut.height / 2, naut.width, naut.height);

                // Use the helpful Attachment class structure to process the file for you
                const attachment = new MessageAttachment(canvas.toBuffer(), 'naut.png');

                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Bought boxnaut`)
                    .setDescription(`You have purchased a botnaut and got:`)
                    .addField('Rarity', rarity, true)
                    .addField('Hp', hp.toString(), true)
                    .addField('Element', element.toString(), true)
                    .setThumbnail('attachment://naut.png')
                    .setTimestamp()
                    .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                if (randINC == 666) {
                    embed.addField('Type', `${RandNaut[0]} Godnaut`, true)
                } else {
                    embed.addField('Type', `${RandNaut[0]}`, true)
                }

                message.reply({ embeds: [embed], files: [attachment] });
            }
        }


        if (args[1].toLowerCase() == "boxnaut") {
            //var matchData;
            var PData;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (!PData.players[message.author.id].naut) {
                message.reply("You dont own a boxnaut.")
                return;
            }

            if (message.mentions.members.first()) {
                let mentioned = message.mentions.members.first()

                if (!PData.players[mentioned.id].naut) {
                    message.reply("They dont own a boxnaut.")
                    return;
                }

                const canvas = Canvas.createCanvas(75, 75);
                const context = canvas.getContext('2d');
                const background = await Canvas.loadImage(`./Arena/Resources/Backgrounds/${PData.players[mentioned.id].naut.rarity}.png`);
                var naut;
                if (PData.players[mentioned.id].naut.imageN == 0) {
                    naut = await Canvas.loadImage(`./Arena/Resources/Types/${PData.players[mentioned.id].naut.type}/${PData.players[mentioned.id].naut.type} Godnaut.png`);
                } else {
                    naut = await Canvas.loadImage(`./Arena/Resources/Types/${PData.players[mentioned.id].naut.type}/${PData.players[mentioned.id].naut.type} ${PData.players[mentioned.id].naut.imageN}.png`);
                }

                // This uses the canvas dimensions to stretch the image onto the entire canvas
                context.drawImage(background, 0, 0, canvas.width, canvas.height);

                // Draw a shape onto the main canvas
                context.drawImage(naut, canvas.width / 2 - naut.width / 2, canvas.height / 2 - naut.height / 2, naut.width, naut.height);

                // Use the helpful Attachment class structure to process the file for you
                const attachment = new MessageAttachment(canvas.toBuffer(), 'naut.png');

                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${mentioned.user.username}'s Boxnaut`)
                    //.addField('Type', PData.players[message.author.id].type, true)
                    .addField('Rarity', PData.players[mentioned.id].naut.rarity, true)
                    .addField('Hp', PData.players[mentioned.id].naut.hp.toString(), true)
                    .addField('Element', PData.players[mentioned.id].naut.element, true)
                    .setThumbnail('attachment://naut.png')
                    .setTimestamp()
                    .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                if (PData.players[mentioned.id].naut.imageN == 0) {
                    embed.addField('Type', `${PData.players[mentioned.id].naut.type} Godnaut`, true)
                } else {
                    embed.addField('Type', `${PData.players[mentioned.id].naut.type}`, true)
                }


                message.reply({ embeds: [embed], files: [attachment] });
                return;
            }

            const canvas = Canvas.createCanvas(75, 75);
            const context = canvas.getContext('2d');
            const background = await Canvas.loadImage(`./Arena/Resources/Backgrounds/${PData.players[message.author.id].naut.rarity}.png`);
            var naut;
            if (PData.players[message.author.id].naut.imageN == 0) {
                naut = await Canvas.loadImage(`./Arena/Resources/Types/${PData.players[message.author.id].naut.type}/${PData.players[message.author.id].naut.type} Godnaut.png`);
            } else {
                naut = await Canvas.loadImage(`./Arena/Resources/Types/${PData.players[message.author.id].naut.type}/${PData.players[message.author.id].naut.type} ${PData.players[message.author.id].naut.imageN}.png`);
            }

            // This uses the canvas dimensions to stretch the image onto the entire canvas
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            // Draw a shape onto the main canvas
            context.drawImage(naut, canvas.width / 2 - naut.width / 2, canvas.height / 2 - naut.height / 2, naut.width, naut.height);

            // Use the helpful Attachment class structure to process the file for you
            const attachment = new MessageAttachment(canvas.toBuffer(), 'naut.png');

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Your Boxnaut`)
                //.addField('Type', PData.players[message.author.id].type, true)
                .addField('Rarity', PData.players[message.author.id].naut.rarity, true)
                .addField('Hp', PData.players[message.author.id].naut.hp.toString(), true)
                .addField('Element', PData.players[message.author.id].naut.element, true)
                .setThumbnail('attachment://naut.png')
                .setTimestamp()
                .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

            if (PData.players[message.author.id].naut.imageN == 0) {
                embed.addField('Type', `${PData.players[message.author.id].naut.type} Godnaut`, true)
            } else {
                embed.addField('Type', `${PData.players[message.author.id].naut.type}`, true)
            }


            message.reply({ embeds: [embed], files: [attachment] });

        }

        if (args[1].toLowerCase() == "stats") {
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
                message.reply("You dont have any stats yet. Try again later.")
                return;
            }

            if (message.mentions.members.first()) {
                let mentioned = message.mentions.members.first()

                if(!PData.players[mentioned.id]){
                    message.reply("Error stats not found.")
                    return;
                }

                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${mentioned.user.username}'s Stats`)
                    .addField('Wins', ""+PData.players[mentioned.id].wins, true)
                    .addField('Loses', ""+PData.players[mentioned.id].loses, true)
                    .addField('W/L Ratio', ""+(PData.players[mentioned.id].wins / PData.players[mentioned.id].loses), true)
                    .addField('Games Played', ""+PData.players[mentioned.id].gamesPlayed, true)
                    .addField('Tokens', ""+PData.players[mentioned.id].tokens, true)
                    .addField('Last Played', `${new Date(PData.players[mentioned.id].naut.date)}`, true)
                    .setTimestamp()
                    .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                message.reply({ embeds: [embed] });
                return;
            }

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Your Stats`)
                .addField('Wins', `${PData.players[message.author.id].wins}`, true)
                .addField('Loses', `${PData.players[message.author.id].loses}`, true)
                .addField('W/L Ratio', `${(PData.players[message.author.id].wins / PData.players[message.author.id].loses)}`, true)
                .addField('Games Played', `${PData.players[message.author.id].gamesPlayed}`, true)
                .addField('Tokens', `${PData.players[message.author.id].tokens}`, true)
                .addField('Last Played', `${new Date(PData.players[message.author.id].naut.date)}`, true)
                .setTimestamp()
                .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

            message.reply({ embeds: [embed] });

        }


        if (args[1].toLowerCase() == "tip") {
            //var matchData;
            var PData;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (args[2]) {
                if (Number.isInteger(parseInt(args[2]))) {
                    if (PData.players[message.author.id].tokens >= parseInt(args[2])) {
                        if (message.mentions.members.first() && parseInt(args[2]) >= 1) {
                            let mentioned = message.mentions.members.first()

                            message.reply(`You have tipped **${parseInt(args[2])}** Arena Tokens to ${mentioned}.`)

                            PData.players[mentioned.id].tokens += parseInt(args[2])
                            PData.players[message.author.id].tokens -= parseInt(args[2])

                            try {
                                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                            } catch (e) {
                                console.log(e);
                                return;
                            }
                        } else {
                            message.reply("Person must be mentioned! *Arena Tip (Number) (Person)")
                        }
                    } else {
                        message.reply("You dont have enough to tip that amount!")
                    }
                } else {
                    message.reply("Number was found. *Arena Tip (Number) (Person)")
                }
            } else {
                message.reply("Invalid usage! *Arena Tip (Number) (Person)")
            }
        }


        if (args[1].toLowerCase() == "tokens" || args[1].toLowerCase() == "token") {
            //var matchData;
            var PData;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (args[2]) {
                if (args[2].toLowerCase() == "give") {
                    const TheMan = 398907393427243008
                    const TheMan2 = 222153421745160192
                    if (message.author.id != TheMan && message.author.id != TheMan2) {
                        return message.reply("You do not have permission!");
                    }

                    if (Number.isInteger(parseInt(args[3]))) {
                        if (message.mentions.members.first() && parseInt(args[3]) >= 0) {
                            let mentioned = message.mentions.members.first()

                            message.reply(`You have given **${parseInt(args[3])}** Arena Tokens to ${mentioned}.`)

                            PData.players[mentioned.id].tokens += parseInt(args[3])

                            try {
                                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                            } catch (e) {
                                console.log(e);
                                return;
                            }
                            return;
                        } else {
                            message.reply("Person must be mentioned! *Arena Tokens Give (Number) (Person)")
                            return;
                        }
                    } else {
                        message.reply("Number was found. *Arena Tokens Give (Number) (Person)")
                        return;
                    }
                }

                if (args[2].toLowerCase() == "take") {
                    const TheMan = 398907393427243008
                    const TheMan2 = 222153421745160192
                    if (message.author.id != TheMan && message.author.id != TheMan2) {
                        return message.reply("You do not have permission!");
                    }

                    if (Number.isInteger(parseInt(args[3]))) {
                        if (message.mentions.members.first() && parseInt(args[3]) >= 0) {
                            let mentioned = message.mentions.members.first()

                            message.reply(`You have taken **${parseInt(args[3])}** Arena Tokens from ${mentioned}.`)

                            if(PData.players[mentioned.id].tokens <= parseInt(args[3])){
                                PData.players[mentioned.id].tokens = 0
                            } else {
                                PData.players[mentioned.id].tokens -= parseInt(args[3])
                            }

                            try {
                                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                            } catch (e) {
                                console.log(e);
                                return;
                            }
                            return;
                        } else {
                            message.reply("Person must be mentioned! *Arena Tokens Take (Number) (Person)")
                            return;
                        }
                    } else {
                        message.reply("Number was found. *Arena Tokens Take (Number) (Person)")
                        return;
                    }
                }

                if (args[2].toLowerCase() == "set") {
                    const TheMan = 398907393427243008
                    const TheMan2 = 222153421745160192
                    if (message.author.id != TheMan && message.author.id != TheMan2) {
                        return message.reply("You do not have permission!");
                    }

                    if (Number.isInteger(parseInt(args[3]))) {
                        if (message.mentions.members.first() && parseInt(args[3]) >= 0) {
                            let mentioned = message.mentions.members.first()

                            message.reply(`You have set ${mentioned} to **${parseInt(args[3])}** Arena Tokens.`)

                            PData.players[mentioned.id].tokens = parseInt(args[3])

                            try {
                                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                            } catch (e) {
                                console.log(e);
                                return;
                            }
                            return;
                        } else {
                            message.reply("Person must be mentioned! *Arena Tokens Set (Number) (Person)")
                            return;
                        }
                    } else {
                        message.reply("Number was found. *Arena Tokens Set (Number) (Person)")
                        return;
                    }
                }
            }

            if (message.guild != null && message.mentions.members.first()) {
                let mentioned = message.mentions.members.first()

                message.reply(`${mentioned.user.username} has **${PData.players[mentioned.id].tokens}** Arena Tokens.`)
                return;
            }

            message.reply(`You have **${PData.players[message.author.id].tokens}** Arena Tokens.`)
        }

        if (args[1].toLowerCase() == "stock") {

            //var matchData;
            var PData;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            var stocks = [
                "Air-0", "Air-1", "Air-2", "Air-3", "Air-4", "Air-5", "Air-6", "Air-7", "Air-8", "Air-9", "Air-10", "Air-11", "Air-12",
                "Electric-0", "Electric-1", "Electric-2", "Electric-3", "Electric-4", "Electric-5", "Electric-6", "Electric-7", "Electric-8", "Electric-9", "Electric-10", "Electric-11", "Electric-12",
                "Fire-0", "Fire-1", "Fire-2", "Fire-3", "Fire-4", "Fire-5", "Fire-6", "Fire-7", "Fire-8", "Fire-9", "Fire-10", "Fire-11", "Fire-12",
                "Nature-0", "Nature-1", "Nature-2", "Nature-3", "Nature-4", "Nature-5", "Nature-6", "Nature-7", "Nature-8", "Nature-9", "Nature-10", "Nature-11", "Nature-12",
                "Poison-0", "Poison-1", "Poison-2", "Poison-3", "Poison-4", "Poison-5", "Poison-6", "Poison-7", "Poison-8", "Poison-9", "Poison-10", "Poison-11", "Poison-12",
                "Psychic-0", "Psychic-1", "Psychic-2", "Psychic-3", "Psychic-4", "Psychic-5", "Psychic-6", "Psychic-7", "Psychic-8", "Psychic-9", "Psychic-10", "Psychic-11", "Psychic-12",
                "Rock-0", "Rock-1", "Rock-2", "Rock-3", "Rock-4", "Rock-5", "Rock-6", "Rock-7", "Rock-8", "Rock-9", "Rock-10", "Rock-11", "Rock-12",
                "Void-0", "Void-1", "Void-2", "Void-3", "Void-4", "Void-5", "Void-6", "Void-7", "Void-8", "Void-9", "Void-10", "Void-11", "Void-12",
                "Water-0", "Water-1", "Water-2", "Water-3", "Water-4", "Water-5", "Water-6", "Water-7", "Water-8", "Water-9", "Water-10", "Water-11", "Water-12",
                "Zombie-0", "Zombie-1", "Zombie-2", "Zombie-3", "Zombie-4", "Zombie-5", "Zombie-6", "Zombie-7", "Zombie-8", "Zombie-9", "Zombie-10", "Zombie-11", "Zombie-12"
            ]

            var stocks2 = []

            var Nautcount = 0

            var keys = Object.keys(PData.players)
            var i = 0;
            for (i = 0; i < keys.length; i++) {
                if (PData.players[keys[i]].naut) {
                    Nautcount += 1
                    stocks2.push(`${PData.players[keys[i]].naut.type}-${PData.players[keys[i]].naut.imageN}`)
                    const index = stocks.indexOf(`${PData.players[keys[i]].naut.type}-${PData.players[keys[i]].naut.imageN}`);
                    if (index > -1) {
                        stocks.splice(index, 1); // 2nd parameter means remove one item only
                    }
                }
            }

            var count = 0

            for (i = 0; i < stocks2.length; i++) {
                for (z = 0; z < stocks2.length; z++) {
                    if (stocks2[i] == stocks2[z] && z != i) {
                        //console.log(`${stocks2[i]} - ${stocks2[z]}`)
                        count += 1
                    }
                }
            }

            var Godcount = 0
            var Normcount = 0

            for (i = 0; i < stocks.length; i++) {
                var split = stocks[i].split("-")
                if (split[1] == 0) {
                    Godcount += 1
                } else {
                    Normcount += 1
                }
            }

            message.reply(`${Normcount} Boxnauts left. ${Godcount} Godnauts left. Currently ${count} duplicates.......`)
        }

        if (args[1].toLowerCase() == "purge") {
            const TheMan = 398907393427243008
            if (message.author.id != TheMan) {
                return message.reply("You do not have permission!");
            }

            //var matchData;
            var PData;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            var keys = Object.keys(PData.players)

            if (args[2] && args[2] == "confirm") {
                // Get the Guild and store it under the variable "list"
                var list = client.guilds.cache.get("887226341429231648").members
                    .fetch()
                    .then((members) => {
                        members.forEach((member) => {
                            const index = keys.indexOf(member.id);
                            if (index > -1) {
                                keys.splice(index, 1); // 2nd parameter means remove one item only
                            }
                        })

                        console.log(keys)

                        keys.forEach(key => {
                            console.log(PData.players[key].name)
                            delete PData.players[key]
                        })

                        try {
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }


                    });

                var i = 0;
                for (i = 0; i < keys.length; i++) {
                    if (PData.players[keys[i]].naut && PData.players[keys[i]].naut.date) {
                        var currentDate = new Date();
                        console.log(new Date(PData.players[keys[i]].naut.date).getTime() - currentDate.getTime())
                        if (new Date(PData.players[keys[i]].naut.date) - currentDate.getTime() <= -1209600000) {
                            console.log(Date(PData.players[keys[i]].naut.date) - currentDate)
                            console.log(PData.players[keys[i]].name)
                            delete PData.players[keys[i].naut]

                            try {
                                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                            } catch (e) {
                                console.log(e);
                                return;
                            }
                        }
                    } else {
                        if (PData.players[keys[i]].naut) {
                            var currentDate = new Date();
                            PData.players[keys[i]].naut.date = currentDate

                            try {
                                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                            } catch (e) {
                                console.log(e);
                                return;
                            }
                        }
                    }
                }

                message.reply("Purge Successful!.")
                return;
            }

            // Get the Guild and store it under the variable "list"
            var list = client.guilds.cache.get("887226341429231648").members
                .fetch()
                .then((members) => {
                    members.forEach((member) => {
                        const index = keys.indexOf(member.id);
                        if (index > -1) {
                            keys.splice(index, 1); // 2nd parameter means remove one item only
                        }
                    })

                    console.log(keys)

                    keys.forEach(key => {
                        console.log(PData.players[key].name)
                        delete PData.players[key]
                    })

                    try {
                        fs.writeFileSync('./Arena/PDataCHECK.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                });

            var i = 0;
            for (i = 0; i < keys.length; i++) {
                if (PData.players[keys[i]].naut && PData.players[keys[i]].naut.date) {
                    var currentDate = new Date();
                    console.log(new Date(PData.players[keys[i]].naut.date).getTime() - currentDate.getTime())
                    if (new Date(PData.players[keys[i]].naut.date) - currentDate.getTime() <= -1209600000) {
                        console.log(Date(PData.players[keys[i]].naut.date) - currentDate)
                        console.log(PData.players[keys[i]].name)
                        delete PData.players[keys[i]]

                        try {
                            fs.writeFileSync('./Arena/PDataCHECK.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }
                    }
                } else {
                    if (PData.players[keys[i]].naut) {
                        var currentDate = new Date();
                        PData.players[keys[i]].naut.date = currentDate

                        try {
                            fs.writeFileSync('./Arena/PDataCHECK.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }
                    }
                }
            }

            message.reply("Purge file created. Please check the file.")
        }

        if (args[1].toLowerCase() == "owned") {

            message.reply("Under Construction!")
            return;

            //var matchData;
            var PData;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            var stocks2 = []

            var keys = Object.keys(PData.players)
            var i = 0;
            for (i = 0; i < keys.length; i++) {
                if (PData.players[keys[i]].naut) {
                    stocks2.push(`${PData.players[keys[i]].name.slice(0, 12)}: ${PData.players[keys[i]].naut.type}-${PData.players[keys[i]].naut.imageN}`)
                }
            }

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Owned Nauts`)
                .addField('1-10', stocks2.slice(0, 10).join("\n"), true)
                .addField('11-20', stocks2.slice(11, 20).join("\n"), true)
                .addField('21-30', stocks2.slice(21, 30).join("\n"), true)
                .addField('31-40', stocks2.slice(31, 40).join("\n"), true)
                .addField('41-50', stocks2.slice(41, 50).join("\n"), true)
                .addField('51-60', stocks2.slice(51, 60).join("\n"), true)
                .addField('61-70', stocks2.slice(61, 70).join("\n"), true)
                .addField('71-80', stocks2.slice(71, 80).join("\n"), true)
                .addField('81-90', stocks2.slice(81, 90).join("\n"), true)
                .addField('91-100', stocks2.slice(91, 100).join("\n"), true)
                .addField('101-110', stocks2.slice(101, 110).join("\n"), true)
                .addField('111-120', stocks2.slice(111, 120).join("\n"), true)
                .addField('121-130', stocks2.slice(121, 130).join("\n"), true)
                .setTimestamp()
                .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

            message.reply({ embeds: [embed] });
            return;
        }

        if (args[1].toLowerCase() == "dismantle") {
            //var matchData;
            var PData;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (!PData.players[message.author.id].naut) {
                message.reply("You dont own a boxnaut.")
                return;
            }

            var cost = 124

            if (PData.players[message.author.id].tokens >= cost) {
                PData.players[message.author.id].tokens -= cost
            } else {
                message.reply(`You do not have enough tokens to dismantle your naut. Costs ${cost} Arena Tokens.`)
                return;
            }

            delete PData.players[message.author.id].naut;

            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }

            message.reply("You have successfully dismantled your naut.")
        }

        if (args[1].toLowerCase() == "repair") {
            //var matchData;
            var PData;
            try {
                //matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            if (!PData.players[message.author.id].naut) {
                message.reply("You dont own a boxnaut.")
                return;
            }

            var cost = 248

            if (PData.players[message.author.id].tokens >= cost) {
                PData.players[message.author.id].tokens -= cost
            } else {
                message.reply(`You do not have enough tokens to repair your naut. Costs ${cost} Arena Tokens.`)
                return;
            }

            if (PData.players[message.author.id].naut.rarity == "Common") {//Common CAN LOSE 8 GAMES
                PData.players[message.author.id].naut.hp = 12
            } else if (PData.players[message.author.id].naut.rarity == "Uncommon") {//Uncommon CAN LOSE 16 GAMES
                PData.players[message.author.id].naut.hp = 24
            } else if (PData.players[message.author.id].naut.rarity == "Rare") {//Rare CAN LOSE 41 GAMES
                PData.players[message.author.id].naut.hp = 56
            } else if (PData.players[message.author.id].naut.rarity == "Epic") {//Epic CAN LOSE 83 GAMES
                PData.players[message.author.id].naut.hp = 134
            } else if (PData.players[message.author.id].naut.rarity == "Legendary") {//Legendary CAN LOSE 166 GAMES
                PData.players[message.author.id].naut.hp = 256
            } else if (PData.players[message.author.id].naut.rarity == "GODLIKE") {//Godlike CAN LOSE 833 GAMES
                PData.players[message.author.id].naut.hp = 472
            }

            try {
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }

            message.reply("You have successfully repaired your naut.")
        }



        return;

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Melee')
                    .setLabel('Melee')
                    .setStyle('DANGER'),
                new MessageButton()
                    .setCustomId('Defense')
                    .setLabel('Defense')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('Ranged')
                    .setLabel('Ranged')
                    .setStyle('PRIMARY'),
            );

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('What do you want to do this round?')
            .setDescription('Idk something cool');

        message.reply({ content: 'ROUND 1!', ephemeral: true, embeds: [embed], components: [row] });

        log.run('[ARENA] - ' + message.author.username, 1)
        return;
    }
}