module.exports = {
    name: 'reload',
    description: "reload all commands",
    guilds: [
        "887226341429231648",//Boxnauts
        "919659368021114940",//Boxnauts Testing
        "714696925500145725",//Okami Squadron
        "195687811733651456",//TinyTank800
        "822745002391502849",//Shiko Kiro
        "877646469270736947",//Paper Bag Games
    ],

    async run(message, args, client) {

        const fs = require('fs');

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }
    
        const log = await requireUncached(`../utilities/logging`);

        const TheMan = 398907393427243008
        if (message.author.id != TheMan) {
            return message.reply("You do not have permission!");
        }

        var count = 0
        var commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            try {
                delete require.cache[require.resolve(`./${file}`)];
                client.commands.delete(file.slice(0, file.length - 3))
                const pull = require(`./${file}`)
                client.commands.set(file.slice(0, file.length - 3), pull)
                log.run('[MODULE RELOADED] - ' + file + " - " + message.author.username, 1)
                count++
            } catch (error) {
                log.run('[MODULES NOT RELOADED] - ' + error, 1)
            }
        }

        message.reply(count + " Modules reloaded!")
        return;
    }
}