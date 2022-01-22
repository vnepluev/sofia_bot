require('dotenv').config()                       // dotenv для хранения данных в .env
const { Telegraf, Markup } = require('telegraf') // Markup - для сообщений с кнопками
// для использования сессий
// const { Composer, Scenes, session } = require('telegraf')

// когда слушателей команд больше 10 возникает ошибка
// убрать ее можно расширив лимит слушателей, либо использовать .once()
// https://stackoverflow.com/questions/9768444/possible-eventemitter-memory-leak-detected
// require('events').EventEmitter.prototype._maxListeners = 100

const bot_token = process.env.BOT_TOKEN
const bot = new Telegraf(bot_token)

// сообщение при старте бота, сразу после /start
bot.start((ctx) => ctx.reply('Welcome'))
// сообщение по команде /help
bot.help((ctx) => ctx.reply('Send me a sticker'))
// произвольная команда, н-р: /hipster
bot.command('hipster', Telegraf.reply('λ'))

// ответить с помощью html разметки
// /n - для переноса строки
// чтобы сообщения шли друг за другом, нужно добавить async / await и обернуть в try / catch
bot.command('test', async (ctx) => {
	try {
		await ctx.replyWithHTML('<b>Жирный</b>')
		await ctx.replyWithHTML('<i>Курсив</i>')
		await ctx.replyWithHTML('<s>Зачеркнутый</s>')
		await ctx.replyWithHTML('<u>Подчеркнутый</u>')
		await ctx.replyWithHTML('<a href="https://nepluev.com">Ссылка с превью</a>')
	} catch (error) {
		console.log(error)
	}
})

// принимает тип отправляемого файла (сообщение, аудио, видео, стикер, фото и т.д.)
// `sticker` - большая картинка, `message`, `text`
// https://telegraf.js.org/modules/Types.html
bot.on('sticker', (ctx) => ctx.reply('👍'))
// произвольная команда, без `/`
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

// отправляем клавиатуру
bot.command('keyboard', async (ctx) => {
	ctx.reply('Пример клавиатуры?', Markup.inlineKeyboard([
		[
			Markup.button.callback('Да', 'Yes'),
			Markup.button.callback('Нет', 'No')
		],
		[
			Markup.button.callback('Начать игру', 'start-game')
		]

	]))
})

// обработка нажатий на кнопки
bot.action('No', async (ctx) => {
	await ctx.answerCbQuery()
	await ctx.replyWithHTML(`Попробуй поискать на <a href="https://nepluev.com/">nepluev.com</a>`, {disable_web_page_preview: true})
})

bot.action('Yes', async (ctx) => {
	await ctx.answerCbQuery() // чтобы убрать часики на кнопке, функция асихронная
	await ctx.reply('Вы выбрали "Нет"')
})

//
// Создаем новую сцену
//

// 'sceneWizard' - id сцены
const menuScene = new Scenes.WizardScene('sceneWizard')

// обрабатываем сцену
const stage = new Scenes.Stage([menuScene])
bot.use(session())
bot.use(stage.middleware())

// запускаем сцену
bot.command('start-game', async (ctx) => {
	ctx.scene.enter('sceneWizard')
})

bot.launch()