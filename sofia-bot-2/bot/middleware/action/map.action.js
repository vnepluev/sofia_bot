/*
   action `/map`, - как добраться до яхт клуба
*/
const bot = require('../../connection/token.connection.js')

module.exports = bot.action('/map', (ctx) => {
   try {
      ctx.answerCbQuery()
      return ctx.replyWithHTML(
         `<b>Яхт клуб в г. Зеленодольск</b>\n\n<b>Координаты:</b> 55.836068, 48.524477\n\n<i>(скопируете цифры и вставьте в навигаторе, в поле для поиска).</i>\n\nhttps://telegra.ph/Shema-proezda-YAht-klub-Zolotoj-ostrov-05-27`
      )
   } catch (e) {
      console.log(e)
   }
})
