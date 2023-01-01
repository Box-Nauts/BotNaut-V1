module.exports = {
    name: 'factAdUtil',
    description: "Does Faction Ads",

    async run(client, MessageAttachment, number) {

        function requireUncached(module) {
            delete require.cache[require.resolve(module)];
            return require(module);
        }

        const log = await requireUncached(`./logging`);

        const fs = require('fs');

        const ad1Channel = "963302645303496734"
        const ad2Channel = "963302682284662814"

        var facData;
        var adData;
        var Config;
        try {
            facData = JSON.parse(fs.readFileSync("./Arena/Factions.json", "utf8"))
            adData = JSON.parse(fs.readFileSync("./Arena/Ads.json", "utf8"))
            Config = JSON.parse(fs.readFileSync("./Arena/Config.json", "utf8"))
        } catch (e) {
            console.log(e);
            return;
        }

        if (Config.pauseAds) {
            return;
        }

        var Ckeys = Object.keys(adData.ads.currentAds)
        var Qkeys = Object.keys(adData.ads.queuedAds)

        var currentDate = new Date();

        if (Ckeys.length < 2 && Ckeys.length > 0) {
            if (Qkeys.length >= 1) {
                if (adData.ads.currentAds[Ckeys[0]].channel == 1) {
                    adData.ads.currentAds[Qkeys[0]] = { time: currentDate, ad: adData.ads.queuedAds[Qkeys[0]].ad, channel: 2 }
                    client.channels.cache.get(ad2Channel).setName(`ad-${facData.factions[Qkeys].name}`)
                    client.channels.cache.get(ad2Channel).send(adData.ads.queuedAds[Qkeys[0]].ad)
                } else {
                    adData.ads.currentAds[Qkeys[0]] = { time: currentDate, ad: adData.ads.queuedAds[Qkeys[0]].ad, channel: 1 }
                    client.channels.cache.get(ad1Channel).setName(`ad-${facData.factions[Qkeys].name}`)
                    client.channels.cache.get(ad1Channel).send(adData.ads.queuedAds[Qkeys[0]].ad)
                }

                delete adData.ads.queuedAds[Qkeys[0]]
                console.log("Deleted Queue 1")

                try {
                    fs.writeFileSync('./Arena/Ads.json', JSON.stringify(adData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }
            }
        } else if (Ckeys.length <= 0) {
            if (Qkeys.length >= 1) {

                adData.ads.currentAds[Qkeys[0]] = { time: currentDate, ad: adData.ads.queuedAds[Qkeys[0]].ad, channel: 1 }
                client.channels.cache.get(ad1Channel).setName(`ad-${facData.factions[Qkeys].name}`)
                client.channels.cache.get(ad1Channel).send(adData.ads.queuedAds[Qkeys[0]].ad)

                delete adData.ads.queuedAds[Qkeys[0]]

                try {
                    fs.writeFileSync('./Arena/Ads.json', JSON.stringify(adData, null, 2), 'utf8')
                } catch (e) {
                    console.log(e);
                    return;
                }
            }
        }

        if (Ckeys.length <= 0) {
            return;
        }

        if (Ckeys[0] && new Date(adData.ads.currentAds[Ckeys[0]].time) - currentDate.getTime() <= -172800000) { //86400000 1 day 604800000 1 week
            if (adData.ads.currentAds[Ckeys[0]].channel == 1) {
                client.channels.cache.get(ad1Channel).bulkDelete(3)
                client.channels.cache.get(ad1Channel).setName("ad-1")
            } else {
                client.channels.cache.get(ad2Channel).bulkDelete(3)
                client.channels.cache.get(ad2Channel).setName("ad-2")
            }

            delete adData.ads.currentAds[Ckeys[0]]
            console.log("Delete ad")

            try {
                fs.writeFileSync('./Arena/Ads.json', JSON.stringify(adData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
        }

        if (Ckeys[1] && new Date(adData.ads.currentAds[Ckeys[1]].time) - currentDate.getTime() <= -172800000) { //86400000 1 day
            if (adData.ads.currentAds[Ckeys[1]].channel == 1) {
                client.channels.cache.get(ad1Channel).bulkDelete(3)
                client.channels.cache.get(ad1Channel).setName("ad-1")
            } else {
                client.channels.cache.get(ad2Channel).bulkDelete(3)
                client.channels.cache.get(ad2Channel).setName("ad-2")
            }

            delete adData.ads.currentAds[Ckeys[1]]

            try {
                fs.writeFileSync('./Arena/Ads.json', JSON.stringify(adData, null, 2), 'utf8')
            } catch (e) {
                console.log(e);
                return;
            }
        }
    }
}