const db = require('../connection/db.connection.js')
const ChatbotModel = require('../model/chatbot.model.js')
const UsersModel = require('../model/users.model.js')

// ====================================
// возвращает объект: { user_id, user_name }, если зарегистрирован
// если нет - undefined
// ====================================
async function getUserRegInfo(userID) {
   try {
      await db.authenticate()
      await db.sync()

      // получаем текущего пользователя из таблицы chatbot
      const findUserChatID = await ChatbotModel.findOne({
         where: { chatbot_tg_user_id: userID },
      })

      // пользователь зарегистрирован - получаем его user_id
      if (findUserChatID.chatbot_user_id) {
         const findUserID = await UsersModel.findOne({
            where: { user_id: findUserChatID.chatbot_user_id },
         })
         if (!findUserID.user_name) {
            throw new Error('User not registered!')
         }
         return {
            user_id: findUserChatID.chatbot_user_id,
            user_name: findUserID.user_name,
         }
      } else {
         return undefined
      }
   } catch (e) {
      console.log(e)
      return undefined
   }
}

module.exports = { getUserRegInfo }
