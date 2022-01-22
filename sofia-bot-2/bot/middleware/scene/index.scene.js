const { Scenes, session } = require("telegraf");
const bot = require("../../connection/token.connection");

const oneWizard = require("./oneWizard.scene");
const twoWizard = require("./twoWizard.scene");

const stage = new Scenes.Stage([oneWizard, twoWizard]);

bot.use(session());
bot.use(stage.middleware());

module.exports = stage;