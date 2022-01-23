const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf')
const bot = require('../../connection/token.connection')

// подключаем сцены
const registerScene = require('./register.scene.js')

// прописываем сцены выше друг за другом в массиве
const stage = new Scenes.Stage([registerScene])

bot.use(session())
bot.use(stage.middleware())

// Вход в сцену registerScene
bot.action('/register', async (ctx) => {
   // await ctx.answerCbQuery()
   await ctx.reply('Представьтесь пожалуйста:')
   await ctx.scene.enter('registerWizard')
})

module.exports = stage
