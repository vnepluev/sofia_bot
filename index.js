const token = ''
const botApi = require('node-telegram-bot-api')
const bot = new botApi(token, { polling: true })

// Кнопки основного меню
const menuOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Прогулки на яхте', callback_data: '/sell' },
             { text: 'Фотосессии', callback_data: '/photo' }],
            [{ text: 'Туристические маршруты', callback_data: '/tour' }],
            [{ text: 'О нас', callback_data: '/about' },
             { text: 'Как добраться', callback_data: '/map' }]
        ]
    })
}

const start = () => {
    // список команд бота
    bot.setMyCommands([
        { command: '/start', description: 'Приветствие' },
        { command: '/about', description: 'О нас' },
        { command: '/sell', description: 'Прогулки на яхте' },
        { command: '/photo', description: 'Фотосессии' },
        { command: '/tour', description: 'Туристические маршруты' },
        { command: '/map', description: 'Как добраться' }
    ])

    // сообщения для бота
    bot.on('message', async msg => {
        const text = msg.text
        const chatID = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatID, 'https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/2.webp')
            return bot.sendMessage(chatID, `Приветствую ${msg.from.first_name}! Сдесь вы можете узнать об аренде парусных яхт и ознакомиться с вариантами прогулок.`, menuOptions) // кнопки начального меню
        }

        // сообщение по умолчанию
        return bot.sendMessage(chatID, `Я нахожусь в стадии разработки и еще мало что умею.`)

    })

    // когда кнопку меню нажали
    bot.on('callback_query', msg => {
        const data = msg.data
        const chatID = msg.message.chat.id

        bot.sendMessage(chatID, `Ты нажал кнопку ${data}`)

        console.log(msg);
    })
}

start()