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
    name: 'arenaUtil',
    description: "Runs the arena logic",

    async run(client) {

        //console.log("Ran")

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const log = await requireUncached(`./logging`);

        const fs = require('fs');
        const arenaChannel = '938661421485527090'
        const arenaMainChannel = '938665699021324318'

        var matchData;
        var Config;
        var PData;
        var facData
        try {
            matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
            Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
            PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
            facData = JSON.parse(fs.readFileSync("./Arena/Factions.json", "utf8"))
        } catch (e) {
            console.log(e);
            return;
        }

        if (Config.pauseArena) {
            return;
        }

        // async function RunAnArena(MatchNumber, userID1, userID2) {

        //     var round = 0;

        //     var keys = Object.keys(matchData.currentMatch["match"+MatchNumber].players)

        //     const user1 = await client.users.fetch(userID1);
        //     const user2 = await client.users.fetch(userID2);

        //     //user1.send("try")
        //     //user2.send("try")



        //     function roundStart() {
        //         var matchData;
        //         //var PData;
        //         try {
        //             matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //             //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //         } catch (e) {
        //             console.log(e);
        //             return;
        //         }

        //         const row = new MessageActionRow()
        //             .addComponents(
        //                 new MessageButton()
        //                     .setCustomId('Melee-' + MatchNumber)
        //                     .setLabel('Melee')
        //                     .setStyle('DANGER'),
        //                 new MessageButton()
        //                     .setCustomId('Defense-' + MatchNumber)
        //                     .setLabel('Defense')
        //                     .setStyle('SUCCESS'),
        //                 new MessageButton()
        //                     .setCustomId('Ranged-' + MatchNumber)
        //                     .setLabel('Ranged')
        //                     .setStyle('PRIMARY'),
        //             );

        //         const embed = new MessageEmbed()
        //             .setColor('#4FD100')
        //             .setTitle(`ROUND 1/5`)
        //             .setDescription('What would you like to do this round?')
        //             //.addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //             //.addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //             .addField('Melee', 'Get close for an attack.', false)
        //             .addField('Ranged', 'Attack from afar.', false)
        //             .addField('Defense', 'Defend yourself from an attack.', false)
        //             .setTimestamp();

        //         try {
        //             user1.send({ embeds: [embed], components: [row] });
        //             user2.send({ embeds: [embed], components: [row] });
        //         } catch (error) {
        //             console.log(error)
        //         }

        //         setTimeout(function () { }, 500); //Set Timer to end

        //         var TimerEnded = false;

        //         setTimeout(function () { TimerEnded = true; }, 15000); //Set Timer to end

        //         while (matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack != "true" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack != "true" && TimerEnded == false) {
        //             setTimeout(function () { }, 5000); //Set Timer to end

        //             //console.log("Testing")

        //             matchData;
        //             //var PData;
        //             try {
        //                 matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                 //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //             } catch (e) {
        //                 console.log(e);
        //                 return;
        //             }
        //         }

        //         roundEnd()

        //         //setTimeout(roundEnd, 15000);
        //     }



        //     function roundEnd() {
        //         var matchData;
        //         //var PData;
        //         try {
        //             matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //             //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //         } catch (e) {
        //             console.log(e);
        //             return;
        //         }

        //         //delete matchData.currentMatch.players[keys[0]];
        //         //delete matchData.currentMatch.players[keys[1]];
        //         //matchData.currentMatch.finished = true

        //         // try {
        //         //     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //         // } catch (e) {
        //         //     console.log(e);
        //         //     return;
        //         // }

        //         user1.send({ content: `The round has ended.` /*embed: exampleEmbed*/ })
        //         user2.send({ content: `The round has ended.` /*embed: exampleEmbed*/ })

        //         setTimeout(roundCheck, 2000);
        //     }



        //     function roundCheck() {

        //         var matchData;
        //         var PData;
        //         try {
        //             matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //             PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //         } catch (e) {
        //             console.log(e);
        //             return;
        //         }

        //         var keys = Object.keys(matchData.currentMatch["match" + MatchNumber].players)

        //         var failed = false
        //         var won = false

        //         if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack == "true" && matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack == "true") {
        //             if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack) {
        //                 const embed = new MessageEmbed()
        //                     .setColor('#E8D300')
        //                     .setTitle(`ROUND ${round}/5 - RESULTS - TIED`)
        //                     .setDescription('You both selected the same move and tied!')
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });
        //             } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Defense" && matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Melee") {
        //                 //Player 1 wins
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins += 1
        //                 PData.players[keys[1]].naut.hp -= 1

        //                 const embed = new MessageEmbed()
        //                     .setColor('#E8D300')
        //                     .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                     .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack]} and won the round!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });

        //                 try {
        //                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Ranged" && matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Defense") {
        //                 //Player 1 wins
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins += 1
        //                 PData.players[keys[1]].naut.hp -= 1

        //                 const embed = new MessageEmbed()
        //                     .setColor('#E8D300')
        //                     .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                     .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack]} and won the round!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });

        //                 try {
        //                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Melee" && matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Ranged") {
        //                 //Player 1 wins
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins += 1
        //                 PData.players[keys[1]].naut.hp -= 1

        //                 const embed = new MessageEmbed()
        //                     .setColor('#E8D300')
        //                     .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                     .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack]} and won the round!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });

        //                 try {
        //                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Defense" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Melee") {
        //                 //Player 2 wins
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins += 1
        //                 PData.players[keys[0]].naut.hp -= 1

        //                 const embed = new MessageEmbed()
        //                     .setColor('#E8D300')
        //                     .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                     .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack]} and won the round!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });

        //                 try {
        //                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Ranged" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Defense") {
        //                 //Player 2 wins
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins += 1
        //                 PData.players[keys[0]].naut.hp -= 1

        //                 const embed = new MessageEmbed()
        //                     .setColor('#E8D300')
        //                     .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                     .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack]} and won the round!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });
        //             } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Melee" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Ranged") {
        //                 //Player 2 wins
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins += 1
        //                 PData.players[keys[0]].naut.hp -= 1

        //                 const embed = new MessageEmbed()
        //                     .setColor('#E8D300')
        //                     .setTitle(`ROUND ${round}/5 - RESULTS`)
        //                     .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack]} and won the round!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });

        //                 try {
        //                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             }

        //             if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins >= 3) {
        //                 won = true
        //                 const embed = new MessageEmbed()
        //                     .setColor('#00CCE8')
        //                     .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} WON THE GAME!`)
        //                     .setDescription(`Congrats!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });

        //                 var matchData;
        //                 var PData;
        //                 var Config;
        //                 try {
        //                     matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                     PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                     Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }

        //                 PData.players[keys[1]].wins += 1
        //                 PData.players[keys[1]].tokens += 12
        //                 PData.players[keys[0]].loses += 1
        //                 PData.players[keys[0]].gamesPlayed += 1
        //                 PData.players[keys[1]].gamesPlayed += 1

        //                 if (Config.eventStart) {
        //                     PData.players[keys[1]].event.wins += 1
        //                     PData.players[keys[0]].event.loses += 1
        //                     PData.players[keys[0]].event.gamesPlayed += 1
        //                     PData.players[keys[1]].event.gamesPlayed += 1
        //                 }

        //                 delete matchData.currentMatch["match" + MatchNumber];
        //                 delete matchData.currentMatch["match" + MatchNumber];
        //                 //matchData.currentMatch.finished = true

        //                 try {
        //                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins >= 3) {
        //                 won = true

        //                 const embed = new MessageEmbed()
        //                     .setColor('#00CCE8')
        //                     .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} WON THE GAME!`)
        //                     .setDescription(`Congrats!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });

        //                 var matchData;
        //                 var PData;
        //                 var Config;
        //                 try {
        //                     matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                     PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                     Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }

        //                 PData.players[keys[0]].wins += 1
        //                 PData.players[keys[0]].tokens += 12
        //                 PData.players[keys[1]].loses += 1
        //                 PData.players[keys[0]].gamesPlayed += 1
        //                 PData.players[keys[1]].gamesPlayed += 1


        //                 if (Config.eventStart) {
        //                     PData.players[keys[0]].event.wins += 1
        //                     PData.players[keys[1]].event.loses += 1
        //                     PData.players[keys[0]].event.gamesPlayed += 1
        //                     PData.players[keys[1]].event.gamesPlayed += 1
        //                 }

        //                 delete matchData.currentMatch["match" + MatchNumber];
        //                 delete matchData.currentMatch["match" + MatchNumber];
        //                 //matchData.currentMatch.finished = true

        //                 try {
        //                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             }

        //             if (won != true) {
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack = "false"
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack = "false"

        //                 try {
        //                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             }
        //         } else {
        //             failed = true
        //             //A PLAYER FAILED TO SELECT

        //             const embed = new MessageEmbed()
        //                 .setColor('#E80000')
        //                 .setTitle(`Match Canceled`)
        //                 .setDescription('A player failed to choose an attack!')
        //                 .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack} - Selected`, true)
        //                 .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack} - Selected`, true)
        //                 .setTimestamp();

        //             user1.send({ embeds: [embed] });
        //             user2.send({ embeds: [embed] });

        //             setTimeout(function () { }, 500); //Wait for next message

        //             var matchData;
        //             var PData;
        //             var Config;
        //             try {
        //                 matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                 PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                 Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //             } catch (e) {
        //                 console.log(e);
        //                 return;
        //             }

        //             if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins > matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins && matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack == "true" && round != 1) {
        //                 won = true
        //                 const embed = new MessageEmbed()
        //                     .setColor('#00CCE8')
        //                     .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} WON THE GAME!`)
        //                     .setDescription(`Congrats!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });

        //                 PData.players[keys[1]].wins += 1
        //                 PData.players[keys[1]].tokens += 12
        //                 PData.players[keys[0]].loses += 1
        //                 PData.players[keys[0]].gamesPlayed += 1
        //                 PData.players[keys[1]].gamesPlayed += 1

        //                 if (Config.eventStart) {
        //                     PData.players[keys[1]].event.wins += 1
        //                     PData.players[keys[0]].event.loses += 1
        //                     PData.players[keys[0]].event.gamesPlayed += 1
        //                     PData.players[keys[1]].event.gamesPlayed += 1
        //                 }

        //                 delete matchData.currentMatch["match" + MatchNumber];
        //                 delete matchData.currentMatch["match" + MatchNumber];
        //                 //matchData.currentMatch.finished = true

        //                 try {
        //                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins < matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins && matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack == "true" && round != 1) {
        //                 won = true

        //                 const embed = new MessageEmbed()
        //                     .setColor('#00CCE8')
        //                     .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} WON THE GAME!`)
        //                     .setDescription(`Congrats!`)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                     .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                     .setTimestamp();

        //                 user1.send({ embeds: [embed] });
        //                 user2.send({ embeds: [embed] });

        //                 var matchData;
        //                 var PData;
        //                 var Config;
        //                 try {
        //                     matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                     PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                     Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }

        //                 PData.players[keys[0]].wins += 1
        //                 PData.players[keys[0]].tokens += 12
        //                 PData.players[keys[1]].loses += 1
        //                 PData.players[keys[0]].gamesPlayed += 1
        //                 PData.players[keys[1]].gamesPlayed += 1


        //                 if (Config.eventStart) {
        //                     PData.players[keys[0]].event.wins += 1
        //                     PData.players[keys[1]].event.loses += 1
        //                     PData.players[keys[0]].event.gamesPlayed += 1
        //                     PData.players[keys[1]].event.gamesPlayed += 1
        //                 }

        //                 delete matchData.currentMatch["match" + MatchNumber];
        //                 delete matchData.currentMatch["match" + MatchNumber];
        //                 //matchData.currentMatch.finished = true

        //                 try {
        //                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                     fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins == matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins && round != 1) {
        //                 won = true

        //                 if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack == "true") {
        //                     const embed = new MessageEmbed()
        //                         .setColor('#00CCE8')
        //                         .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} WON THE GAME!`)
        //                         .setDescription(`Congrats!`)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                         .setTimestamp();

        //                     user1.send({ embeds: [embed] });
        //                     user2.send({ embeds: [embed] });

        //                     var matchData;
        //                     var PData;
        //                     var Config;
        //                     try {
        //                         matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                         PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                         Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }

        //                     PData.players[keys[0]].wins += 1
        //                     PData.players[keys[0]].tokens += 12
        //                     PData.players[keys[1]].loses += 1
        //                     PData.players[keys[0]].gamesPlayed += 1
        //                     PData.players[keys[1]].gamesPlayed += 1


        //                     if (Config.eventStart) {
        //                         PData.players[keys[0]].event.wins += 1
        //                         PData.players[keys[1]].event.loses += 1
        //                         PData.players[keys[0]].event.gamesPlayed += 1
        //                         PData.players[keys[1]].event.gamesPlayed += 1
        //                     }

        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     //matchData.currentMatch.finished = true

        //                     try {
        //                         fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                         fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }
        //                 } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack == "true") {
        //                     const embed = new MessageEmbed()
        //                         .setColor('#00CCE8')
        //                         .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} WON THE GAME!`)
        //                         .setDescription(`Congrats!`)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                         .setTimestamp();

        //                     user1.send({ embeds: [embed] });
        //                     user2.send({ embeds: [embed] });

        //                     PData.players[keys[1]].wins += 1
        //                     PData.players[keys[1]].tokens += 12
        //                     PData.players[keys[0]].loses += 1
        //                     PData.players[keys[0]].gamesPlayed += 1
        //                     PData.players[keys[1]].gamesPlayed += 1

        //                     if (Config.eventStart) {
        //                         PData.players[keys[1]].event.wins += 1
        //                         PData.players[keys[0]].event.loses += 1
        //                         PData.players[keys[0]].event.gamesPlayed += 1
        //                         PData.players[keys[1]].event.gamesPlayed += 1
        //                     }

        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     //matchData.currentMatch.finished = true

        //                     try {
        //                         fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                         fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }
        //                 } else {
        //                     const embed = new MessageEmbed()
        //                         .setColor('#00CCE8')
        //                         .setTitle(`GAME WAS A TIE!`)
        //                         .setDescription(`No winner was given!`)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                         .setTimestamp();

        //                     user1.send({ embeds: [embed] });
        //                     user2.send({ embeds: [embed] });

        //                     PData.players[keys[0]].gamesPlayed += 1
        //                     PData.players[keys[1]].gamesPlayed += 1

        //                     if (Config.eventStart) {
        //                         PData.players[keys[0]].event.gamesPlayed += 1
        //                         PData.players[keys[1]].event.gamesPlayed += 1
        //                     }

        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     //matchData.currentMatch.finished = true

        //                     try {
        //                         fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                         fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }
        //                 }
        //             }

        //             if (won != true) {
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack = "false"
        //                 matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack = "false"

        //                 try {
        //                     fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                 } catch (e) {
        //                     console.log(e);
        //                     return;
        //                 }
        //             }

        //             delete matchData.currentMatch["match" + MatchNumber];
        //             delete matchData.currentMatch["match" + MatchNumber];
        //             //matchData.currentMatch.finished = true

        //             try {
        //                 fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //             } catch (e) {
        //                 console.log(e);
        //                 return;
        //             }
        //         }

        //         matchData.currentMatch["match" + MatchNumber].round += 1
        //         round = matchData.currentMatch["match" + MatchNumber].round

        //         try {
        //             fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //         } catch (e) {
        //             console.log(e);
        //             return;
        //         }

        //         //round += 1

        //         if (round <= 5 && failed != true && won != true) { //THIS WILL MOVE TO THE CHECK INSTEAD
        //             setTimeout(roundStart, 8000); //Round Start
        //         } else {
        //             if (round >= 6 && failed != true && won != true) {
        //                 if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins == matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins) {
        //                     won = true
        //                     const embed = new MessageEmbed()
        //                         .setColor('#00CCE8')
        //                         .setTitle(`THE GAME WAS A TIE!`)
        //                         .setDescription(`No winner is given!`)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                         .setTimestamp();

        //                     user1.send({ embeds: [embed] });
        //                     user2.send({ embeds: [embed] });

        //                     var matchData;
        //                     var PData;
        //                     var Config;
        //                     try {
        //                         matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                         PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                         Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }

        //                     PData.players[keys[0]].gamesPlayed += 1
        //                     PData.players[keys[1]].gamesPlayed += 1
        //                     if (Config.eventStart) {
        //                         PData.players[keys[0]].event.gamesPlayed += 1
        //                         PData.players[keys[1]].event.gamesPlayed += 1
        //                     }

        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     //matchData.currentMatch.finished = true

        //                     try {
        //                         fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                         fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }
        //                 } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins > matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins) {
        //                     won = true
        //                     const embed = new MessageEmbed()
        //                         .setColor('#00CCE8')
        //                         .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} WON THE GAME!`)
        //                         .setDescription(`Congrats!`)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                         .setTimestamp();

        //                     user1.send({ embeds: [embed] });
        //                     user2.send({ embeds: [embed] });

        //                     var matchData;
        //                     var PData;
        //                     var Config;
        //                     try {
        //                         matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                         PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                         Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }

        //                     PData.players[keys[1]].wins += 1
        //                     PData.players[keys[1]].tokens += 12
        //                     PData.players[keys[0]].loses += 1
        //                     PData.players[keys[0]].gamesPlayed += 1
        //                     PData.players[keys[1]].gamesPlayed += 1

        //                     if (Config.eventStart) {
        //                         PData.players[keys[1]].event.wins += 1
        //                         PData.players[keys[0]].event.loses += 1
        //                         PData.players[keys[0]].event.gamesPlayed += 1
        //                         PData.players[keys[1]].event.gamesPlayed += 1
        //                     }


        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     //matchData.currentMatch.finished = true

        //                     try {
        //                         fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                         fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }
        //                 } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins > matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins) {
        //                     won = true

        //                     const embed = new MessageEmbed()
        //                         .setColor('#00CCE8')
        //                         .setTitle(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} WON THE GAME!`)
        //                         .setDescription(`Congrats!`)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
        //                         .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
        //                         .setTimestamp();

        //                     user1.send({ embeds: [embed] });
        //                     user2.send({ embeds: [embed] });

        //                     var matchData;
        //                     var PData;
        //                     var Config;
        //                     try {
        //                         matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
        //                         PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
        //                         Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }

        //                     PData.players[keys[0]].wins += 1
        //                     PData.players[keys[0]].tokens += 12
        //                     PData.players[keys[1]].loses += 1
        //                     PData.players[keys[0]].gamesPlayed += 1
        //                     PData.players[keys[1]].gamesPlayed += 1

        //                     if (Config.eventStart) {
        //                         PData.players[keys[0]].event.gamesPlayed += 1
        //                         PData.players[keys[1]].event.gamesPlayed += 1
        //                         PData.players[keys[0]].event.wins += 1
        //                         PData.players[keys[1]].event.loses += 1
        //                     }


        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     delete matchData.currentMatch["match" + MatchNumber];
        //                     //matchData.currentMatch.finished = true

        //                     try {
        //                         fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
        //                         fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
        //                     } catch (e) {
        //                         console.log(e);
        //                         return;
        //                     }
        //                 }
        //             }
        //         }
        //     }


        //     roundStart();
        //     //setTimeout(roundStart, 10000); //Round 1
        //     //setTimeout(roundCheck, 5000); //Check Round

        //     //setTimeout(roundEnd, 30000);

        //     return;

        // }

        var prod = false

        //Let them know game is starting. Start new game from queue ---------------------------------

        if (prod) {
            if (Object.keys(matchData.currentQueue).length >= 2) {
                var keys = Object.keys(matchData.currentQueue)


                var matchkeys = Object.keys(matchData.currentMatch)
                var matchNumber = matchkeys.length + 1 //Change Below to match-number
                matchData.currentMatch["match" + matchNumber] = { round: 1, started: false, roundFinished: false, players: { [keys[0]]: { name: matchData.currentQueue[keys[0]].name, selectedAttack: "false", chosenAttack: "None", wins: 0, started: false }, [keys[1]]: { name: matchData.currentQueue[keys[1]].name, selectedAttack: "false", chosenAttack: "None", wins: 0, started: false } } }
                matchkeys = Object.keys(matchData.currentMatch)
                delete matchData.currentQueue[keys[0]];
                delete matchData.currentQueue[keys[1]];

                //matchData.currentMatch.finished = false

                //                                      Change Below to match-number
                var newKeys = Object.keys(matchData.currentMatch["match" + matchNumber].players)

                try {
                    fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }

                const userA1 = await client.users.fetch(newKeys[0]);
                const userA2 = await client.users.fetch(newKeys[1]);

                try {
                    userA1.send("Your match will begin in 10 seconds.");
                    userA2.send("Your match will begin in 10 seconds.");
                } catch (error) {
                    console.log(error)
                    return;
                }

                //console.log(newKeys[0] + "   -    " + newKeys[1])
                const arenaUtilGame = await requireUncached(`../utilities/arenaUtilGame`);
                setTimeout(function () { arenaUtilGame.run(client, matchNumber, userA1, userA2) }, 10000); //Set Timer to end
            }
        }

        //Let them know game is starting. Start new game from queue ---------------------------------



        if (!prod) {

            //Check games -------------------------------------------------------------------------------
            var GMatches = Object.keys(matchData.currentMatch)

            var EMatches = []

            GMatches.forEach(async CMatch => {

                var Cplayers = Object.keys(matchData.currentMatch[CMatch].players)

                var Canceled = false;

                try {
                    matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                } catch (e) {
                    console.log(e);
                    return;
                }

                const Cuser1 = await client.users.fetch(Cplayers[0]);
                const Cuser2 = await client.users.fetch(Cplayers[1]);

                if (matchData.currentMatch[CMatch].started == false) {

                    var MNumber = CMatch.split("-")

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('Melee-' + MNumber[1])
                                .setLabel('Melee')
                                .setStyle('DANGER'),
                            new MessageButton()
                                .setCustomId('Defense-' + MNumber[1])
                                .setLabel('Defense')
                                .setStyle('SUCCESS'),
                            new MessageButton()
                                .setCustomId('Ranged-' + MNumber[1])
                                .setLabel('Ranged')
                                .setStyle('PRIMARY'),
                        );

                    const embed = new MessageEmbed()
                        .setColor('#4FD100')
                        .setTitle(`ROUND ${matchData.currentMatch[CMatch].round}/Endless`)
                        .setDescription('What would you like to do this round?')
                        .addField(matchData.currentMatch[CMatch].players[Cplayers[0]].name, `${matchData.currentMatch[CMatch].players[Cplayers[0]].wins} points`, true)
                        .addField(matchData.currentMatch[CMatch].players[Cplayers[1]].name, `${matchData.currentMatch[CMatch].players[Cplayers[1]].wins} points`, true)
                        .addField('Melee', 'Get close for an attack.', false)
                        .addField('Ranged', 'Attack from afar.', false)
                        .addField('Defense', 'Defend yourself from an attack.', false)
                        .setTimestamp();

                    console.log(Cplayers)
                    console.log(matchData.currentMatch[CMatch])

                    try {
                        Cuser1.send({ embeds: [embed], components: [row] });
                        Cuser2.send({ embeds: [embed], components: [row] });
                    } catch (error) {
                        console.log(error)
                    }

                    const embed2 = new MessageEmbed()
                        .setColor('#5CE30D')
                        .setTitle(`Game Started!`)
                        .setDescription(`${matchData.currentMatch[CMatch].players[Cplayers[0]].name} VS ${matchData.currentMatch[CMatch].players[Cplayers[1]].name}`)
                        .setTimestamp();

                    client.channels.cache.get(arenaChannel).send({ embeds: [embed2] });

                    matchData.currentMatch[CMatch].started = true;

                    try {
                        fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else {

                    // Next Round-------------------------------------------------------------------------------

                    if (matchData.currentMatch[CMatch].roundFinished == true) {

                        matchData.currentMatch[CMatch].round += 1
                        matchData.currentMatch[CMatch].players[Cplayers[0]].selectedAttack = "false"
                        matchData.currentMatch[CMatch].players[Cplayers[1]].selectedAttack = "false"

                        var MNumber = CMatch.split("-")

                        const row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setCustomId('Melee-' + MNumber[1])
                                    .setLabel('Melee')
                                    .setStyle('DANGER'),
                                new MessageButton()
                                    .setCustomId('Defense-' + MNumber[1])
                                    .setLabel('Defense')
                                    .setStyle('SUCCESS'),
                                new MessageButton()
                                    .setCustomId('Ranged-' + MNumber[1])
                                    .setLabel('Ranged')
                                    .setStyle('PRIMARY'),
                            );

                        const embed = new MessageEmbed()
                            .setColor('#4FD100')
                            .setTitle(`ROUND ${matchData.currentMatch[CMatch].round}/Endless`)
                            .setDescription('What would you like to do this round?')
                            .addField(matchData.currentMatch[CMatch].players[Cplayers[0]].name, `${matchData.currentMatch[CMatch].players[Cplayers[0]].wins} points`, true)
                            .addField(matchData.currentMatch[CMatch].players[Cplayers[1]].name, `${matchData.currentMatch[CMatch].players[Cplayers[1]].wins} points`, true)
                            .addField('Melee', 'Get close for an attack.', false)
                            .addField('Ranged', 'Attack from afar.', false)
                            .addField('Defense', 'Defend yourself from an attack.', false)
                            .setTimestamp();

                        try {
                            Cuser1.send({ embeds: [embed], components: [row] });
                            Cuser2.send({ embeds: [embed], components: [row] });
                        } catch (error) {
                            console.log(error)
                        }

                        matchData.currentMatch[CMatch].roundFinished = false;

                        try {
                            fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }

                        // Next Round-------------------------------------------------------------------------------

                    } else {

                        // End Round-------------------------------------------------------------------------------

                        if (matchData.currentMatch[CMatch].players[Cplayers[0]].selectedAttack == "false" || matchData.currentMatch[CMatch].players[Cplayers[1]].selectedAttack == "false") {
                            SendCanceled(Cuser1, Cuser2, CMatch)
                            Canceled = true;
                            EMatches.push(CMatch)

                            delete matchData.currentMatch[CMatch]

                            try {
                                fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                            } catch (e) {
                                console.log(e);
                                return;
                            }
                        }

                        if (Canceled != true) {
                            //Checking results ------------------
                            if (matchData.currentMatch[CMatch].players[Cplayers[0]].chosenAttack == matchData.currentMatch[CMatch].players[Cplayers[1]].chosenAttack) {
                                SendTieResults(Cuser1, Cuser2, CMatch)
                            }//Game is a tie

                            if (matchData.currentMatch[CMatch].players[Cplayers[0]].chosenAttack == "Ranged" && matchData.currentMatch[CMatch].players[Cplayers[1]].chosenAttack == "Defense") {
                                SendWinResults(Cuser1, Cuser2, CMatch)
                            } //Player 1 wins with Ranged

                            else if (matchData.currentMatch[CMatch].players[Cplayers[0]].chosenAttack == "Melee" && matchData.currentMatch[CMatch].players[Cplayers[1]].chosenAttack == "Ranged") {
                                SendWinResults(Cuser1, Cuser2, CMatch)
                            } //Player 1 wins with Melee

                            else if (matchData.currentMatch[CMatch].players[Cplayers[0]].chosenAttack == "Defense" && matchData.currentMatch[CMatch].players[Cplayers[1]].chosenAttack == "Melee") {
                                SendWinResults(Cuser1, Cuser2, CMatch)
                            } //Player 1 wins with Defense



                            else if (matchData.currentMatch[CMatch].players[Cplayers[1]].chosenAttack == "Ranged" && matchData.currentMatch[CMatch].players[Cplayers[0]].chosenAttack == "Defense") {
                                SendWinResults(Cuser2, Cuser1, CMatch)
                            } //Player 2 wins with Ranged

                            else if (matchData.currentMatch[CMatch].players[Cplayers[1]].chosenAttack == "Melee" && matchData.currentMatch[CMatch].players[Cplayers[0]].chosenAttack == "Ranged") {
                                SendWinResults(Cuser2, Cuser1, CMatch)
                            } //Player 2 wins with Melee

                            else if (matchData.currentMatch[CMatch].players[Cplayers[1]].chosenAttack == "Defense" && matchData.currentMatch[CMatch].players[Cplayers[0]].chosenAttack == "Melee") {
                                SendWinResults(Cuser2, Cuser1, CMatch)
                            } //Player 2 wins with Defense

                            //Checking results ------------------



                            //Checking for win --------------------

                            console.log(matchData.currentMatch[CMatch].players[Cplayers[1]].wins)
                            console.log(matchData.currentMatch[CMatch].players[Cplayers[0]].wins)

                            if (matchData.currentMatch[CMatch].players[Cplayers[1]].wins >= 2 || matchData.currentMatch[CMatch].players[Cplayers[0]].wins >= 2) {
                                if (matchData.currentMatch[CMatch].players[Cplayers[0]].wins - matchData.currentMatch[CMatch].players[Cplayers[1]].wins >= 2) {
                                    //console.log("Win")
                                    SendWinGame(Cuser1, Cuser2, CMatch)
                                } else if (matchData.currentMatch[CMatch].players[Cplayers[1]].wins - matchData.currentMatch[CMatch].players[Cplayers[0]].wins >= 2) {
                                    //console.log("Win")
                                    SendWinGame(Cuser2, Cuser1, CMatch)
                                } else {
                                    //console.log("How did we get here")
                                }
                            } else {
                                //console.log("Not Enough Wins")
                            }

                            //Checking for win --------------------

                        }

                        // End Round-------------------------------------------------------------------------------

                    }
                }
            })

            //Check Games -----------------------------------------------

            //Delete Games ----------------------------------------------

            // EMatches.forEach(Ematch => {

            //     console.log(matchData.currentMatch[Ematch])

            //     delete matchData.currentMatch[Ematch]

            //     try {
            //         fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
            //     } catch (e) {
            //         console.log(e);
            //         return;
            //     }
            // })

            //Delete Games ----------------------------------------------

            //Let them know game is starting. Start new game from queue ---------------------------------

            if (Object.keys(matchData.currentQueue).length >= 2) {
                var keys = Object.keys(matchData.currentQueue)

                var matchkeys = Object.keys(matchData.currentMatch)
                var matchNumber = matchkeys.length + 1 //Change Below to match-number
                while (matchData.currentMatch["match" + matchNumber]) {
                    matchNumber += 1
                }
                matchData.currentMatch["match-" + matchNumber] = { round: 1, started: false, roundFinished: false, players: { [keys[0]]: { name: matchData.currentQueue[keys[0]].name, selectedAttack: "false", chosenAttack: "None", wins: 0 }, [keys[1]]: { name: matchData.currentQueue[keys[1]].name, selectedAttack: "false", chosenAttack: "None", wins: 0 } } }
                matchkeys = Object.keys(matchData.currentMatch)
                delete matchData.currentQueue[keys[0]];
                delete matchData.currentQueue[keys[1]];

                //matchData.currentMatch.finished = false

                //                                      Change Below to match-number
                var newKeys = Object.keys(matchData.currentMatch["match-" + matchNumber].players)

                try {
                    fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }

                const userA1 = await client.users.fetch(newKeys[0]);
                const userA2 = await client.users.fetch(newKeys[1]);

                try {
                    userA1.send("Your match will begin in 10 seconds.");
                    userA2.send("Your match will begin in 10 seconds.");
                } catch (error) {
                    console.log(error)
                    return;
                }
            }

            //Let them know game is starting. Start new game from queue ---------------------------------
        }

        function SendWinGame(winner, loser, match) {
            PData.players[winner.id].wins += 1
            PData.players[winner.id].tokens += 12
            PData.players[loser.id].loses += 1
            PData.players[loser.id].gamesPlayed += 1
            PData.players[winner.id].gamesPlayed += 1
            if(!PData.players[winner.id].faction == "0"){
                facData.factions[PData.players[winner.id].faction].stats.gamesPlayed += 1
                facData.factions[PData.players[winner.id].faction].stats.wins += 1
            }

            if(!PData.players[loser.id].faction == "0"){
                facData.factions[PData.players[loser.id].faction].stats.gamesPlayed += 1
                facData.factions[PData.players[loser.id].faction].stats.loses += 1
            }
            

            if (Config.eventStart) {
                PData.players[winner.id].event.wins += 1
                PData.players[loser.id].event.loses += 1
                PData.players[loser.id].event.gamesPlayed += 1
                PData.players[winner.id].event.gamesPlayed += 1

                if(!PData.players[winner.id].faction == "0"){
                    facData.factions[PData.players[winner.id].faction].stats.event.gamesPlayed += 1
                    facData.factions[PData.players[winner.id].faction].stats.event.wins += 1
                }
    
                if(!PData.players[loser.id].faction == "0"){
                    facData.factions[PData.players[loser.id].faction].stats.event.gamesPlayed += 1
                    facData.factions[PData.players[loser.id].faction].stats.event.loses += 1
                }
            }

            const embed = new MessageEmbed()
                .setColor('#00CCE8')
                .setTitle(`${matchData.currentMatch[match].players[winner.id].name} WON THE GAME!`)
                .setDescription(`Congrats!`)
                .addField(matchData.currentMatch[match].players[winner.id].name, `${matchData.currentMatch[match].players[winner.id].wins} points`, true)
                .addField(matchData.currentMatch[match].players[loser.id].name, `${matchData.currentMatch[match].players[loser.id].wins} points`, true)
                .setTimestamp();

            winner.send({ embeds: [embed] });
            loser.send({ embeds: [embed] });
            client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

            EMatches.push(match)

            delete matchData.currentMatch[match]

            if (PData.players[winner.id].naut.hp <= 0) {
                client.channels.cache.get(arenaChannel).send({ content: `${winner}, *Your boxnaut suddenly collapses and crumbles into elemental dust.*` });
                client.channels.cache.get(arenaMainChannel).send({ content: `${winner}, *Your boxnaut suddenly collapses and crumbles into elemental dust.*` });
                delete PData.players[winner.id].naut;
                //PData.players[winner.id].name = message.member.displayName.toString()
            }

            if (PData.players[loser.id].naut.hp <= 0) {
                client.channels.cache.get(arenaChannel).send({ content: `${loser}, *Your boxnaut suddenly collapses and crumbles into elemental dust.*` });
                client.channels.cache.get(arenaMainChannel).send({ content: `${loser}, *Your boxnaut suddenly collapses and crumbles into elemental dust.*` });
                delete PData.players[loser.id].naut;
                //PData.players[loser.id].name = message.member.displayName.toString()
            }

            try {
                fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
        }

        function SendWinResults(winner, loser, match) {
            matchData.currentMatch[match].players[winner.id].wins += 1
            PData.players[loser.id].naut.hp -= 1
            PData.players[winner.id].tokens += 2

            const embed = new MessageEmbed()
                .setColor('#E8D300')
                .setTitle(`ROUND ${matchData.currentMatch[match].round}/Endless - RESULTS`)
                .setDescription(`${matchData.currentMatch[match].players[winner.id].name} used ${attacks[PData.players[winner.id].naut.type][matchData.currentMatch[match].players[winner.id].chosenAttack]} and won the round!`)
                .addField(matchData.currentMatch[match].players[winner.id].name, `${matchData.currentMatch[match].players[winner.id].wins} points`, true)
                .addField(matchData.currentMatch[match].players[loser.id].name, `${matchData.currentMatch[match].players[loser.id].wins} points`, true)
                .setTimestamp();

            winner.send({ content: "Round Ended!", embeds: [embed] });
            loser.send({ content: "Round Ended!", embeds: [embed] });
            client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

            matchData.currentMatch[match].roundFinished = true;

            try {
                fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
                fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
        }

        function SendTieResults(puser1, puser2, match) {
            const embed = new MessageEmbed()
                .setColor('#E8D300')
                .setTitle(`ROUND ${matchData.currentMatch[match].round}/Endless - RESULTS - TIED`)
                .setDescription('You both selected the same move and tied!')
                .addField(matchData.currentMatch[match].players[puser1.id].name, `${matchData.currentMatch[match].players[puser1.id].wins} points`, true)
                .addField(matchData.currentMatch[match].players[puser2.id].name, `${matchData.currentMatch[match].players[puser2.id].wins} points`, true)
                .setTimestamp();

            puser1.send({ content: "Round Ended!", embeds: [embed] });
            puser2.send({ content: "Round Ended!", embeds: [embed] });
            client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

            matchData.currentMatch[match].roundFinished = true;

            try {
                fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
        }

        function SendCanceled(puser1, puser2, match) {

            if (matchData.currentMatch[match].round >= 2) {
                if (matchData.currentMatch[match].players[puser1.id].wins - matchData.currentMatch[match].players[puser2.id].wins >= 1 && matchData.currentMatch[match].players[puser1.id].selectedAttack == "true") {
                    PData.players[puser1.id].wins += 1
                    PData.players[puser1.id].tokens += 12
                    PData.players[puser2.id].loses += 1
                    PData.players[puser2.id].gamesPlayed += 1
                    PData.players[puser1.id].gamesPlayed += 1

                    if(!PData.players[puser1.id].faction == "0"){
                        facData.factions[PData.players[puser1.id].faction].stats.gamesPlayed += 1
                        facData.factions[PData.players[puser1.id].faction].stats.wins += 1
                    }
        
                    if(!PData.players[puser2.id].faction == "0"){
                        facData.factions[PData.players[puser2.id].faction].stats.gamesPlayed += 1
                        facData.factions[PData.players[puser2.id].faction].stats.loses += 1
                    }

                    if (Config.eventStart) {
                        PData.players[puser1.id].event.wins += 1
                        PData.players[puser2.id].event.loses += 1
                        PData.players[puser2.id].event.gamesPlayed += 1
                        PData.players[puser1.id].event.gamesPlayed += 1

                        if(!PData.players[puser1.id].faction == "0"){
                            facData.factions[PData.players[puser1.id].faction].stats.event.gamesPlayed += 1
                            facData.factions[PData.players[puser1.id].faction].stats.event.wins += 1
                        }
            
                        if(!PData.players[puser2.id].faction == "0"){
                            facData.factions[PData.players[puser2.id].faction].stats.event.gamesPlayed += 1
                            facData.factions[PData.players[puser2.id].faction].stats.event.loses += 1
                        }
                    }

                    const embed = new MessageEmbed()
                        .setColor('#00CCE8')
                        .setTitle(`Match Canceled but ${matchData.currentMatch[match].players[puser1.id].name} WON THE GAME!`)
                        .setDescription(`Congrats!`)
                        .addField(matchData.currentMatch[match].players[puser1.id].name, `${matchData.currentMatch[match].players[puser1.id].wins} points`, true)
                        .addField(matchData.currentMatch[match].players[puser2.id].name, `${matchData.currentMatch[match].players[puser2.id].wins} points`, true)
                        .addField(matchData.currentMatch[match].players[puser1.id].name, `${matchData.currentMatch[match].players[puser1.id].selectedAttack} - Selected`, true)
                        .addField(matchData.currentMatch[match].players[puser2.id].name, `${matchData.currentMatch[match].players[puser2.id].selectedAttack} - Selected`, true)
                        .setTimestamp();

                    puser1.send({ embeds: [embed] });
                    puser2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    try {
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else if (matchData.currentMatch[match].players[puser2.id].wins - matchData.currentMatch[match].players[puser1.id].wins >= 1 && matchData.currentMatch[match].players[puser2.id].selectedAttack == "true") {
                    PData.players[puser2.id].wins += 1
                    PData.players[puser2.id].tokens += 12
                    PData.players[puser1.id].loses += 1
                    PData.players[puser1.id].gamesPlayed += 1
                    PData.players[puser2.id].gamesPlayed += 1

                    if(!PData.players[puser2.id].faction == "0"){
                        facData.factions[PData.players[puser2.id].faction].stats.gamesPlayed += 1
                        facData.factions[PData.players[puser2.id].faction].stats.wins += 1
                    }
        
                    if(!PData.players[puser1.id].faction == "0"){
                        facData.factions[PData.players[puser1.id].faction].stats.gamesPlayed += 1
                        facData.factions[PData.players[puser1.id].faction].stats.loses += 1
                    }

                    if (Config.eventStart) {
                        PData.players[puser2.id].event.wins += 1
                        PData.players[puser1.id].event.loses += 1
                        PData.players[puser1.id].event.gamesPlayed += 1
                        PData.players[puser2.id].event.gamesPlayed += 1

                        if(!PData.players[puser2.id].faction == "0"){
                            facData.factions[PData.players[puser2.id].faction].stats.event.gamesPlayed += 1
                            facData.factions[PData.players[puser2.id].faction].stats.event.wins += 1
                        }
            
                        if(!PData.players[puser1.id].faction == "0"){
                            facData.factions[PData.players[puser1.id].faction].stats.event.gamesPlayed += 1
                            facData.factions[PData.players[puser1.id].faction].stats.event.loses += 1
                        }
                    }

                    const embed = new MessageEmbed()
                        .setColor('#00CCE8')
                        .setTitle(`Match Canceled but ${matchData.currentMatch[match].players[puser2.id].name} WON THE GAME!`)
                        .setDescription(`Congrats!`)
                        .addField(matchData.currentMatch[match].players[puser1.id].name, `${matchData.currentMatch[match].players[puser1.id].wins} points`, true)
                        .addField(matchData.currentMatch[match].players[puser2.id].name, `${matchData.currentMatch[match].players[puser2.id].wins} points`, true)
                        .addField(matchData.currentMatch[match].players[puser1.id].name, `${matchData.currentMatch[match].players[puser1.id].selectedAttack} - Selected`, true)
                        .addField(matchData.currentMatch[match].players[puser2.id].name, `${matchData.currentMatch[match].players[puser2.id].selectedAttack} - Selected`, true)
                        .setTimestamp();

                    puser1.send({ embeds: [embed] });
                    puser2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });

                    try {
                        fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                    } catch (e) {
                        console.log(e);
                        return;
                    }
                } else {
                    const embed = new MessageEmbed()
                        .setColor('#E80000')
                        .setTitle(`Match Canceled`)
                        .setDescription('A player failed to choose an attack!')
                        .addField(matchData.currentMatch[match].players[puser1.id].name, `${matchData.currentMatch[match].players[puser1.id].selectedAttack} - Selected`, true)
                        .addField(matchData.currentMatch[match].players[puser2.id].name, `${matchData.currentMatch[match].players[puser2.id].selectedAttack} - Selected`, true)
                        .setTimestamp();

                    puser1.send({ embeds: [embed] });
                    puser2.send({ embeds: [embed] });
                    client.channels.cache.get(arenaChannel).send({ embeds: [embed] });
                }

                if (PData.players[puser1.id].naut && PData.players[puser1.id].naut.hp <= 0) {
                    client.channels.cache.get(arenaChannel).send({ content: `${puser1}, *Your boxnaut suddenly collapses and crumbles into elemental dust.*` });
                    client.channels.cache.get(arenaMainChannel).send({ content: `${puser1}, *Your boxnaut suddenly collapses and crumbles into elemental dust.*` });
                    delete PData.players[puser1.id].naut;
                    //PData.players[winner.id].name = message.member.displayName.toString()
                }
    
                if (PData.players[puser2.id].naut && PData.players[puser2.id].naut.hp <= 0) {
                    client.channels.cache.get(arenaChannel).send({ content: `${puser2}, *Your boxnaut suddenly collapses and crumbles into elemental dust.*` });
                    client.channels.cache.get(arenaMainChannel).send({ content: `${puser2}, *Your boxnaut suddenly collapses and crumbles into elemental dust.*` });
                    delete PData.players[puser2.id].naut;
                    //PData.players[puser2.id].name = message.member.displayName.toString()
                }
    
                try {
                    fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }
            } else {
                const embed = new MessageEmbed()
                    .setColor('#E80000')
                    .setTitle(`Match Canceled`)
                    .setDescription('A player failed to choose an attack!')
                    .addField(matchData.currentMatch[match].players[puser1.id].name, `${matchData.currentMatch[match].players[puser1.id].selectedAttack} - Selected`, true)
                    .addField(matchData.currentMatch[match].players[puser2.id].name, `${matchData.currentMatch[match].players[puser2.id].selectedAttack} - Selected`, true)
                    .setTimestamp();

                puser1.send({ embeds: [embed] });
                puser2.send({ embeds: [embed] });
                client.channels.cache.get(arenaChannel).send({ embeds: [embed] });
            }
        }

        return;

        setTimeout(roundStart, 10000); //Set Timer to end

        var MatchNumber = matchNumber

        var round = 0

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
                .setTitle(`ROUND ${round}/5`)
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

            setTimeout(function () { }, 500); //Set Timer to end

            var TimerEnded = false;

            setTimeout(function () { TimerEnded = true; }, 15000); //Set Timer to end

            while (matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack != "true" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack != "true" && TimerEnded == false) {
                setTimeout(function () { }, 5000); //Set Timer to end

                //console.log("Testing")

                matchData;
                //var PData;
                try {
                    matchData = JSON.parse(fs.readFileSync("./Arena/Match.json", "utf8"))
                    //PData = JSON.parse(fs.readFileSync("./Arena/PData.json", "utf8"))
                } catch (e) {
                    console.log(e);
                    return;
                }
            }

            roundEnd()

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
                        .setTitle(`ROUND ${round}/5 - RESULTS - TIED`)
                        .setDescription('You both selected the same move and tied!')
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Defense" && matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Melee") {
                    //Player 1 wins
                    matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins += 1
                    PData.players[keys[1]].naut.hp -= 1

                    const embed = new MessageEmbed()
                        .setColor('#E8D300')
                        .setTitle(`ROUND ${round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });

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
                        .setTitle(`ROUND ${round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });

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
                        .setTitle(`ROUND ${round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[0]].name} used ${attacks[PData.players[keys[0]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });

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
                        .setTitle(`ROUND ${round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });

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
                        .setTitle(`ROUND ${round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack == "Melee" && matchData.currentMatch["match" + MatchNumber].players[keys[0]].chosenAttack == "Ranged") {
                    //Player 2 wins
                    matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins += 1
                    PData.players[keys[0]].naut.hp -= 1

                    const embed = new MessageEmbed()
                        .setColor('#E8D300')
                        .setTitle(`ROUND ${round}/5 - RESULTS`)
                        .setDescription(`${matchData.currentMatch["match" + MatchNumber].players[keys[1]].name} used ${attacks[PData.players[keys[1]].naut.type][matchData.currentMatch["match" + MatchNumber].players[keys[1]].chosenAttack]} and won the round!`)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[0]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins} points`, true)
                        .addField(matchData.currentMatch["match" + MatchNumber].players[keys[1]].name, `${matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins} points`, true)
                        .setTimestamp();

                    user1.send({ embeds: [embed] });
                    user2.send({ embeds: [embed] });

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

                setTimeout(function () { }, 500); //Wait for next message

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

                if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins > matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins && matchData.currentMatch["match" + MatchNumber].players[keys[1]].selectedAttack == "true" && round != 1) {
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
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins < matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins && matchData.currentMatch["match" + MatchNumber].players[keys[0]].selectedAttack == "true" && round != 1) {
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
                } else if (matchData.currentMatch["match" + MatchNumber].players[keys[1]].wins == matchData.currentMatch["match" + MatchNumber].players[keys[0]].wins && round != 1) {
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
            }

            matchData.currentMatch["match" + MatchNumber].round += 1
            round = matchData.currentMatch["match" + MatchNumber].round

            try {
                fs.writeFileSync('./Arena/Match.json', JSON.stringify(matchData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }

            //round += 1

            if (round <= 5 && failed != true && won != true) { //THIS WILL MOVE TO THE CHECK INSTEAD
                setTimeout(roundStart, 8000); //Round Start
            } else {
                if (round >= 6 && failed != true && won != true) {
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
        //-------------------------------------------------------------------------------//

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