module.exports = {
    name: 'boxnaut',
    description: "gives a random boxnaut",
    guilds: [
        "887226341429231648",//Boxnauts
        "919659368021114940",//Boxnauts Testing
    ],

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

        var fs = require('fs');
        var files = fs.readdirSync('./boxnaut/');
        const { Client, RichEmbed, Collection, MessageAttachment } = require('discord.js');

        if (message.guild == null) {
            message.reply("Not allowed in dm's.")
            return;
        }

        if(message.channel.id == "938665699021324318"){
            message.reply("I think the command you are looking for is *Arena Boxnaut.")
            return;
        }

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        rnd = getRandomInt(files.length-1)

        const attachment = new MessageAttachment('./boxnaut/image' + rnd + '.gif', 'image.gif');

        const exampleEmbed = {
            title: `**Random Boxnaut Image #**`,
            description: rnd,
            color: 0xff9500,
            image: {
                url: 'attachment://image.gif',
            },
        };

        await message.channel.send({
            //content: '**You got Boxnaut #' + rnd + "**",
            embeds: [exampleEmbed],
            files: [attachment]
        });

        //const attachment = new MessageAttachment('./comet/image' + rnd + '.png', 'image.png');
        //var embed = {
        //    "title": `You got`,
        //    "description": 'Comet #' + rnd,
        //    "color": 0xff9500,
        //	"image": attachment
        //};

        //message.channel.send({ embed });
        log.run('[BOXNAUT] - ' + message.author.username, 1)
        return;
    }
}