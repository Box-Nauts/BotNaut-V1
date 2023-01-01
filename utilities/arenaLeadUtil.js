const { Client, MessageEmbed, Collection, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'arenaLeadUtil',
    description: "Runs the arena leaderboard logic",

    async run(client) {

        //console.log("Ran")

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const log = await requireUncached(`./logging`);

        const fs = require('fs');
        const arenaLeadChannel = '952430376985432064'
        const arenaEventLeadChannel = '952430469130104902'
        const arenaFacLeadChannel = '961401822860419082'

        var matchData;
        var PData;
        var facData;
        try {
            matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            facData = JSON.parse(fs.readFileSync("./Arena/Factions.json", "utf8"))
        } catch (e) {
            console.log(e);
            return;
        }

        var keys = Object.keys(PData.players)
        var i = 0;
        for (i = 0; i < keys.length; i++) {
            if (PData.players[keys[i]].naut && PData.players[keys[i]].naut.date) {
                var currentDate = new Date();
                if (new Date(PData.players[keys[i]].naut.date) - currentDate.getTime() <= -604800000) {
                    console.log(Date(PData.players[keys[i]].naut.date) - currentDate)
                    console.log(PData.players[keys[i]].name)
                    delete PData.players[keys[i]].naut

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


        //log.run('Tried Leaderboards', 1)

        //Factions
        const top10GamesPlayedF = Object.keys(facData.factions).sort(function (a, b) { return facData.factions[b].stats.gamesPlayed - facData.factions[a].stats.gamesPlayed }).slice(0, 10);
        const mappedTop10GamesPlayedF = top10GamesPlayedF.map(c => `${facData.factions[c].stats.gamesPlayed} - ${facData.factions[c].name}`);

        const top10WinsF = Object.keys(facData.factions).sort(function (a, b) { return facData.factions[b].stats.wins - facData.factions[a].stats.wins }).slice(0, 10);
        const mappedTop10WinsF = top10WinsF.map(c => `${facData.factions[c].stats.wins} - ${facData.factions[c].name}`);

        const top10TokensF = Object.keys(facData.factions).sort(function (a, b) { return facData.factions[b].stats.tokens - facData.factions[a].stats.tokens }).slice(0, 10);
        const mappedTop10TokensF = top10TokensF.map(c => `${facData.factions[c].stats.tokens} - ${facData.factions[c].name}`);

        const top10LosesF = Object.keys(facData.factions).sort(function (a, b) { return facData.factions[b].stats.loses - facData.factions[a].stats.loses }).slice(0, 10);
        const mappedTop10LosesF = top10LosesF.map(c => `${facData.factions[c].stats.loses} - ${facData.factions[c].name}`);

        const top10RatioF = Object.keys(facData.factions).sort(function (a, b) {
            if (isNaN((facData.factions[b].stats.wins / facData.factions[b].stats.loses).toFixed(3))) {
                if (isNaN((facData.factions[a].stats.wins / facData.factions[a].stats.loses).toFixed(3))) {
                    return 0 - 0
                } else {
                    return 0 - (facData.factions[a].stats.wins / facData.factions[a].stats.loses).toFixed(3)
                }
            } else if (isNaN((facData.factions[a].stats.wins / facData.factions[a].stats.loses).toFixed(3))) {
                if (isNaN((facData.factions[b].stats.wins / facData.factions[b].stats.loses).toFixed(3))) {
                    return 0 - 0
                } else {
                    return (facData.factions[b].stats.wins / facData.factions[b].stats.loses).toFixed(3) - 0
                }
            }
            return (facData.factions[b].stats.wins / facData.factions[b].stats.loses).toFixed(3) - (facData.factions[a].stats.wins / facData.factions[a].stats.loses).toFixed(3)
        }).slice(0, 10);
        const mappedtop10RatioF = top10RatioF.map(c => `${(facData.factions[c].stats.wins / facData.factions[c].stats.loses).toFixed(3)} - ${facData.factions[c].name}`);


        //Normal
        const top10GamesPlayed = Object.keys(PData.players).sort(function (a, b) { return PData.players[b].gamesPlayed - PData.players[a].gamesPlayed }).slice(0, 10);
        const mappedTop10GamesPlayed = top10GamesPlayed.map(c => `${PData.players[c].gamesPlayed} - ${PData.players[c].name}`);

        const top10Wins = Object.keys(PData.players).sort(function (a, b) { return PData.players[b].wins - PData.players[a].wins }).slice(0, 10);
        const mappedTop10Wins = top10Wins.map(c => `${PData.players[c].wins} - ${PData.players[c].name}`);

        const top10Tokens = Object.keys(PData.players).sort(function (a, b) { return PData.players[b].tokens - PData.players[a].tokens }).slice(0, 10);
        const mappedTop10Tokens = top10Tokens.map(c => `${PData.players[c].tokens} - ${PData.players[c].name}`);

        const top10Loses = Object.keys(PData.players).sort(function (a, b) { return PData.players[b].loses - PData.players[a].loses }).slice(0, 10);
        const mappedTop10Loses = top10Loses.map(c => `${PData.players[c].loses} - ${PData.players[c].name}`);

        const top10Ratio = Object.keys(PData.players).sort(function (a, b) {
            if (isNaN((PData.players[b].wins / PData.players[b].loses).toFixed(3))) {
                if (isNaN((PData.players[a].wins / PData.players[a].loses).toFixed(3))) {
                    return 0 - 0
                } else {
                    return 0 - (PData.players[a].wins / PData.players[a].loses).toFixed(3)
                }
            } else if (isNaN((PData.players[a].wins / PData.players[a].loses).toFixed(3))) {
                if (isNaN((PData.players[b].wins / PData.players[b].loses).toFixed(3))) {
                    return 0 - 0
                } else {
                    return (PData.players[b].wins / PData.players[b].loses).toFixed(3) - 0
                }
            }
            return (PData.players[b].wins / PData.players[b].loses).toFixed(3) - (PData.players[a].wins / PData.players[a].loses).toFixed(3)
        }).slice(0, 10);
        const mappedtop10Ratio = top10Ratio.map(c => `${(PData.players[c].wins / PData.players[c].loses).toFixed(3)} - ${PData.players[c].name}`);


        //Events
        const top10GamesPlayedE = Object.keys(PData.players).sort(function (a, b) { return PData.players[b].event.gamesPlayed - PData.players[a].event.gamesPlayed }).slice(0, 10);
        const mappedTop10GamesPlayedE = top10GamesPlayedE.map(c => `${PData.players[c].event.gamesPlayed} - ${PData.players[c].name}`);

        const top10WinsE = Object.keys(PData.players).sort(function (a, b) { return PData.players[b].event.wins - PData.players[a].event.wins }).slice(0, 10);
        const mappedTop10WinsE = top10WinsE.map(c => `${PData.players[c].event.wins} - ${PData.players[c].name}`);

        const top10LosesE = Object.keys(PData.players).sort(function (a, b) { return PData.players[b].event.loses - PData.players[a].event.loses }).slice(0, 10);
        const mappedTop10LosesE = top10LosesE.map(c => `${PData.players[c].event.loses} - ${PData.players[c].name}`);

        const top10RatioE = Object.keys(PData.players).sort(function (a, b) {
            if (isNaN((PData.players[b].event.wins / PData.players[b].event.loses).toFixed(3))) {
                if (isNaN((PData.players[a].event.wins / PData.players[a].event.loses).toFixed(3))) {
                    return 0 - 0
                } else {
                    return 0 - (PData.players[a].event.wins / PData.players[a].event.loses).toFixed(3)
                }
            } else if (isNaN((PData.players[a].event.wins / PData.players[a].event.loses).toFixed(3))) {
                if (isNaN((PData.players[b].event.wins / PData.players[b].event.loses).toFixed(3))) {
                    return 0 - 0
                } else {
                    return (PData.players[b].event.wins / PData.players[b].event.loses).toFixed(3) - 0
                }
            }
            return (PData.players[b].event.wins / PData.players[b].event.loses).toFixed(3) - (PData.players[a].event.wins / PData.players[a].event.loses).toFixed(3)
        }).slice(0, 10);
        const mappedtop10RatioE = top10RatioE.map(c => `${(PData.players[c].event.wins / PData.players[c].event.loses).toFixed(3)} - ${PData.players[c].name}`);


        //Score
        client.channels.cache.get(arenaLeadChannel).bulkDelete(5)

        setTimeout(function () { }, 500); //Round Start

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Leaderboards`)
            .setDescription(`Top 10 of each catagory.`)
            .addField("Games Played", mappedTop10GamesPlayed.join("\n"), false)
            .addField("Wins", mappedTop10Wins.join("\n"), false)
            .addField("Loses", mappedTop10Loses.join("\n"), false)
            .addField("W/L Ratio", mappedtop10Ratio.join("\n"), false)
            .addField("Tokens", mappedTop10Tokens.join("\n"), false)
            .setTimestamp()
            .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/315537267693191169/943036107380121670/Botnaut_copy.png' });

        client.channels.cache.get(arenaLeadChannel).send({ embeds: [embed] });

        setTimeout(function () { }, 500); //Round Start


        //Event
        client.channels.cache.get(arenaEventLeadChannel).bulkDelete(5)

        setTimeout(function () { }, 500); //Round Start

        const embedE = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Event Leaderboards`)
            .setDescription(`Top 10 of each catagory.`)
            .addField("Games Played", mappedTop10GamesPlayedE.join("\n"), false)
            .addField("Wins", mappedTop10WinsE.join("\n"), false)
            .addField("Loses", mappedTop10LosesE.join("\n"), false)
            .addField("W/L Ratio", mappedtop10RatioE.join("\n"), false)
            .setTimestamp()
            .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/315537267693191169/943036107380121670/Botnaut_copy.png' });

        client.channels.cache.get(arenaEventLeadChannel).send({ embeds: [embedE] });


        //Faction
        client.channels.cache.get(arenaFacLeadChannel).bulkDelete(5)

        setTimeout(function () { }, 500); //Round Start

        const embedF = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Faction Leaderboards`)
            .setDescription(`Top 10 of each catagory.`)
            .addField("Games Played", mappedTop10GamesPlayedF.join("\n"), false)
            .addField("Wins", mappedTop10WinsF.join("\n"), false)
            .addField("Loses", mappedTop10LosesF.join("\n"), false)
            .addField("W/L Ratio", mappedtop10RatioF.join("\n"), false)
            .addField("Tokens", mappedTop10TokensF.join("\n"), false)
            .setTimestamp()
            .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/315537267693191169/943036107380121670/Botnaut_copy.png' });

        client.channels.cache.get(arenaFacLeadChannel).send({ embeds: [embedF] });

        return; //-------------------------------------
    }
}