module.exports = {
    name: 'logging',
    description: "Used for logging anything",

    async run(message, level) {

        const fs = require('fs');

        if(level = 1){
            console.log(message);//Log message
        } else if(level = 2){
            console.warn(message);//Log message with warning/error colors
        }
        
        var d = new Date();

        fs.appendFile(`./logs/log.txt`, message + ' ' + d.toLocaleString() + '\n', (err) => {//Log to text file with time and message.
            if (err) throw err;//Error
        });
    }
}