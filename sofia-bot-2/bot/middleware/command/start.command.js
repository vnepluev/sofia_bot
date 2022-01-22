const { Markup } = require('telegraf')
const bot = require('../../connection/token.connection.js')
const db = require('../../connection/db.connection.js')
const ChatbotModel = require('../../model/chatbot.model.js')
const randomStiker = require('../../plugin/randomSticker.js')

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

      // ====================================
      // добавляем нового пользователя в БД
      // ====================================
      if (!foundUser) {
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

      // ====================================
      // выводим начальное приветствие
      // ====================================

      // Кнопки основного меню
      const menuOptions = {
         reply_markup: JSON.stringify({
            inline_keyboard: [
               [
                  { text: 'Прогулки на яхте', callback_data: '/sell' },
                  { text: 'Фотосессии', callback_data: '/photo' },
               ],
               [{ text: 'Туристические маршруты', callback_data: '/tour' }],
               [
                  { text: 'О нас', callback_data: '/about' },
                  { text: 'Как добраться', callback_data: '/map' },
               ],
               [{ text: 'Личный кабинет', url: 'https://nepluev.com/' }],
            ],
         }),
      }

      await ctx.replyWithSticker(randomStiker())

      return await ctx.replyWithHTML(
         `<b>Приветствую ${firstName}!</b> Информация об аренде парусных яхт и варианты туристических прогулок.`,
         menuOptions
      )
   } catch (e) {
      console.log('Подключение к БД сломалось:', e)
   }
})
