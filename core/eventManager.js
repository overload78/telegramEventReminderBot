const fs = require('fs');
const moment = require('jalali-moment');

class EventManager {

    constructor() {

        this.data = JSON.parse(fs.readFileSync("./data/events.json"));

    }

    checkEventExists(msg) { //

        var eventText = this._getEventParameters(msg.text);

        for (let data of this.data) {

            if (data.eventName.trim() == eventText[1].trim() && data.userId == msg.from.id) {

                return true; //exists

            }

        }

        return false;

    }

    addEvent(msg) {

        var eventText = this._getEventParameters(msg.text);

        moment.locale('fa');

        var gTime = moment(eventText[2], 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');

        var timestamp = new Date(gTime + " " + eventText[3]).getTime();

        this.data.push({
            "userId": msg.from.id,
            "chatId":msg.chat.id,
            "eventName": eventText[1],
            "eventDescription": eventText[1],
            "date": eventText[2] + " " + eventText[3],
            "timestamp": timestamp
        });

        this._saveDatas();

        return true;

    }

    check(from, to) {

        this._getDatas();

        for (let data of this.data) {

            if (data.timestamp >= from && data.timestamp <= to) {
                
                return data; //exists

            }

        }

        return false;

    }

    _getDatas(){

        this.data = JSON.parse(fs.readFileSync("./data/events.json"));
        
    }

    _getEventParameters(eventText) {

        var patt = /\/addNewEvent (.+) (\d{4}\/\d{2}\/\d{2}) (\d{2}:\d{2})/;

        return patt.exec(eventText);

    }

    _saveDatas() {

        fs.writeFileSync("./data/events.json", JSON.stringify(this.data));

        this._getDatas();

    }

}

module.exports = EventManager;