const { Markup } = require('telegraf')
const bot = require('../../connection/token.connection.js')
const db = require('../../connection/db.connection.js')
const ChatbotModel = require('../../model/chatbot.model.js')
const randomStiker = require('../../plugin/randomSticker.js')

module.exports = bot.start(async (ctx) => {
   try {
      // подключаемся к БД
      // https://sequelize.org/v7/manual/getting-started.html
      await db.authenticate()
      await db.sync()

      const userID = ctx.chat.id
      let firstName = ctx.chat.first_name ? ctx.chat.first_name : '' // имя
      const lastName = ctx.chat.last_name ? ctx.chat.last_name : '' // фамилия
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
         // и его основные данные
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
      const { getUserRegInfo } = require('../../plugin/dbUserFunction.js')
      const {
         startMenuOptions,
         startMenuRegOptions,
      } = require('./keyboard.menu.js')

      const { user_id, user_name } = getUserRegInfo(userID)
      let menuOptions = startMenuOptions
      // если зарегистрирован меняем меню и приветствие
      console.log(getUserRegInfo(userID))
      if (user_name) {
         menuOptions = startMenuRegOptions
         firstName = userRegInfo.user_name
      }

      await ctx.replyWithSticker(randomStiker())

      return await ctx.replyWithHTML(
         `<b>Приветствую ${firstName}!</b>\n\nИнформация об аренде парусных яхт и варианты туристических прогулок.`,
         menuOptions
      )
   } catch (e) {
      console.log('Подключение к БД сломалось:', e)
   }
})
