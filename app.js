const TelegramBot = require('node-telegram-bot-api');

const config = require("./config/config");

const BotHandler = require("./core/botHandler");

const Timer = require("./core/timer");

var telegramBot = new TelegramBot(config.token,{polling:true});

//-----------------------------------------------

var botHandler = new BotHandler(telegramBot);

var timer = new Timer(config.period,telegramBot);