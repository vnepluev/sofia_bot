const botApi = require('node-telegram-bot-api')  // подключаем API бота telegram
require('dotenv').config()                       // dotenv для хранения данных в .env

const token = process.env.BOT_TOKEN
const bot = new botApi(token, { polling: true })


// подключаем БД
const { Sequelize, DataTypes } = require('sequelize')
const sequalize = new Sequelize(
    process.env.BOT_DATABASE,
    process.env.BOT_USERNAME,
    process.env.BOT_PASSWORD,
    {
        host: process.env.BOT_HOST,
        dialect: process.env.BOT_DIALECT
    })

// определяем модель таблицы `chatbot`
// https://sequelize.org/v7/manual/model-basics.html#model-definition
// https://sequelize.org/v7/manual/model-basics.html#data-types
const UserModel = sequalize.define('chatbot', {
    chatbot_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
		chatbot_user_id: {
			type: DataTypes.BIGINT.UNSIGNED,
      unique: true
		},
    chatbot_tg_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      unique: true
    },
		chatbot_tg_user_name: {
			type: DataTypes.TEXT
		},
		chatbot_tg_first_name: {
			type: DataTypes.TEXT
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
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

// Кнопка в главное меню
const menuBack = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'В главное меню', callback_data: '/start' }],
        ]
    })
}

const start = async () => {
    // Подключаемся к БД
    // https://sequelize.org/v7/manual/getting-started.html
    try {
        await sequalize.authenticate()
        await sequalize.sync()
    } catch (error) {
        console.log('Подключение к БД сломалось');
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


/*
from: {
    id: 21783751,
    is_bot: false,
    first_name: 'Valeriy',
    username: 'mrGreen2020',
    language_code: 'ru'
  }
*/

    // сообщения для бота
    bot.on('message', async msg => {
        const text = msg.text								// сообщение от пользователя
        const chatID = msg.chat.id							// id чата
				const userId = msg.from.id					// id пользователя
				const chatFirstName = msg.from.first_name   // имя пользователя
				const chatUserName = msg.from.username      // @nickname

        try {
            console.log(msg)
            
			const findUser = await UserModel.findOne({ where: { chatbot_tg_user_id: userId } })
            if (text === '/start') {
                // а есть ли пользователь в БД?
                if (findUser === null) {
                    await UserModel.create({
                        chatbot_tg_user_id: userId,
                        chatbot_tg_user_name: chatFirstName,
                        chatbot_tg_first_name: chatUserName,
                        createdAt: new Date(Date.now()),
                    })
                } else {
                    // обновляем дату (разница в 4 часа)
                    findUser.changed('updatedAt', true)
                    await findUser.save()
                    // const res1 = await findUser.update(
                    //     { updatedAt: new Date(Date.now()) },
                    //     { where: {chatbot_tg_user_id: userId} }
                    // )
                    // console.log(res1)
                }

                await bot.sendSticker(chatID, 'https://tlgrm.ru/_/stickers/1d4/336/1d433610-907e-31e1-bcd1-bb87fb42375f/2.webp')
                return await bot.sendMessage(chatID, `Приветствую ${msg.from.first_name}! Информация об аренде парусных яхт и варианты туристических прогулок.`, menuOptions) // кнопки начального меню
            }

            // если функция возвращает false, значит команда не найдена
            const msgText = sendBotMessage(text)
            if (msgText) {
                await bot.sendMessage(chatID, `${msgText}`)
                return
            }
    
            // сообщение по умолчанию
            return await bot.sendMessage(chatID, `Я нахожусь в стадии разработки и еще мало что умею.`)
        } catch (error) {
            return bot.sendMessage(chatID, `Упс, в боте какая-то ошибочка ${error}`)
        }
        
    })

    //
    // когда кнопку меню нажали
    //
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatID = msg.message.chat.id

        // если функция возвращает false, значит команда не найдена
        const msgText = sendBotMessage(data)
        if (msgText) {
            await bot.sendMessage(chatID, `${msgText}`, menuBack)
            return
        }

        // если команда не определена возвращаем в главное меню
        await bot.sendSticker(chatID, 'https://tlgrm.ru/_/stickers/f22/575/f22575b6-7e11-4f31-9eef-640f5b6f16b3/6.webp')
        await bot.sendMessage(chatID, `Аренда парусных яхт и варианты туристических маршрутов:`, menuOptions) // кнопки начального меню

        console.log(msg);
    })
}

start()

//
// uCommand - команда в чате
//
// return текст для вывода, если команда сработала, false если нет
//
function sendBotMessage(uCommand) {

    // Как добраться
    switch (uCommand) {
        case '/map':
            return `Добраться до яхт-клуба можно несколькими способами:

Координаты: 55.836068, 48.524477 (скопируете цифры и вставьте в навигаторе, в поле для поиска).

https://telegra.ph/Shema-proezda-YAht-klub-Zolotoj-ostrov-05-27`
    // Туристические маршруты
        case '/sell':
            return `https://telegra.ph/Arenda-parusnyh-yaht-05-27`
    // Фотосессии на яхте
        case '/photo':
            return `https://telegra.ph/Fotosessiya-na-parusnoj-yahte-05-27`
    // Туристические маршруты
        case '/tour':
            return `https://telegra.ph/Turisticheskie-marshruty-na-yahtah-05-27`
    // Туристические маршруты
        case '/about':
            return `https://telegra.ph/Znakomstvo-s-komandoj-05-27`

        default: return false
    }
    




}