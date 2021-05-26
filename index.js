const token = ''

// подключаем API бота telegram
const botApi = require('node-telegram-bot-api')
const bot = new botApi(token, { polling: true })

// подключаем БД
const { Sequelize } = require('sequelize')
const { DataTypes } = require('sequelize')
const sequalize = new Sequelize(
    'val_',
    'val_',
    'vD',
    {
        host: '00.0.00.00',
        dialect: 'mariadb'
    })
const UserModel = sequalize.define('user', {
    ID: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
    FROM_ID: { type: DataTypes.TEXT, unique: true }
})


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

const start = async () => {
    // Подключаемся к БД
    try {
        await sequalize.authenticate()
        await sequalize.sync()
    } catch (error) {
        console.log('Подключение к БД сломалось', error);
    }

    // список команд бота
    bot.setMyCommands([
        { command: '/start', description: 'Главное меню' },
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

        try {
            console.log(msg);
            
            if (text === '/start') {
                await UserModel.create({chatID})
                await bot.sendSticker(chatID, 'https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/2.webp')
                return await bot.sendMessage(chatID, `Приветствую ${msg.from.first_name}! Информация об аренде парусных яхт и варианты туристических прогулок.`, menuOptions) // кнопки начального меню
            }
    
            // сообщение по умолчанию
            return await bot.sendMessage(chatID, `Я нахожусь в стадии разработки и еще мало что умею.`)
        } catch (error) {
            return bot.sendMessage(chatID, `Упс, в боте какая-то ошибочка!`)
        }
        
    })

    // когда кнопку меню нажали
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatID = msg.message.chat.id

        await bot.sendMessage(chatID, `Ты нажал кнопку ${data}`)

        console.log(msg);
    })
}

// пробуем коннектится к базе
//mysqlConnection.connect(err => {
//    if (err) {
//        console.log(err);
//    }
//})

start()