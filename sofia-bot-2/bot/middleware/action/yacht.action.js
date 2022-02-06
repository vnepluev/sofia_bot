/*
   action `/yacht`, меню `прогулки на яхте`
	http://zpravda.ru/news/obschestvo/v-zelenodolske-otkryit-sezon-progulok-na-parusnoy-yahte
*/
const bot = require('../../connection/token.connection.js')
const { yachtMenuOptions } = require('../command/keyboard.menu.js')

module.exports = bot.action('/yacht_menu', (ctx) => {
   try {
      ctx.deleteMessage()
      ctx.answerCbQuery()
      // «Тихий шелест волн за бортом, закат раскрасил летнее небо мягким светом, легкий бриз нежно прикасается к коже и ласково развевает Ваши волосы. Негромко скрипят снасти, яхта раскачивается на волнах, увлекая за собой в речной вояж. В Ваших руках бокал игристого напитка, а рядом - дорогой и любящий, родной человек».
      return ctx.replyWithHTML(
         `<i>«Бархатный шелест парусов, освежающий речной бриз, яхта раскачивается на волнах, увлекая за собой в речной вояж. В Ваших руках бокал вкусного напитка, а рядом - дорогой и любящий, родной человек».</i>\n\n`,
         yachtMenuOptions
      )
   } catch (e) {
      console.log(e)
   }
})
