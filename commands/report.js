module.exports = {
    name: 'report',
    description: "reports stuff",

    async run(message, args, client) {

        const TheMan = 398907393427243008
        if (message.author.id != TheMan) {
            return message.reply("You do not have permission!");
        }

        const fs = require('fs');
        const path = require('path');

        let fileCount = 0

        let discordFolderPath = `./discord/reports/${args[2]}/`
        let discordFilePath = `./discord/reports/${args[2]}/${fileCount}.txt`

        let minecraftFolderPath = `./minecraft/reports/${args[2]}/`
        let minecraftFilePath = `./minecraft/reports/${args[2]}/${fileCount}.txt`

        try {
            if (args.length >= 4) {
                if (args[1] == "minecraft") {
                    let reason = args.join(" ").slice(args[1].length + args[2].length + args[0].length + 3)
                    if (fs.existsSync(minecraftFolderPath)) {
                        const minecraftFileFiles = fs.readdirSync(minecraftFolderPath).filter(file => file.endsWith('.txt'));
                        for (const file of minecraftFileFiles) {
                            fileCount = fileCount + 1
                        }

                        minecraftFilePath = `./minecraft/reports/${args[2]}/${fileCount}.txt`
                        fs.writeFileSync(minecraftFilePath, reason, function (err) { if (err) console.log(err) });
                        console.log('[Report Submitted] - ' + message.author.username);
                        channel = client.channels.cache.get('787608399000895498')
                        channel.send(message.author.username + " has submitted a report for the user: " + args[2] + " Reasoning: " + reason);
                        message.reply('Your report was successfully submitted and staff has been notified.');
                    }
                    else {
                        fs.mkdirSync(minecraftFolderPath);
                        fs.writeFileSync(minecraftFilePath, reason);
                        console.log('[Report Submitted] - ' + message.author.username);
                        channel = client.channels.cache.get('787608399000895498')
                        channel.send(message.author.username + " has submitted a report for the user: " + args[2] + " Reasoning: " + reason);
                        message.reply('Your report was successfully submitted and staff has been notified.');
                    }
                }
                else if (args[1] == "discord") {
                    let reason = args.join(" ").slice(args[1].length + args[2].length + args[0].length + 3)
                    if (fs.existsSync(discordFolderPath)) {
                        const discordFileFiles = fs.readdirSync(discordFolderPath).filter(file => file.endsWith('.txt'));
                        for (const file of discordFileFiles) {
                            fileCount = fileCount + 1
                        }

                        discordFilePath = `./discord/reports/${args[2]}/${fileCount}.txt`
                        fs.writeFileSync(discordFilePath, reason, function (err) { if (err) console.log(err) });
                        console.log('[Report Submitted] - ' + message.author.username);
                        channel = client.channels.cache.get('787608966368198676')
                        channel.send(message.author.username + " has submitted a report for the user: " + args[2] + " Reasoning: " + reason);
                        message.reply('Your report was successfully submitted and staff has been notified.');
                    }
                    else {
                        fs.mkdirSync(discordFolderPath);
                        fs.writeFileSync(discordFilePath, reason);
                        console.log('[Report Submitted] - ' + message.author.username);
                        channel = client.channels.cache.get('787608966368198676')
                        channel.send(message.author.username + " has submitted a report for the user: " + args[2] + " Reasoning: " + reason);
                        message.reply('Your report was successfully submitted and staff has been notified.');
                    }
                }
                else {
                    message.reply('Your report is not formatted correctly! Please use /Report (discord/minecraft) (Username) (Reason)');
                }
            }
            else {
                message.reply('Your report is not formatted correctly! Please use /Report (discord/minecraft) (Username) (Reason)');
            }

        }
        catch (err) {
            console.error(err)
            message.reply('There was an error proccessing your report.');
        }

        console.log('[Report] - ' + message.author.username);
        console.log(' ');
    }
}