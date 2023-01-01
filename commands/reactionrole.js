module.exports = {
    name: 'reactionrole',
    description: "does react role stuff",

    async run(message, args, client) {

        const TheMan = 398907393427243008
        if (message.author.id != TheMan) {
            return message.reply("You do not have permission!");
        }

        const userID = "194576706860875776"
        if (message.author.id === userID){
            // const channel = '865241019862876190';
            // const youtubeNotify = message.guild.roles.cache.find(role => role.name === "Youtube Squad");
            // const twitchNotify = message.guild.roles.cache.find(role => role.name === "Twitch Squad");
            // const allNotify = message.guild.roles.cache.find(role => role.name === "Notification Squad");

            // const youtubeEmoji = client.emojis.cache.find(emoji => emoji.name === "Comet");
            // const twitchEmoji = client.emojis.cache.find(emoji => emoji.name === "CometLogo");
            // const allEmoji = client.emojis.cache.find(emoji => emoji.name === "SquickyToy");

            let reactmessage = await message.channel.messages.fetch("865417850793885696");
            reactmessage.react(allEmoji);
            reactmessage.react(twitchEmoji);
            reactmessage.react(youtubeEmoji);

            // client.on('messageReactionAdd', async (reaction, user) => {
            //     if (reaction.message.partial) await reaction.message.fetch();
            //     if (reaction.partial) await reaction.fetch();
            //     if (user.bot) return;
            //     if (!reaction.message.guild) return;

            //     if(reaction.message.channel.id == channel){
            //         if(reaction.emoji.name === "Comet") {
            //             await reaction.message.guild.members.cache.get(user.id).roles.add(youtubeNotify);
            //         }
            //         if(reaction.emoji.name === "CometLogo") {
            //             await reaction.message.guild.members.cache.get(user.id).roles.add(twitchNotify);
            //         }
            //         if(reaction.emoji.name === "SquickyToy") {
            //             await reaction.message.guild.members.cache.get(user.id).roles.add(allNotify);
            //         }
            //     } else {
            //         return;
            //     }

            // });

            // client.on('messageReactionRemove', async (reaction, user) => {
            //     if (reaction.message.partial) await reaction.message.fetch();
            //     if (reaction.partial) await reaction.fetch();
            //     if (user.bot) return;
            //     if (!reaction.message.guild) return;

            //     if(reaction.message.channel.id == channel){
            //         if(reaction.emoji.name === "Comet") {
            //             await reaction.message.guild.members.cache.get(user.id).roles.remove(youtubeNotify);
            //         }
            //         if(reaction.emoji.name === "CometLogo") {
            //             await reaction.message.guild.members.cache.get(user.id).roles.remove(twitchNotify);
            //         }
            //         if(reaction.emoji.name === "SquickyToy") {
            //             await reaction.message.guild.members.cache.get(user.id).roles.remove(allNotify);
            //         }
            //     } else {
            //         return;
            //     }

            // });
        }
    }

}