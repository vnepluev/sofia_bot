/**
 * Стартовое меню (при запуске бота)
 * https://www.unicode.org/emoji/charts/full-emoji-list.html
 * 🏕 🏖
 */
const startMenuOptions = {
   reply_markup: JSON.stringify({
      inline_keyboard: [
         [
            { text: '⛵ Прогулки на яхте', callback_data: '/sell' },
            { text: '🎁 Сертификаты', callback_data: '/sert' },
         ],
         [
            { text: '🏄 Аренда сап бордов', callback_data: '/supboards' },
            { text: '📸 Фотосессии', callback_data: '/photo' },
         ],
         [
            { text: '❓ Вопросы / ответы', callback_data: '/faq' },
            { text: '⚓ Как добраться', callback_data: '/map' },
         ],
         [
            { text: 'Перейти на сайт', url: 'https://nepluev.com/' },
            { text: '💥 Регистрация', callback_data: '/map' },
         ],
      ],
   }),
}

module.exports = { startMenuOptions }
