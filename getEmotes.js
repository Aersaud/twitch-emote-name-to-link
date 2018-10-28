var Request = require('superagent');
var fs = require('fs');
let allEmotes = {};

Request
    .get('https://api.twitch.tv/kraken/chat/emoticon_images')
    .set('Client-ID', 'vn4xtjni4mg12laosore48i3atdp1i')
    .end((err, res) => {
        if(err){
            throw err;
        }
        let obj = JSON.parse(res.text);
        let emotes = obj.emoticons;
        let num = 0;
        emotes.forEach(emote => {
            // emote is an object
            num++;
            // obj["Kappa"] = https://static-cdn.jtvnw.net/emoticons/v1/${id}/${size + 1}.0
            allEmotes[emote.code] = `https://static-cdn.jtvnw.net/emoticons/v1/${emote.id}/1.0`;
            if(num === emotes.length){
                console.log("Done!");
                fs.writeFile(__dirname+"/info.json", JSON.stringify(allEmotes));
            }
        })
    })