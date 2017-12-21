const fs = require('fs');
const moment = require('jalali-moment');

class EventManager {

    constructor() {

        this.data = JSON.parse(fs.readFileSync("./data/events.json"));

    }

    checkEventExists(msg,eventName) { //

        for (let data of this.data) {

            if (data.eventName.trim() == eventName.trim() && data.userId == msg.from.id) {

                return true; //exists

            }

        }

        return false;

    }

    addEvent(msg) {

        var eventText = this._getEventParameters(msg.text,1);

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

    removeEvent(msg){
        var eventText = this._getEventParameters(msg.text,2);
        if(this.checkEventExists(msg,eventText[1])){
            this.data.filter(data=>{data.eventName != eventText[0] && data.userId == msg.from.id});
            this._saveDatas();
            this._getDatas();
            return true;
        }else{
            return false;
        }
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

    _getEventParameters(eventText,type) {
        console.log(eventText)
        switch(type){
            case 1://addEvent
                var patt = /\/addNewEvent (.+) (\d{4}\/\d{2}\/\d{2}) (\d{2}:\d{2})/;
                break;
            case 2://removeEvent
                var patt = /\/removeEvent (.+)/;
                break;
        }

        return patt.exec(eventText);

    }

    _saveDatas() {

        fs.writeFileSync("./data/events.json", JSON.stringify(this.data));

        this._getDatas();

    }

}

module.exports = EventManager;