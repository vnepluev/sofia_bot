const token = ''
const botApi = require('node-telegram-bot-api')
const bot = new botApi(token, { polling: true })

// Кнопки основного меню
const menuOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'О яхтах', callback_data: '/about' }],
            [{ text: 'Как нас найти', callback_data: '/map' }],
            [{ text: 'Туристические маршруты', callback_data: '/tour' }],
            [{ text: 'Аренда яхт', callback_data: '/sell' }],
            [{ text: 'Фотосессии', callback_data: '/photo' }]
        ]
    })
}

const start = () => {
    // список команд бота
    bot.setMyCommands([
        { command: '/start', description: 'Приветствие' },
        { command: '/stop', description: 'Приветствие' }
    ])

    // сообщения для бота
    bot.on('message', async msg => {
        const text = msg.text
        const chatID = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chatID, 'https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/2.webp')
            return bot.sendMessage(chatID, 'Старт', menuOptions) // кнопки начального меню
            //return bot.sendMessage(chatID, `Приветствую ${msg.from.first_name}! Сдесь вы можете узнать об аренде парусных яхт и ознакомиться с вариантами прогулок.`)
        }

        // сообщение по умолчанию
        return bot.sendMessage(chatID, `Я нахожусь в стадии разработки и еще мало что умею.`)

    console.log(msg);
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