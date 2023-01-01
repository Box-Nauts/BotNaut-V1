const { Client, MessageEmbed, Collection, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');

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

module.exports = {
    name: 'arenaUtilGame',
    description: "Runs the Game arena logic",

    async run(client, MatchNumber, user1, user2) {

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const log = await requireUncached(`./logging`);

        const fs = require('fs');
        const arenaChannel = '938661421485527090'

        var matchData;
        var Config;
        //var PData;
        try {
            matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
            Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
            //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        } catch (e) {
            console.log(e);
            return;
        }

        if (Config.pauseArena) {
            return;
        }

        var round = 1;

        var keys = Object.keys(matchData.currentMatch["match" + MatchNumber].players)

        //const user1 = await client.users.fetch(userID1);
        //const user2 = await client.users.fetch(userID2);

        setTimeout(roundStart, 1000); //Set Timer to end

        function roundStart() {
            var matchData;
            //var PData;
            try {
                matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            //console.log(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} + ${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins}`)

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('Melee-' + MatchNumber)
                        .setLabel('Melee')
                        .setStyle('DANGER'),
                    new MessageButton()
                        .setCustomId('Defense-' + MatchNumber)
                        .setLabel('Defense')
                        .setStyle('SUCCESS'),
                    new MessageButton()
                        .setCustomId('Ranged-' + MatchNumber)
                        .setLabel('Ranged')
                        .setStyle('PRIMARY'),
                );

            const embed = new MessageEmbed()
                .setColor('#4FD100')
                .setTitle(`ROUND ${matchData.currentMatch["match" + MatchNumber].round}/5`)
                .setDescription('What would you like to do this round?')
                .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                .addField('Melee', 'Get close for an attack.', false)
                .addField('Ranged', 'Attack from afar.', false)
                .addField('Defense', 'Defend yourself from an attack.', false)
                .setTimestamp();

            try {
                user1.send({ embeds: [embed], components: [row] });
                user2.send({ embeds: [embed], components: [row] });
            } catch (error) {
                console.log(error)
            }

            var TimerEnded = false;

            //setTimeout(function () { TimerEnded = true; }, 15000); //Set Timer to end
            setTimeout(roundEnd, 15000); //Set Timer to end

            // while (matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack != "true" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack != "true" && TimerEnded == false) {
            //     setTimeout(function() { 
            //         matchData;
            //         //var PData;
            //         try {
            //             matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
            //             //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            //         } catch (e) {
            //             console.log(e);
            //             return;
            //         }
            //     }, 3000); //Set Timer to end
            // }

            //roundEnd()

            //setTimeout(roundEnd, 15000);
        }



        function roundEnd() {
            var matchData;
            //var PData;
            try {
                matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            //delete matchData.currentMatch.players[keys[0]];
            //delete matchData.currentMatch.players[keys[1]];
            //matchData.currentMatch.finished = true

            // try {
            //     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
            // } catch (e) {
            //     console.log(e);
            //     return;
            // }

            user1.send({ content: `The round has ended.` /*embed: exampleEmbed*/ })
            user2.send({ content: `The round has ended.` /*embed: exampleEmbed*/ })

            setTimeout(roundCheck, 2000);
        }



        function roundCheck() {

            var matchData;
            var PData;
            try {
                matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            } catch (e) {
                console.log(e);
                return;
            }

            var keys = Object.keys(matchData.currentMatch["match" + MatchNumber].players)

            var failed = false
            var won = false

            if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack == "true" && matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack == "true") {
                if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack) {
                    const embed = new MessageEmbed()
                        .setColor('#E8D300')
                        .setTitle(`ROUND ${matchData.currentMatch["match" + MatchNumber].round}/5 - RESULTS - TIED`)
                        .setDescription('You both selected the same move and tied!')
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Defense" && matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Melee") {
                    //Player 1 wins
                    matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins += 1
                    PData.players[keys[1]].naut.hp -= 1

                    const embed = new MessageEmbed()
                        .setColor('#E8D300')
                        .setTitle(`ROUND ${matchData.currentMatch["match" + MatchNumber].round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    try {
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Ranged" && matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Defense") {
                    //Player 1 wins
                    matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins += 1
                    PData.players[keys[1]].naut.hp -= 1

                    const embed = new MessageEmbed()
                        .setColor('#E8D300')
                        .setTitle(`ROUND ${matchData.currentMatch["match" + MatchNumber].round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    try {
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Melee" && matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Ranged") {
                    //Player 1 wins
                    matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins += 1
                    PData.players[keys[1]].naut.hp -= 1

                    const embed = new MessageEmbed()
                        .setColor('#E8D300')
                        .setTitle(`ROUND ${matchData.currentMatch["match" + MatchNumber].round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    try {
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Defense" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Melee") {
                    //Player 2 wins
                    matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins += 1
                    PData.players[keys[0]].naut.hp -= 1

                    const embed = new MessageEmbed()
                        .setColor('#E8D300')
                        .setTitle(`ROUND ${matchData.currentMatch["match" + MatchNumber].round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    try {
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Ranged" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Defense") {
                    //Player 2 wins
                    matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins += 1
                    PData.players[keys[0]].naut.hp -= 1

                    const embed = new MessageEmbed()
                        .setColor('#E8D300')
                        .setTitle(`ROUND ${matchData.currentMatch["match" + MatchNumber].round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Melee" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Ranged") {
                    //Player 2 wins
                    matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins += 1
                    PData.players[keys[0]].naut.hp -= 1

                    const embed = new MessageEmbed()
                        .setColor('#E8D300')
                        .setTitle(`ROUND ${matchData.currentMatch["match" + MatchNumber].round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    try {
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                }

                if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins >= 3) {
                    won = true
                    const embed = new MessageEmbed()
                        .setColor('#00CCE8')
                        .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} WON THE GAME!`)
                        .setDescription(`Congrats!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    var matchData;
                    var PData;
                    var Config;
                    try {
                        matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                        PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                        Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    PData.players[keys[1]].wins += 1
                    PData.players[keys[1]].tokens += 12
                    PData.players[keys[0]].loses += 1
                    PData.players[keys[0]].gamesPlayed += 1
                    PData.players[keys[1]].gamesPlayed += 1

                    if (Config.eventStart) {
                        PData.players[keys[1]].event.wins += 1
                        PData.players[keys[0]].event.loses += 1
                        PData.players[keys[0]].event.gamesPlayed += 1
                        PData.players[keys[1]].event.gamesPlayed += 1
                    }

                    delete matchData.currentMatch["match" + MatchNumber];
                    delete matchData.currentMatch["match" + MatchNumber];
                    //matchData.currentMatch.finished = true

                    try {
                        fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins >= 3) {
                    won = true

                    const embed = new MessageEmbed()
                        .setColor('#00CCE8')
                        .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} WON THE GAME!`)
                        .setDescription(`Congrats!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    var matchData;
                    var PData;
                    var Config;
                    try {
                        matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                        PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                        Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    PData.players[keys[0]].wins += 1
                    PData.players[keys[0]].tokens += 12
                    PData.players[keys[1]].loses += 1
                    PData.players[keys[0]].gamesPlayed += 1
                    PData.players[keys[1]].gamesPlayed += 1


                    if (Config.eventStart) {
                        PData.players[keys[0]].event.wins += 1
                        PData.players[keys[1]].event.loses += 1
                        PData.players[keys[0]].event.gamesPlayed += 1
                        PData.players[keys[1]].event.gamesPlayed += 1
                    }

                    delete matchData.currentMatch["match" + MatchNumber];
                    delete matchData.currentMatch["match" + MatchNumber];
                    //matchData.currentMatch.finished = true

                    try {
                        fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                }

                if (won != true) {
                    matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack = "false"
                    matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack = "false"

                    try {
                        fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                }
            } else {
                failed = true
                //A PLAYER FAILED TO SELECT

                const embed = new MessageEmbed()
                    .setColor('#E80000')
                    .setTitle(`Match Canceled`)
                    .setDescription('A player failed to choose an attack!')
                    .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack} - Selected`, true)
                    .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack} - Selected`, true)
                    .setTimestamp();

                user1.send({ embeds: [embed] });
                user2.send({ embeds: [embed] });
                client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                var matchData;
                var PData;
                var Config;
                try {
                    matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                    PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                    Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
                } catch (e) {
                    console.log(e);
                    return;
                }

                if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins > matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins && matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack == "true" && matchData.currentMatch["match" + MatchNumber].round != 1) {
                    won = true
                    const embed = new MessageEmbed()
                        .setColor('#00CCE8')
                        .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} WON THE GAME!`)
                        .setDescription(`Congrats!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    PData.players[keys[1]].wins += 1
                    PData.players[keys[1]].tokens += 12
                    PData.players[keys[0]].loses += 1
                    PData.players[keys[0]].gamesPlayed += 1
                    PData.players[keys[1]].gamesPlayed += 1

                    if (Config.eventStart) {
                        PData.players[keys[1]].event.wins += 1
                        PData.players[keys[0]].event.loses += 1
                        PData.players[keys[0]].event.gamesPlayed += 1
                        PData.players[keys[1]].event.gamesPlayed += 1
                    }

                    delete matchData.currentMatch["match" + MatchNumber];
                    delete matchData.currentMatch["match" + MatchNumber];
                    //matchData.currentMatch.finished = true

                    try {
                        fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins < matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins && matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack == "true" && matchData.currentMatch["match" + MatchNumber].round != 1) {
                    won = true

                    const embed = new MessageEmbed()
                        .setColor('#00CCE8')
                        .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} WON THE GAME!`)
                        .setDescription(`Congrats!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    var matchData;
                    var PData;
                    var Config;
                    try {
                        matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                        PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                        Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
                    } catch (e) {
                        console.log(e);
                        return;
                    }

                    PData.players[keys[0]].wins += 1
                    PData.players[keys[0]].tokens += 12
                    PData.players[keys[1]].loses += 1
                    PData.players[keys[0]].gamesPlayed += 1
                    PData.players[keys[1]].gamesPlayed += 1


                    if (Config.eventStart) {
                        PData.players[keys[0]].event.wins += 1
                        PData.players[keys[1]].event.loses += 1
                        PData.players[keys[0]].event.gamesPlayed += 1
                        PData.players[keys[1]].event.gamesPlayed += 1
                    }

                    delete matchData.currentMatch["match" + MatchNumber];
                    delete matchData.currentMatch["match" + MatchNumber];
                    //matchData.currentMatch.finished = true

                    try {
                        fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins == matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins && matchData.currentMatch["match" + MatchNumber].round != 1) {
                    won = true

                    if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack == "true") {
                        const embed = new MessageEmbed()
                            .setColor('#00CCE8')
                            .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} WON THE GAME!`)
                            .setDescription(`Congrats!`)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                            .setTimestamp();

                        user1.send({ embeds: [embed] });
                        user2.send({ embeds: [embed] });
                        client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                        var matchData;
                        var PData;
                        var Config;
                        try {
                            matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                            Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
                        } catch (e) {
                            console.log(e);
                            return;
                        }

                        PData.players[keys[0]].wins += 1
                        PData.players[keys[0]].tokens += 12
                        PData.players[keys[1]].loses += 1
                        PData.players[keys[0]].gamesPlayed += 1
                        PData.players[keys[1]].gamesPlayed += 1


                        if (Config.eventStart) {
                            PData.players[keys[0]].event.wins += 1
                            PData.players[keys[1]].event.loses += 1
                            PData.players[keys[0]].event.gamesPlayed += 1
                            PData.players[keys[1]].event.gamesPlayed += 1
                        }

                        delete matchData.currentMatch["match" + MatchNumber];
                        delete matchData.currentMatch["match" + MatchNumber];
                        //matchData.currentMatch.finished = true

                        try {
                            fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }
                    } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack == "true") {
                        const embed = new MessageEmbed()
                            .setColor('#00CCE8')
                            .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} WON THE GAME!`)
                            .setDescription(`Congrats!`)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                            .setTimestamp();

                        user1.send({ embeds: [embed] });
                        user2.send({ embeds: [embed] });
                        client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                        PData.players[keys[1]].wins += 1
                        PData.players[keys[1]].tokens += 12
                        PData.players[keys[0]].loses += 1
                        PData.players[keys[0]].gamesPlayed += 1
                        PData.players[keys[1]].gamesPlayed += 1

                        if (Config.eventStart) {
                            PData.players[keys[1]].event.wins += 1
                            PData.players[keys[0]].event.loses += 1
                            PData.players[keys[0]].event.gamesPlayed += 1
                            PData.players[keys[1]].event.gamesPlayed += 1
                        }

                        delete matchData.currentMatch["match" + MatchNumber];
                        delete matchData.currentMatch["match" + MatchNumber];
                        //matchData.currentMatch.finished = true

                        try {
                            fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }
                    } else {
                        const embed = new MessageEmbed()
                            .setColor('#00CCE8')
                            .setTitle(`GAME WAS A TIE!`)
                            .setDescription(`No winner was given!`)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                            .setTimestamp();

                        user1.send({ embeds: [embed] });
                        user2.send({ embeds: [embed] });

                        PData.players[keys[0]].gamesPlayed += 1
                        PData.players[keys[1]].gamesPlayed += 1

                        if (Config.eventStart) {
                            PData.players[keys[0]].event.gamesPlayed += 1
                            PData.players[keys[1]].event.gamesPlayed += 1
                        }

                        delete matchData.currentMatch["match" + MatchNumber];
                        delete matchData.currentMatch["match" + MatchNumber];
                        //matchData.currentMatch.finished = true

                        try {
                            fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }
                    }
                }

                if (won != true) {
                    matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack = "false"
                    matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack = "false"

                    try {
                        fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                }

                delete matchData.currentMatch["match" + MatchNumber];
                delete matchData.currentMatch["match" + MatchNumber];
                //matchData.currentMatch.finished = true

                try {
                    fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }
                return;
            }

            if(won!=true){
                matchData.currentMatch["match" + MatchNumber].round += 1
            }
            
            try {
                fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }

            //round += 1

            if (won != true && matchData.currentMatch["match" + MatchNumber].round <= 5 && failed != true) { //THIS WILL MOVE TO THE CHECK INSTEAD
                setTimeout(roundStart, 8000); //Round Start
            } else {
                if (won != true && matchData.currentMatch["match" + MatchNumber].round >= 6 && failed != true ) {
                    if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins == matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins) {
                        won = true
                        const embed = new MessageEmbed()
                            .setColor('#00CCE8')
                            .setTitle(`THE GAME WAS A TIE!`)
                            .setDescription(`No winner is given!`)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                            .setTimestamp();

                        user1.send({ embeds: [embed] });
                        user2.send({ embeds: [embed] });
                        client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                        var matchData;
                        var PData;
                        var Config;
                        try {
                            matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                            Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
                        } catch (e) {
                            console.log(e);
                            return;
                        }

                        PData.players[keys[0]].gamesPlayed += 1
                        PData.players[keys[1]].gamesPlayed += 1
                        if (Config.eventStart) {
                            PData.players[keys[0]].event.gamesPlayed += 1
                            PData.players[keys[1]].event.gamesPlayed += 1
                        }

                        delete matchData.currentMatch["match" + MatchNumber];
                        delete matchData.currentMatch["match" + MatchNumber];
                        //matchData.currentMatch.finished = true

                        try {
                            fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }
                    } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins > matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins) {
                        won = true
                        const embed = new MessageEmbed()
                            .setColor('#00CCE8')
                            .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} WON THE GAME!`)
                            .setDescription(`Congrats!`)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                            .setTimestamp();

                        user1.send({ embeds: [embed] });
                        user2.send({ embeds: [embed] });
                        client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                        var matchData;
                        var PData;
                        var Config;
                        try {
                            matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                            Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
                        } catch (e) {
                            console.log(e);
                            return;
                        }

                        PData.players[keys[1]].wins += 1
                        PData.players[keys[1]].tokens += 12
                        PData.players[keys[0]].loses += 1
                        PData.players[keys[0]].gamesPlayed += 1
                        PData.players[keys[1]].gamesPlayed += 1

                        if (Config.eventStart) {
                            PData.players[keys[1]].event.wins += 1
                            PData.players[keys[0]].event.loses += 1
                            PData.players[keys[0]].event.gamesPlayed += 1
                            PData.players[keys[1]].event.gamesPlayed += 1
                        }


                        delete matchData.currentMatch["match" + MatchNumber];
                        delete matchData.currentMatch["match" + MatchNumber];
                        //matchData.currentMatch.finished = true

                        try {
                            fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }
                    } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins > matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins) {
                        won = true

                        const embed = new MessageEmbed()
                            .setColor('#00CCE8')
                            .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} WON THE GAME!`)
                            .setDescription(`Congrats!`)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                            .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                            .setTimestamp();

                        user1.send({ embeds: [embed] });
                        user2.send({ embeds: [embed] });
                        client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                        var matchData;
                        var PData;
                        var Config;
                        try {
                            matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                            Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
                        } catch (e) {
                            console.log(e);
                            return;
                        }

                        PData.players[keys[0]].wins += 1
                        PData.players[keys[0]].tokens += 12
                        PData.players[keys[1]].loses += 1
                        PData.players[keys[0]].gamesPlayed += 1
                        PData.players[keys[1]].gamesPlayed += 1

                        if (Config.eventStart) {
                            PData.players[keys[0]].event.gamesPlayed += 1
                            PData.players[keys[1]].event.gamesPlayed += 1
                            PData.players[keys[0]].event.wins += 1
                            PData.players[keys[1]].event.loses += 1
                        }


                        delete matchData.currentMatch["match" + MatchNumber];
                        delete matchData.currentMatch["match" + MatchNumber];
                        //matchData.currentMatch.finished = true

                        try {
                            fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }
                    }
                }
            }
        }


        //roundStart();
        //setTimeout(roundStart, 10000); //Round 1
        //setTimeout(roundCheck, 5000); //Check Round

        //setTimeout(roundEnd, 30000);

        return;

        // if (Object.keys(matchData.currentQueue).length >= 2) {
        //     var keys = Object.keys(matchData.currentQueue)


        //     var matchkeys = Object.keys(matchData.currentMatch)
        //     var matchNumber = matchkeys.length + 1
        //     matchData.currentMatch["match" + matchNumber] = { round: 0, started: false, players: { [keys[0]]: { name: matchData.currentQueue[keys[0]].name, selectedAttack: "false", chosenAttack: "None", wins: 0, started: false }, [keys[1]]: { name: matchData.currentQueue[keys[1]].name, selectedAttack: "false", chosenAttack: "None", wins: 0, started: false } } }
        //     matchkeys = Object.keys(matchData.currentMatch)
        //     delete matchData.currentQueue[keys[0]];
        //     delete matchData.currentQueue[keys[1]];

        //     //matchData.currentMatch.finished = false

        //     var newKeys = Object.keys(matchData.currentMatch[matchkeys[matchNumber - 1]].players)

        //     try {
        //         fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //     } catch (e) {
        //         console.log(e);
        //         return;
        //     }

        //     const userA1 = await client.users.fetch(newKeys[0]);

        //     const userA2 = await client.users.fetch(newKeys[1]);

        //     try {
        //         userA1.send("Your match will begin in 10 seconds.");
        //         userA2.send("Your match will begin in 10 seconds.");
        //     } catch (error) {

        //     }

        //     console.log(newKeys[0] + "   -    " + newKeys[1])
        //     setTimeout(function () { RunAnArena(matchNumber, newKeys[0], newKeys[1], client) }, 10000); //Set Timer to end

        // }



        // return;
        // //-------------------------------------------------------------------------------//

        //         if (matchData.currentMatch.finished) {
        //             if (Object.keys(matchData.currentQueue).length >= 2) {
        //                 var keys = Object.keys(matchData.currentQueue)
        //                 matchData.currentMatch.players[keys[0]] = { name: matchData.currentQueue[keys[0]].name, selectedAttack: "false", chosenAttack: "None", wins: 0 }
        //                 matchData.currentMatch.players[keys[1]] = { name: matchData.currentQueue[keys[1]].name, selectedAttack: "false", chosenAttack: "None", wins: 0 }
        //                 delete matchData.currentQueue[keys[0]];
        //                 delete matchData.currentQueue[keys[1]];

        //                 matchData.currentMatch.finished = false

        //                 var newKeys = Object.keys(matchData.currentMatch.players)

        //                 try {
        //                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }

        //                 const user1 = await client.users.fetch(newKeys[0]);

        //                 const user2 = await client.users.fetch(newKeys[1]);

        //                 client.channels.cache.get(arenaChannel).send({
        //                     content: `${user1} and ${user2} - Your match is starting in **10 Seconds**!`
        //                     //embed: exampleEmbed
        //                 })

        //                 var round = 1

        //                 function roundStart() {
        //                     var matchData;
        //                     //var PData;
        //                     try {
        //                         matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                         //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }

        //                     const row = new MessageActionRow()
        //                         .addComponents(
        //                             new MessageButton()
        //                                 .setCustomId('Melee')
        //                                 .setLabel('Melee')
        //                                 .setStyle('DANGER'),
        //                             new MessageButton()
        //                                 .setCustomId('Defense')
        //                                 .setLabel('Defense')
        //                                 .setStyle('SUCCESS'),
        //                             new MessageButton()
        //                                 .setCustomId('Ranged')
        //                                 .setLabel('Ranged')
        //                                 .setStyle('PRIMARY'),
        //                         );

        //                     const embed = new MessageEmbed()
        //                         .setColor('#4FD100')
        //                         .setTitle(`ROUND ${round}/5`)
        //                         .setDescription('What would you like to do this round?')
        //                         .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                         .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                         .addField('Melee', 'Get close for an attack.', false)
        //                         .addField('Ranged', 'Attack from afar.', false)
        //                         .addField('Defense', 'Defend yourself from an attack.', false)
        //                         .setTimestamp();

        //                     client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed], components: [row] });

        //                     setTimeout(roundEnd, 15000);
        //                 }

        //                 function roundEnd() {
        //                     var matchData;
        //                     //var PData;
        //                     try {
        //                         matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                         //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }

        //                     //delete matchData.currentMatch.players[keys[0]];
        //                     //delete matchData.currentMatch.players[keys[1]];
        //                     //matchData.currentMatch.finished = true

        //                     try {
        //                         fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }

        //                     client.channels.cache.get(arenaChannel).send({
        //                         content: `The round has ended.`
        //                         //embed: exampleEmbed
        //                     })

        //                     setTimeout(roundCheck, 2000);
        //                 }

        //                 function roundCheck() {

        //                     var matchData;
        //                     var PData;
        //                     try {
        //                         matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                         PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }

        //                     var keys = Object.keys(matchData.currentMatch.players)

        //                     var failed = false
        //                     var won = false

        //                     if (matchData.currentMatch.players[keys[0]].selectedAttack == "true" && matchData.currentMatch.players[keys[1]].selectedAttack == "true") {
        //                         if (matchData.currentMatch.players[keys[0]].chosenAttack == matchData.currentMatch.players[keys[1]].chosenAttack) {
        //                             const embed = new MessageEmbed()
        //                                 .setColor('#E8D300')
        //                                 .setTitle(`ROUND ${round}/5 - RESULTS - TIED`)
        //                                 .setDescription('You both selected the same move and tied!')
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });
        //                         } else if (matchData.currentMatch.players[keys[0]].chosenAttack == "Defense" && matchData.currentMatch.players[keys[1]].chosenAttack == "Melee") {
        //                             //Player 1 wins
        //                             matchData.currentMatch.players[keys[0]].wins += 1
        //                             PData.players[keys[1]].naut.hp -= 1

        //                             const embed = new MessageEmbed()
        //                                 .setColor('#E8D300')
        //                                 .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                                 .setDescription(`${matchData.currentMatch.players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch.players[keys[0]].chosenAttack]} and won the round!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                             try {
        //                                 fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         } else if (matchData.currentMatch.players[keys[0]].chosenAttack == "Ranged" && matchData.currentMatch.players[keys[1]].chosenAttack == "Defense") {
        //                             //Player 1 wins
        //                             matchData.currentMatch.players[keys[0]].wins += 1
        //                             PData.players[keys[1]].naut.hp -= 1

        //                             const embed = new MessageEmbed()
        //                                 .setColor('#E8D300')
        //                                 .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                                 .setDescription(`${matchData.currentMatch.players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch.players[keys[0]].chosenAttack]} and won the round!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                             try {
        //                                 fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         } else if (matchData.currentMatch.players[keys[0]].chosenAttack == "Melee" && matchData.currentMatch.players[keys[1]].chosenAttack == "Ranged") {
        //                             //Player 1 wins
        //                             matchData.currentMatch.players[keys[0]].wins += 1
        //                             PData.players[keys[1]].naut.hp -= 1

        //                             const embed = new MessageEmbed()
        //                                 .setColor('#E8D300')
        //                                 .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                                 .setDescription(`${matchData.currentMatch.players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch.players[keys[0]].chosenAttack]} and won the round!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                             try {
        //                                 fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         } else if (matchData.currentMatch.players[keys[1]].chosenAttack == "Defense" && matchData.currentMatch.players[keys[0]].chosenAttack == "Melee") {
        //                             //Player 2 wins
        //                             matchData.currentMatch.players[keys[1]].wins += 1
        //                             PData.players[keys[0]].naut.hp -= 1

        //                             const embed = new MessageEmbed()
        //                                 .setColor('#E8D300')
        //                                 .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                                 .setDescription(`${matchData.currentMatch.players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch.players[keys[1]].chosenAttack]} and won the round!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                             try {
        //                                 fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         } else if (matchData.currentMatch.players[keys[1]].chosenAttack == "Ranged" && matchData.currentMatch.players[keys[0]].chosenAttack == "Defense") {
        //                             //Player 2 wins
        //                             matchData.currentMatch.players[keys[1]].wins += 1
        //                             PData.players[keys[0]].naut.hp -= 1

        //                             const embed = new MessageEmbed()
        //                                 .setColor('#E8D300')
        //                                 .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                                 .setDescription(`${matchData.currentMatch.players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch.players[keys[1]].chosenAttack]} and won the round!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });
        //                         } else if (matchData.currentMatch.players[keys[1]].chosenAttack == "Melee" && matchData.currentMatch.players[keys[0]].chosenAttack == "Ranged") {
        //                             //Player 2 wins
        //                             matchData.currentMatch.players[keys[1]].wins += 1
        //                             PData.players[keys[0]].naut.hp -= 1

        //                             const embed = new MessageEmbed()
        //                                 .setColor('#E8D300')
        //                                 .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                                 .setDescription(`${matchData.currentMatch.players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch.players[keys[1]].chosenAttack]} and won the round!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                             try {
        //                                 fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         }

        //                         if (matchData.currentMatch.players[keys[1]].wins >= 3) {
        //                             won = true
        //                             const embed = new MessageEmbed()
        //                                 .setColor('#00CCE8')
        //                                 .setTitle(`${matchData.currentMatch.players[keys[1]].name} WON THE GAME!`)
        //                                 .setDescription(`Congrats!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                             var matchData;
        //                             var PData;
        //                             var Config;
        //                             try {
        //                                 matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                                 PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                                 Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }

        //                             PData.players[keys[1]].wins += 1
        //                             PData.players[keys[1]].tokens += 12
        //                             PData.players[keys[0]].loses += 1
        //                             PData.players[keys[0]].gamesPlayed += 1
        //                             PData.players[keys[1]].gamesPlayed += 1

        //                             if (Config.eventStart) {
        //                                 PData.players[keys[1]].event.wins += 1
        //                                 PData.players[keys[0]].event.loses += 1
        //                                 PData.players[keys[0]].event.gamesPlayed += 1
        //                                 PData.players[keys[1]].event.gamesPlayed += 1
        //                             }

        //                             delete matchData.currentMatch.players[keys[0]];
        //                             delete matchData.currentMatch.players[keys[1]];
        //                             matchData.currentMatch.finished = true

        //                             try {
        //                                 fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                 fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         } else if (matchData.currentMatch.players[keys[0]].wins >= 3) {
        //                             won = true

        //                             const embed = new MessageEmbed()
        //                                 .setColor('#00CCE8')
        //                                 .setTitle(`${matchData.currentMatch.players[keys[0]].name} WON THE GAME!`)
        //                                 .setDescription(`Congrats!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                             var matchData;
        //                             var PData;
        //                             var Config;
        //                             try {
        //                                 matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                                 PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                                 Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }

        //                             PData.players[keys[0]].wins += 1
        //                             PData.players[keys[0]].tokens += 12
        //                             PData.players[keys[1]].loses += 1
        //                             PData.players[keys[0]].gamesPlayed += 1
        //                             PData.players[keys[1]].gamesPlayed += 1


        //                             if (Config.eventStart) {
        //                                 PData.players[keys[0]].event.wins += 1
        //                                 PData.players[keys[1]].event.loses += 1
        //                                 PData.players[keys[0]].event.gamesPlayed += 1
        //                                 PData.players[keys[1]].event.gamesPlayed += 1
        //                             }

        //                             delete matchData.currentMatch.players[keys[0]];
        //                             delete matchData.currentMatch.players[keys[1]];
        //                             matchData.currentMatch.finished = true

        //                             try {
        //                                 fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                 fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         }

        //                         if (won != true) {
        //                             matchData.currentMatch.players[keys[1]].selectedAttack = "false"
        //                             matchData.currentMatch.players[keys[0]].selectedAttack = "false"

        //                             try {
        //                                 fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         }
        //                     } else {
        //                         failed = true
        //                         //A PLAYER FAILED TO SELECT

        //                         const embed = new MessageEmbed()
        //                             .setColor('#E80000')
        //                             .setTitle(`Match Canceled`)
        //                             .setDescription('A player failed to choose an attack!')
        //                             .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].selectedAttack} - Selected`, true)
        //                             .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].selectedAttack} - Selected`, true)
        //                             .setTimestamp();

        //                         client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                         setTimeout(function () { }, 500); //Wait for next message

        //                         var matchData;
        //                         var PData;
        //                         var Config;
        //                         try {
        //                             matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                             PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                             Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                         } catch (e) {
        //                             console.log(e);
        //                             return;
        //                         }

        //                         if (matchData.currentMatch.players[keys[1]].wins > matchData.currentMatch.players[keys[0]].wins && matchData.currentMatch.players[keys[1]].selectedAttack == "true" && round != 1) {
        //                             won = true
        //                             const embed = new MessageEmbed()
        //                                 .setColor('#00CCE8')
        //                                 .setTitle(`${matchData.currentMatch.players[keys[1]].name} WON THE GAME!`)
        //                                 .setDescription(`Congrats!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                             PData.players[keys[1]].wins += 1
        //                             PData.players[keys[1]].tokens += 12
        //                             PData.players[keys[0]].loses += 1
        //                             PData.players[keys[0]].gamesPlayed += 1
        //                             PData.players[keys[1]].gamesPlayed += 1

        //                             if (Config.eventStart) {
        //                                 PData.players[keys[1]].event.wins += 1
        //                                 PData.players[keys[0]].event.loses += 1
        //                                 PData.players[keys[0]].event.gamesPlayed += 1
        //                                 PData.players[keys[1]].event.gamesPlayed += 1
        //                             }

        //                             delete matchData.currentMatch.players[keys[0]];
        //                             delete matchData.currentMatch.players[keys[1]];
        //                             matchData.currentMatch.finished = true

        //                             try {
        //                                 fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                 fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         } else if (matchData.currentMatch.players[keys[1]].wins < matchData.currentMatch.players[keys[0]].wins && matchData.currentMatch.players[keys[0]].selectedAttack == "true" && round != 1) {
        //                             won = true

        //                             const embed = new MessageEmbed()
        //                                 .setColor('#00CCE8')
        //                                 .setTitle(`${matchData.currentMatch.players[keys[0]].name} WON THE GAME!`)
        //                                 .setDescription(`Congrats!`)
        //                                 .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                 .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                 .setTimestamp();

        //                             client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                             var matchData;
        //                             var PData;
        //                             var Config;
        //                             try {
        //                                 matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                                 PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                                 Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }

        //                             PData.players[keys[0]].wins += 1
        //                             PData.players[keys[0]].tokens += 12
        //                             PData.players[keys[1]].loses += 1
        //                             PData.players[keys[0]].gamesPlayed += 1
        //                             PData.players[keys[1]].gamesPlayed += 1


        //                             if (Config.eventStart) {
        //                                 PData.players[keys[0]].event.wins += 1
        //                                 PData.players[keys[1]].event.loses += 1
        //                                 PData.players[keys[0]].event.gamesPlayed += 1
        //                                 PData.players[keys[1]].event.gamesPlayed += 1
        //                             }

        //                             delete matchData.currentMatch.players[keys[0]];
        //                             delete matchData.currentMatch.players[keys[1]];
        //                             matchData.currentMatch.finished = true

        //                             try {
        //                                 fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                 fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         } else if (matchData.currentMatch.players[keys[1]].wins == matchData.currentMatch.players[keys[0]].wins && round != 1) {
        //                             won = true

        //                             if (matchData.currentMatch.players[keys[0]].selectedAttack == "true") {
        //                                 const embed = new MessageEmbed()
        //                                     .setColor('#00CCE8')
        //                                     .setTitle(`${matchData.currentMatch.players[keys[0]].name} WON THE GAME!`)
        //                                     .setDescription(`Congrats!`)
        //                                     .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                     .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                     .setTimestamp();

        //                                 client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                                 var matchData;
        //                                 var PData;
        //                                 var Config;
        //                                 try {
        //                                     matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                                     PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                                     Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }

        //                                 PData.players[keys[0]].wins += 1
        //                                 PData.players[keys[0]].tokens += 12
        //                                 PData.players[keys[1]].loses += 1
        //                                 PData.players[keys[0]].gamesPlayed += 1
        //                                 PData.players[keys[1]].gamesPlayed += 1


        //                                 if (Config.eventStart) {
        //                                     PData.players[keys[0]].event.wins += 1
        //                                     PData.players[keys[1]].event.loses += 1
        //                                     PData.players[keys[0]].event.gamesPlayed += 1
        //                                     PData.players[keys[1]].event.gamesPlayed += 1
        //                                 }

        //                                 delete matchData.currentMatch.players[keys[0]];
        //                                 delete matchData.currentMatch.players[keys[1]];
        //                                 matchData.currentMatch.finished = true

        //                                 try {
        //                                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }
        //                             } else if (matchData.currentMatch.players[keys[1]].selectedAttack == "true") {
        //                                 const embed = new MessageEmbed()
        //                                     .setColor('#00CCE8')
        //                                     .setTitle(`${matchData.currentMatch.players[keys[1]].name} WON THE GAME!`)
        //                                     .setDescription(`Congrats!`)
        //                                     .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                     .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                     .setTimestamp();

        //                                 client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                                 PData.players[keys[1]].wins += 1
        //                                 PData.players[keys[1]].tokens += 12
        //                                 PData.players[keys[0]].loses += 1
        //                                 PData.players[keys[0]].gamesPlayed += 1
        //                                 PData.players[keys[1]].gamesPlayed += 1

        //                                 if (Config.eventStart) {
        //                                     PData.players[keys[1]].event.wins += 1
        //                                     PData.players[keys[0]].event.loses += 1
        //                                     PData.players[keys[0]].event.gamesPlayed += 1
        //                                     PData.players[keys[1]].event.gamesPlayed += 1
        //                                 }

        //                                 delete matchData.currentMatch.players[keys[0]];
        //                                 delete matchData.currentMatch.players[keys[1]];
        //                                 matchData.currentMatch.finished = true

        //                                 try {
        //                                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }
        //                             } else {
        //                                 const embed = new MessageEmbed()
        //                                     .setColor('#00CCE8')
        //                                     .setTitle(`GAME WAS A TIE!`)
        //                                     .setDescription(`No winner was given!`)
        //                                     .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                     .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                     .setTimestamp();

        //                                 client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                                 PData.players[keys[0]].gamesPlayed += 1
        //                                 PData.players[keys[1]].gamesPlayed += 1

        //                                 if (Config.eventStart) {
        //                                     PData.players[keys[0]].event.gamesPlayed += 1
        //                                     PData.players[keys[1]].event.gamesPlayed += 1
        //                                 }

        //                                 delete matchData.currentMatch.players[keys[0]];
        //                                 delete matchData.currentMatch.players[keys[1]];
        //                                 matchData.currentMatch.finished = true

        //                                 try {
        //                                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }
        //                             }
        //                         }

        //                         if (won != true) {
        //                             matchData.currentMatch.players[keys[1]].selectedAttack = "false"
        //                             matchData.currentMatch.players[keys[0]].selectedAttack = "false"

        //                             try {
        //                                 fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                             } catch (e) {
        //                                 console.log(e);
        //                                 return;
        //                             }
        //                         }

        //                         delete matchData.currentMatch.players[keys[0]];
        //                         delete matchData.currentMatch.players[keys[1]];
        //                         matchData.currentMatch.finished = true

        //                         try {
        //                             fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                         } catch (e) {
        //                             console.log(e);
        //                             return;
        //                         }
        //                     }

        //                     round += 1

        //                     if (round <= 5 && failed != true && won != true) { //THIS WILL MOVE TO THE CHECK INSTEAD
        //                         setTimeout(roundStart, 8000); //Round Start
        //                     } else {
        //                         if (round >= 6 && failed != true && won != true) {
        //                             if (matchData.currentMatch.players[keys[1]].wins == matchData.currentMatch.players[keys[0]].wins) {
        //                                 won = true
        //                                 const embed = new MessageEmbed()
        //                                     .setColor('#00CCE8')
        //                                     .setTitle(`THE GAME WAS A TIE!`)
        //                                     .setDescription(`No winner is given!`)
        //                                     .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                     .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                     .setTimestamp();

        //                                 client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                                 var matchData;
        //                                 var PData;
        //                                 var Config;
        //                                 try {
        //                                     matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                                     PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                                     Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }

        //                                 PData.players[keys[0]].gamesPlayed += 1
        //                                 PData.players[keys[1]].gamesPlayed += 1
        //                                 if (Config.eventStart) {
        //                                     PData.players[keys[0]].event.gamesPlayed += 1
        //                                     PData.players[keys[1]].event.gamesPlayed += 1
        //                                 }

        //                                 delete matchData.currentMatch.players[keys[0]];
        //                                 delete matchData.currentMatch.players[keys[1]];
        //                                 matchData.currentMatch.finished = true

        //                                 try {
        //                                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }
        //                             } else if (matchData.currentMatch.players[keys[1]].wins > matchData.currentMatch.players[keys[0]].wins) {
        //                                 won = true
        //                                 const embed = new MessageEmbed()
        //                                     .setColor('#00CCE8')
        //                                     .setTitle(`${matchData.currentMatch.players[keys[1]].name} WON THE GAME!`)
        //                                     .setDescription(`Congrats!`)
        //                                     .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                     .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                     .setTimestamp();

        //                                 client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                                 var matchData;
        //                                 var PData;
        //                                 var Config;
        //                                 try {
        //                                     matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                                     PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                                     Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }

        //                                 PData.players[keys[1]].wins += 1
        //                                 PData.players[keys[1]].tokens += 12
        //                                 PData.players[keys[0]].loses += 1
        //                                 PData.players[keys[0]].gamesPlayed += 1
        //                                 PData.players[keys[1]].gamesPlayed += 1

        //                                 if (Config.eventStart) {
        //                                     PData.players[keys[1]].event.wins += 1
        //                                     PData.players[keys[0]].event.loses += 1
        //                                     PData.players[keys[0]].event.gamesPlayed += 1
        //                                     PData.players[keys[1]].event.gamesPlayed += 1
        //                                 }


        //                                 delete matchData.currentMatch.players[keys[0]];
        //                                 delete matchData.currentMatch.players[keys[1]];
        //                                 matchData.currentMatch.finished = true

        //                                 try {
        //                                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }
        //                             } else if (matchData.currentMatch.players[keys[0]].wins > matchData.currentMatch.players[keys[1]].wins) {
        //                                 won = true

        //                                 const embed = new MessageEmbed()
        //                                     .setColor('#00CCE8')
        //                                     .setTitle(`${matchData.currentMatch.players[keys[0]].name} WON THE GAME!`)
        //                                     .setDescription(`Congrats!`)
        //                                     .addField(matchData.currentMatch.players[keys[0]].name, `${matchData.currentMatch.players[keys[0]].wins} points`, true)
        //                                     .addField(matchData.currentMatch.players[keys[1]].name, `${matchData.currentMatch.players[keys[1]].wins} points`, true)
        //                                     .setTimestamp();

        //                                 client.channels.cache.get(arenaChannel).send({ content: `${user1},${user2}`, ephemeral: false, embeds: [embed] });

        //                                 var matchData;
        //                                 var PData;
        //                                 var Config;
        //                                 try {
        //                                     matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                                     PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                                     Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }

        //                                 PData.players[keys[0]].wins += 1
        //                                 PData.players[keys[0]].tokens += 12
        //                                 PData.players[keys[1]].loses += 1
        //                                 PData.players[keys[0]].gamesPlayed += 1
        //                                 PData.players[keys[1]].gamesPlayed += 1

        //                                 if (Config.eventStart) {
        //                                     PData.players[keys[0]].event.gamesPlayed += 1
        //                                     PData.players[keys[1]].event.gamesPlayed += 1
        //                                     PData.players[keys[0]].event.wins += 1
        //                                     PData.players[keys[1]].event.loses += 1
        //                                 }


        //                                 delete matchData.currentMatch.players[keys[0]];
        //                                 delete matchData.currentMatch.players[keys[1]];
        //                                 matchData.currentMatch.finished = true

        //                                 try {
        //                                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                                 } catch (e) {
        //                                     console.log(e);
        //                                     return;
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }

        //                 setTimeout(roundStart, 10000); //Round 1
        //                 //setTimeout(roundCheck, 5000); //Check Round

        //                 //setTimeout(roundEnd, 30000);
        //             }
        //         } else {
        //             return;
        //         }


        //         return; //-------------------------------------

        //         const InCurrentQ = fs.readdirSync('./Arena/Match/CurrentQ/').filter(file => file.endsWith('.txt'));
        //         const OldMatch = fs.readdirSync('./Arena/Match/CurrentMatch/').filter(file => file.endsWith('.txt'));

        //         OldMatch.forEach(file => {
        //             if (!file.includes("finished")) {
        //                 fs.unlinkSync(`./Arena/Match/CurrentMatch/${file}`)
        //                 console.log("Removed file")
        //             }
        //         });

        //         if (InCurrentQ.length >= 2) {
        //             console.log("Starting Arena")
        //             try {
        //                 fs.writeFileSync(`./Arena/Match/CurrentMatch/finished.txt`, "false");
        //             } catch (err) {
        //                 console.error(err)
        //                 return;
        //             }

        //             try {
        //                 fs.copyFileSync(`./Arena/Match/CurrentQ/${InCurrentQ[0]}`, `./Arena/Match/CurrentMatch/${InCurrentQ[0]}`);
        //                 fs.unlinkSync(`./Arena/Match/CurrentQ/${InCurrentQ[0]}`)
        //             } catch (err) {
        //                 console.error(err)
        //                 return;
        //             }

        //             try {
        //                 fs.copyFileSync(`./Arena/Match/CurrentQ/${InCurrentQ[1]}`, `./Arena/Match/CurrentMatch/${InCurrentQ[1]}`);
        //                 fs.unlinkSync(`./Arena/Match/CurrentQ/${InCurrentQ[1]}`)
        //             } catch (err) {
        //                 console.error(err)
        //                 return;
        //             }
        //         }

        return;
    }
}