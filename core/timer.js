const EventManager = require("./eventManager");

class Timer{

    constructor(period,telegramBot){

        this.bot = telegramBot;

        this.eventManager = new EventManager();

        this.period = period*1000;

        setInterval(()=>{

            this._checkForAnyDates();

        },this.period-100)

    }

    _checkForAnyDates(){

        var data = this.eventManager.check(Date.now(),Date.now() + this.period);
        
        if(data){

            this.bot.sendMessage(data.chatId,"یادآوری رویداد: " + data.eventName + " در " + data.date);

        }

    }

}

module.exports = Timer;