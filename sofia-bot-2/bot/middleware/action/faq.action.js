/*
   action `/faq`, - часто задаваемые вопросы
*/
const bot = require('../../connection/token.connection.js')
const { returnMenuOptions } = require('../command/keyboard.menu.js')

module.exports = bot.action('/faq', (ctx) => {
   try {
      ctx.answerCbQuery()
      return ctx.replyWithHTML(
         `<b>Часто задаваемые вопросы:</b>\n\n` +
            `🐬 <b><i>За сколько по времени нужно приехать?</i></b>\n` +
            `- желательно приезжать как минимум за 10-15 минут до начала прогулки. Учитывайте пробки и возможные задержки на сборы (выгрузка вещей из машины, сбор детей и прочее...).\n\n` +
            `🐬 <b><i>Как одеться и что взять с собой?</i></b>\n` +
            `- в жаркую погоду берите крем от загара, головной убор, солнечные очки и чистую воду. В прохладную погоду желательно иметь сменную куртку или свитер, дождевик по погоде. Если будет холодно - выдадим плед. С утра и под вечер температура может сильно меняться. Из обуви исключить ботинки с черной подошвой, оставляющей следы и каблуки (исключение - фотосессии).\n\n` +
            `🐬 <b><i>А если будет сильный дождь или шквальный ветер?</i></b>\n` +
            `- прогулку на яхте можно перенести. Обычно мы созваниваемся заранее и обговариваем эти моменты.\n\n` +
            `🐬 <b><i>За сколько бронировать время прогулки?</i></b>\n` +
            `- выходные и праздничные дни, закаты / рассветы желательно бронировать за несколько дней. Следите за расписанием, иногда поездки переносятся и ранее занятое время становится свободно.\n\n` +
            `🐬 <b><i>Можно ли организовать фуршет на яхте, взять алкоголь?</i></b>\n` +
            `- крепкий алкоголь на борту запрещен. В остальном, все что душе угодно: напитки, шампанское, еда. Место на палубе, где можно организовать прием пищи есть. Только не забывайте о правилах безопасности на воде и слушайтесь капитана.\n\n` +
            `🐬 <b><i>Есть ли каюта? Можно ли переодеться внутри?</i></b>\n` +
            `- каюта на яхте имеется и свободно вмещает 4 взрослых людей. Единственный момент, отстуствие стационарного туалета.\n\n` +
            `🐬 <b><i>С детьми какого возраста можно на борт?</i></b>\n` +
            `- в спокойную погоду ограничений нет. В это время яхта безопасна для прогулок. Если хотите отдохнуть для себя, подумайте, а брать ли детей, т.к. все ваше внимание будет направлено на них.\n\n` +
            `\n\n`,
         returnMenuOptions
      )
   } catch (e) {
      console.log(e)
   }
})
