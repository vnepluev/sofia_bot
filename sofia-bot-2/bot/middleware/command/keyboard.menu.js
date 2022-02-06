/**
 * Стартовое меню (при запуске бота)
 * https://www.unicode.org/emoji/charts/full-emoji-list.html
 * 🏕 🏖
 */
const baseMenu = [
   [
      { text: '⛵ Прогулки на яхте', callback_data: '/yacht_menu' },
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

// пункт меню
const mMenu = [{ text: '🏖 В главное меню', callback_data: '/start' }]

/**
 * Меню `прогулки на яхте`
 */
const yachtMenu = [
   [{ text: '🌅 Рассветы на яхте', callback_data: '/yacht_sunrise' }],
   [{ text: '⛵ Прогулки под парусом', callback_data: '/yacht_rent' }],
   [{ text: '🏄 Аренда сап бордов / ватрушек', callback_data: '/supboards' }],
   [{ text: '🏕 Туристические маршруты', callback_data: '/yacht_tour' }],
   [
      { text: '📸 Фотосессии', callback_data: '/photo' },
      { text: '🐠 Рыбалка', callback_data: '/fish' },
   ],
   [...mMenu],
]
const yachtMenuOptions = {
   reply_markup: JSON.stringify({
      inline_keyboard: [...yachtMenu],
   }),
}

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

// страница на главное меню
const returnMenuOptions = {
   reply_markup: JSON.stringify({
      inline_keyboard: [[...mMenu]],
   }),
}

module.exports = {
   startMenuOptions,
   startMenuRegOptions,
   returnMenuOptions,
   yachtMenuOptions,
}
