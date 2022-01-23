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
   await ctx.answerCbQuery()
   await ctx.replyWithHTML(
      '<b>Желаете пройти регистрацию?</b>\n\nРегистрация проста и займет не больше минуты.',
      {
         reply_markup: JSON.stringify({
            inline_keyboard: [
               [
                  { text: '✅ Да, желаю', callback_data: '/yes' },
                  { text: '❌ Нет', callback_data: '/no' },
               ],
            ],
         }),
      }
   )
   await ctx.scene.enter('registerWizard')
})

module.exports = stage
