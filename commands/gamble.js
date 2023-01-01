const { Client, MessageEmbed, Collection, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'gamble',
    description: "all gambling commands",
    guilds: [
        "919659368021114940",//Boxnauts Testing
    ],

    async run(message, args, client, Discord) {

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const log = await requireUncached(`../utilities/logging`);

        // const TheMan = 398907393427243008
        // if (message.author.id != TheMan) {
        //     return message.reply("You do not have permission!");
        // }

        if (message.guild == null) {
            message.reply("Not allowed in dm's.")
            return;
        }

        if (message.channel.id != '954077618783797268') {
            message.reply("Please use the correct channel for this command!")
            return;
        }

        if(!args[1]){
            message.reply("Unknown command! Use *Gamble Help")
            return;
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

        if (args[1].toLowerCase() == "coinflip") {
            if (args[2] && args[3]) {

                min = 1
                max = 50

                multi = 1.1

                rand = Math.floor(Math.random() * (max - min + 1)) + min;

                if (!Number.isInteger(parseInt(args[3]))) {
                    message.reply("Amount MUST be a number! *Gamble Coinflip (Heads/Tails) (Amount)");
                    return;
                }

                if(Math.ceil(parseInt(args[3])) > parseInt(PData.players[message.author.id].tokens)){
                    message.reply("You dont have enough tokens to gamble that amount!")
                    return;
                }

                if(parseInt(args[3]) <= 0){
                    message.reply("Bet MUST be greater than 0!")
                    return;
                }

                if (args[2].toLowerCase() == "heads") {
                    if (rand <= 25) {//Heads
                        PData.players[message.author.id].tokens += Math.ceil(Math.ceil(parseInt(args[3])) * multi)

                        const embed = new MessageEmbed()
                            .setColor('#3DE800')
                            .setTitle(`The coin landed on heads!`)
                            .addField('You have won:', `${Math.ceil(Math.ceil(parseInt(args[3])) * multi)} Arena Tokens`, true)
                            .addField('Your Balance:', `${PData.players[message.author.id].tokens} Arena Tokens`, true)
                            .setTimestamp()
                            .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                        message.reply({ embeds: [embed] });

                        try {
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }

                        return;
                    } else if (rand <= 50) {//Tails
                        PData.players[message.author.id].tokens -= Math.ceil(parseInt(args[3]))

                        const embed = new MessageEmbed()
                            .setColor('#C11700')
                            .setTitle(`The coin landed on tails!`)
                            .addField('You have lost:', `${Math.ceil(parseInt(args[3]))} Arena Tokens`, true)
                            .addField('Your Balance:', `${PData.players[message.author.id].tokens} Arena Tokens`, true)
                            .setTimestamp()
                            .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                        message.reply({ embeds: [embed] });

                        try {
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }

                        return;
                    }
                } else if (args[2].toLowerCase() == "tails") {
                    if (rand <= 25) {//Heads
                        PData.players[message.author.id].tokens -= Math.ceil(parseInt(args[3]))

                        const embed = new MessageEmbed()
                            .setColor('#C11700')
                            .setTitle(`The coin landed on heads!`)
                            .addField('You have lost:', `${Math.ceil(parseInt(args[3]))} Arena Tokens`, true)
                            .addField('Your Balance:', `${PData.players[message.author.id].tokens} Arena Tokens`, true)
                            .setTimestamp()
                            .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                        message.reply({ embeds: [embed] });

                        try {
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }

                        return;
                    } else if (rand <= 50) {//Tails
                        PData.players[message.author.id].tokens += Math.ceil(Math.ceil(parseInt(args[3])) * multi)

                        const embed = new MessageEmbed()
                            .setColor('#3DE800')
                            .setTitle(`The coin landed on tails!`)
                            .addField('You have won:', `${Math.ceil(Math.ceil(parseInt(args[3])) * multi)} Arena Tokens`, true)
                            .addField('Your Balance:', `${PData.players[message.author.id].tokens} Arena Tokens`, true)
                            .setTimestamp()
                            .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

                        message.reply({ embeds: [embed] });

                        try {
                            fs.writeFileSync('./Arena/PData.json', JSON.stringify(PData, null, 2), 'utf8')
                        } catch (e) {
                            console.log(e);
                            return;
                        }

                        return;
                    }

                } else {
                    message.reply("Not a valid side! *Gamble Coinflip (Heads/Tails) (Amount)")
                    return;
                }
            }
        }

        if (args[1].toLowerCase() == "help") {
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Gamble Commands | ( ) Required < > Optional`)
                .setDescription(`All currently available gamble commands.`)
                .addField('Basic Commands', '*Gamble Help - Lists all commands.', true)
                .addField('Gamble Commands', '*Gamble Coinflip (Heads/Tails) (Amount) - Do a coinflip.', true)
                .addField('Stats Commands', '*Arena Tokens <Person> - View your/persons token balance.\n*Arena Tip (Amount) (Person) - Tip some tokens to a friend!', true)
                .setTimestamp()
                .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

            message.reply({ embeds: [embed] });
            return;
        }

        return;
    }
}