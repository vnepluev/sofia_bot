/**
 * Стартовое меню (при запуске бота)
 * https://www.unicode.org/emoji/charts/full-emoji-list.html
 * 🏕 🏖
 */
const baseMenu = [
   [
      { text: '⛵ Прогулки на яхте', callback_data: '/sell' },
      { text: '🎁 Сертификаты', callback_data: '/sert' },
   ],
   [
      { text: '🏄 Аренда сап бордов', callback_data: '/supboards' },
      { text: '📸 Фотосессии', callback_data: '/photo' },
   ],
   [
      { text: '❓ Вопрос / ответ', callback_data: '/faq' },
      { text: '⚓ Как добраться', callback_data: '/map' },
   ],
]

const site = [{ text: 'Перейти на сайт', url: 'https://nepluev.com/' }]

const startMenuOptions = {
   reply_markup: JSON.stringify({
      inline_keyboard: [
         ...baseMenu,
         [...site, { text: '💥 Регистрация', callback_data: '/register' }],
      ],
   }),
}

const startMenuRegOptions = {
   reply_markup: JSON.stringify({
      inline_keyboard: [
         ...baseMenu,
         [...site, { text: '💥 Мои заказы', callback_data: '/orders' }],
      ],
   }),
}

module.exports = { startMenuOptions, startMenuRegOptions }
