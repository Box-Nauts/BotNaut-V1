module.exports = {
    name: 'permissions',
    description: "Setup/update permissions",

    async run(message, args, client) {

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }
    
        const log = await requireUncached(`./utilities/logging`);

        const TheMan = 398907393427243008
        if (message.author.id != TheMan) {
            return message.reply("You do not have permission!");
        }

        const fs = require('fs');
        const path = require('path');

        function muteTextChannel(message) {
            //let channel = message.channel;
            let roles = message.guild.roles; // collection
        
            // find specific role - enter name of a role you create here
            let testRole = roles.cache.find(r => r.id === '914968258837356584');
        
            // overwrites 'SEND_MESSAGES' role, only on this specific channel
            channel.overwritePermissions(
                testRole,
                { 'SEND_MESSAGES': false },
                // optional 'reason' for permission overwrite
                'Muting Text'
            )
            // handle responses / errors
            .then(console.log)
            .catch(console.log);
        }

        function muteVoiceChannel(message,channel) {
            //let channel = message.channel;
            let roles = message.guild.roles; // collection
        
            // find specific role - enter name of a role you create here
            let testRole = roles.cache.find(r => r.id === '914968258837356584');
        
            // overwrites 'SEND_MESSAGES' role, only on this specific channel
            channel.overwritePermissions(
                testRole,
                { 'CAN_SPEAK': false },
                // optional 'reason' for permission overwrite
                'Muting Voice'
            )
            // handle responses / errors
            .then(console.log)
            .catch(console.log);
        }

        message.guild.channels.cache.forEach((channel)=>{
            if(channel.type === 'voice'){
                muteVoiceChannel(message,channel);
            } else if (channel.type === 'text'){
                muteTextChannel(message,channel);
                
            }
           })

        log.run('[TEST] - ' + message.author.username,1)

        return;
    }
}