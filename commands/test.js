const { Client, MessageEmbed, Collection, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const Canvas = require('canvas');

module.exports = {
    name: 'test',
    description: "test command",
    guilds: [
        "919659368021114940",//Boxnauts Testing
    ],

    async run(message, args, client, Discord) {

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const log = await requireUncached(`../utilities/logging`);

        const TheMan = 398907393427243008
        if (message.author.id != TheMan) {
            return message.reply("You do not have permission!");
        }

        const canvas = Canvas.createCanvas(75, 75);
        const context = canvas.getContext('2d');
        const gifdude = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/914959240135835709/958992059560259625/Nomad-Gif.gif`);


        // This uses the canvas dimensions to stretch the image onto the entire canvas
        context.drawImage(gifdude, 0, 0, canvas.width, canvas.height);

        const attachment = new MessageAttachment('https://cdn.discordapp.com/attachments/914959240135835709/958992059560259625/Nomad-Gif.gif', 'naut.gif');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Bought boxnaut`)
            .setDescription(`You have purchased a botnaut and got:`)
            .addField('Rarity', "rarity", true)
            .addField('Hp', "hp.toString()", true)
            .addField('Element', "element.toString()", true)
            .setImage('attachment://naut.png')
            .setTimestamp()
            .setFooter({ text: 'Botnaut', iconURL: 'https://cdn.discordapp.com/attachments/315537267693191169/943036107380121670/Botnaut_copy.png' });

        if (1 == 666) {
            embed.addField('Type', `RandNaut[0] Godnaut`, true)
        } else {
            embed.addField('Type', `RandNaut[0]`, true)
        }

        message.reply({ embeds: [embed], files: [attachment] });

        return;

        const attacks = {
            Fire: {
                Melee: "Fireball",
                Defense: "Blast Wave",
                Ranged: "Scorch"
            },
            Void: {
                Melee: "Void Force",
                Defense: "Cursed Nightmare",
                Ranged: "Warp Slam"
            },
            Rock: {
                Melee: "Spike Strip",
                Defense: "Diamond Shell",
                Ranged: "Magma Missle"
            },
            Zombie: {
                Melee: "Toxic Ooze",
                Defense: "Resurrection",
                Ranged: "Fiery Chop"
            },
            Electric: {
                Melee: "Electric Pulse",
                Defense: "Magnetic Shield",
                Ranged: "Thunderfury"
            },
            Nature: {
                Melee: "Pod Shot",
                Defense: "Spirit Block",
                Ranged: "Moon Beam"
            },
            Air: {
                Melee: "Ancient Winds",
                Defense: "Storm Shield",
                Ranged: "Hurricane"
            },
            Water: {
                Melee: "Water Cannon",
                Defense: "Hyrdo Shell",
                Ranged: "Mud Gun"
            },
            Poison: {
                Melee: "Toxic Sting",
                Defense: "Acid Smog",
                Ranged: "Devastating Rend"
            },
            PSYCHIC: {
                Melee: "Eerie Pulse",
                Defense: "Lunar Defence",
                Ranged: "Psycho Force"
            },
        };

        console.log(attacks.Fire.Attack)
        console.log(attacks.Void.Attack)
        //message.reply("Fire Types Attack: " + attacks.Fire.Attack)

        //var fs = require('fs');
        //var files = fs.readdirSync('./boxnaut/');


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

        //const embed = new MessageEmbed()
            //.setColor('#0099ff')
            //.setTitle('What do you want to do this round?')
            //.setDescription('Idk something cool');

        //message.reply({ content: 'ROUND 1!', ephemeral: true, embeds: [embed], components: [row] });

        // function getRandomInt(max) {
        //     return Math.floor(Math.random() * max);
        // }

        // rnd = getRandomInt(files.length-1)

        // const attachment = new MessageAttachment('./boxnaut/image' + rnd + '.gif', 'image.gif');

        // const exampleEmbed = {
        //     title: `**Random Boxnaut Image #**`,
        //     description: rnd,
        //     color: 0xff9500,
        //     image: {
        //         url: 'attachment://image.gif',
        //     },
        // };

        // await message.channel.send({
        //     //content: '**You got Boxnaut #' + rnd + "**",
        //     embed: exampleEmbed,
        //     files: [attachment]
        // });

        //const attachment = new MessageAttachment('./comet/image' + rnd + '.png', 'image.png');
        //var embed = {
        //    "title": `You got`,
        //    "description": 'Comet #' + rnd,
        //    "color": 0xff9500,
        //	"image": attachment
        //};

        //message.channel.send({ embed });
        log.run('[TEST] - ' + message.author.username, 1)
        return;
    }
}