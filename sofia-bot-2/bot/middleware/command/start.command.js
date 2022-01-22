const { Markup } = require('telegraf')
const bot = require('../../connection/token.connection.js')
const db = require('../../connection/db.connection.js')
const ChatbotModel = require('../../model/chatbot.model.js')

module.exports = bot.start(async (ctx) => {
   try {
      // Подключаемся к БД
      // https://sequelize.org/v7/manual/getting-started.html
      await db.authenticate()
      await db.sync()

      const userID = ctx.chat.id
      const firstName = ctx.chat.first_name ? ctx.chat.first_name : '' // фамилия
      const lastName = ctx.chat.last_name ? ctx.chat.last_name : '' // имя
      const nickName = ctx.chat.username ? ctx.chat.username : '' //@

      const foundUser = await ChatbotModel.findOne({
         where: { chatbot_tg_user_id: userID },
      })

      if (!foundUser) {
         // добавляем нового пользователя в БД
         await ChatbotModel.create({
            chatbot_tg_user_id: userID,
            chatbot_tg_user_name: nickName,
            chatbot_tg_first_name: firstName,
            chatbot_tg_last_name: lastName,
         })
      } else {
         // если пользователь есть в БД, обновляем время доступа (- 4 часа)
         // обновляем его основные данные
         foundUser.set({
            chatbot_tg_user_name: nickName,
            chatbot_tg_first_name: firstName,
            chatbot_tg_last_name: lastName,
            updatedAt: new Date(),
         })
         await foundUser.save()
      }

      // выводим начальное приветствие
      await bot.sendSticker(
         userID,
         'https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/2.webp'
      )
      return await bot.sendMessage(
         userID,
         `Приветствую ${firstName}! Информация об аренде парусных яхт и варианты туристических прогулок.`,
         menuOptions
      )
   } catch (e) {
      console.log('Подключение к БД сломалось:', e)
   }
})
