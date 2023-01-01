const { Client, MessageEmbed, Collection, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'help',
    description: "lists all commands",
    guilds: [
        "887226341429231648",//Boxnauts
        "919659368021114940",//Boxnauts Testing
        "714696925500145725",//Okami Squadron
        "195687811733651456",//TinyTank800
        "822745002391502849",//Shiko Kiro
        "877646469270736947",//Paper Bag Games
    ],

    async run(message, args, client) {

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const log = await requireUncached(`../utilities/logging`);

        //const TheMan = 398907393427243008
        //if (message.author.id != TheMan) {
        //    return message.reply("You do not have permission!");
        //}

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Commands`)
            .setDescription(`All currently available commands.`)
            .addField('*Boxnaut', 'Random Boxnaut Image.', true)
            .addField('*Gamble Help', 'Gamble commands.', true)
            .addField('*Arena Help', 'Arena commands.', true)
            .addField('*Faction Help', 'Arena commands.', true)
            .setTimestamp()
            .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/954127722555273278/960770815161413682/8-bit_Bot_copy.png' });

        message.reply({ embeds: [embed] });
        log.run('[HELP] - ' + message.author.username, 1)
        return;
    }
}