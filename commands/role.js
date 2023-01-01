module.exports = {
    name: 'role',
    description: "does role stuff",

    async run(message, args, client) {

        const TheMan = 398907393427243008
        if (message.author.id != TheMan) {
            return message.reply("You do not have permission!");
        }

        var embed = {};

        if (args.length < 2) {
            embed = {
                "title": `Invalid Usage`,
                "description": 'Please use: !role (role you want)',
                "fields": [
                    {
                        name: 'Twitch',
                        value: 'Get notifications for Twitch streams and updates!',
                    },
                    {
                        name: 'Youtube',
                        value: 'Get notifications for Youtube videos and updates!',
                    },
                    {
                        name: 'All',
                        value: 'Get notifications for everything!',
                    }
                ],
                "color": 0xff7300
            };
            message.channel.send({ embed });
            return true;
        }

        if (args[1].toLowerCase() != 'twitch' && args[1].toLowerCase() != 'youtube' && args[1].toLowerCase() != 'all') {
            embed = {
                "title": `Invalid Usage`,
                "description": 'Please use: !role (role you want)',
                "fields": [
                    {
                        name: 'Twitch',
                        value: 'Get notifications for Twitch streams and updates!',
                    },
                    {
                        name: 'Youtube',
                        value: 'Get notifications for Youtube videos and updates!',
                    },
                    {
                        name: 'All',
                        value: 'Get notifications for everything!',
                    }
                ],
                "color": 0xff7300
            };
            message.channel.send({ embed });
            return true;
        }

        if (args[1].toLowerCase() == 'twitch') {
            var roleName = "Twitch Squad"
            var { guild } = message
            var role = guild.roles.cache.find((role) => {
                return role.name === roleName
            })
            var member = guild.members.cache.get(message.member.id)
            var hasRole = member.roles.cache.find(r => {
                return r.name === roleName
            })
            if (hasRole) {
                member.roles.remove(role);
                embed = {
                    "title": `Role Left`,
                    "description": 'You have left the **Twitch Squad** role!',
                    "color": 0x8000ff
                };
            } else {
                member.roles.add(role);
                embed = {
                    "title": `Role Joined`,
                    "description": 'You have joined the **Twitch Squad** role for twitch streams and updates!',
                    "color": 0x8000ff
                };
            }
        } else if (args[1].toLowerCase() == 'youtube') {
            var roleName = "Youtube Squad"
            var { guild } = message
            var role = guild.roles.cache.find((role) => {
                return role.name === roleName
            })
            var member = guild.members.cache.get(message.member.id)
            var hasRole = member.roles.cache.find(r => {
                return r.name === roleName
            })
            if (hasRole) {
                member.roles.remove(role);
                embed = {
                    "title": `Role Left`,
                    "description": 'You have left the **Youtube Squad** role!',
                    "color": 0xff0000
                };
            } else {
                member.roles.add(role);
                embed = {
                    "title": `Role Joined`,
                    "description": 'You have joined the **Youtube Squad** role for youtube videos and updates!',
                    "color": 0xff0000
                };
            }
        } else if (args[1].toLowerCase() == 'all') {
            var roleName = "Notification Squad"
            var { guild } = message
            var role = guild.roles.cache.find((role) => {
                return role.name === roleName
            })
            var member = guild.members.cache.get(message.member.id)
            var hasRole = member.roles.cache.find(r => {
                return r.name === roleName
            })
            if (hasRole) {
                member.roles.remove(role);
                embed = {
                    "title": `Role Left`,
                    "description": 'You have left the **Notification Squad** role!',
                    "color": 0x00eeff
                };
            } else {
                member.roles.add(role);
                embed = {
                    "title": `Role Joined`,
                    "description": 'You have joined the **Notification Squad** role for all notifications!',
                    "color": 0x00eeff
                };
            }
        }

        message.channel.send({ embed });
        console.log('[ROLE] - ' + message.author.username);
        return true;
    }
}