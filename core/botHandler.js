

const UserManager = require("./userManager");

const EventManager = require("./eventManager");

class BotHandler {

    constructor(telegramBot) {
        
        this.bot = telegramBot;

        this.userManager = new UserManager();

        this.eventManager = new EventManager();

        //let's define commands

        this.bot.onText(/\/addNewEvent (.+) (\d{4}\/\d{2}\/\d{2}) (\d{2}:\d{2})/, (msg) => {
            var eventText = this.eventManager._getEventParameters(msg.text,1);
            if(this.eventManager.checkEventExists(msg,eventText[1])){
                 this.bot.sendMessage(msg.chat.id,"رویدادی با همین نام موجود است.");
                 return false;
            }

            if(this.eventManager.addEvent(msg)){

                this.bot.sendMessage(msg.chat.id,"رویداد با موفقیت افزوده شد.");
            }else{

                this.bot.sendMessage(msg.chat.id,"مشکلی در افزودن رویداد پیش آمد...:(");
            }


        });

        this.bot.onText(/\/removeEvent (.+)/,(msg)=>{
            
            if(this.eventManager.removeEvent(msg)){
                this.bot.sendMessage(msg.chat.id,"رویداد با موفقیت حذف شد.");
            }else{
                this.bot.sendMessage(msg.chat.id,"چنین رویدادی موجود نمی‌باشد.");
            }

        })

        this.bot.on("message", (msg) => {
            
            if(!this.userManager.checkUserExists(msg.chat)) this.userManager.addUser(msg.chat);

        })

    }

}
module.exports = BotHandler;