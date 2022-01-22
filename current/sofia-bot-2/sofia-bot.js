require('dotenv').config()                       // dotenv для хранения данных в .env
const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf')

const bot_token = process.env.BOT_TOKEN
const bot = new Telegraf(bot_token)

const startWizard = new Composer()
startWizard.on('text', async (ctx) => {
	// данные в state хранятся 24 часа
	// или до того момента, пока сцена не завершится
	ctx.wizard.state.data = {}
	await ctx.reply('Ваше имя:')
	return ctx.wizard.next() // переходим на следующий шаг (firstName)
})

const firstName = new Composer()  // в эту часть приходит ответ с именем
firstName.on('text', async (ctx) => {
	ctx.wizard.state.data.firstName = ctx.message.text
	await ctx.reply('Ваша фамилия:')
	return ctx.wizard.next() // переходим на следующий шаг (lastName)
})

const lastName = new Composer() // в эту часть приходит ответ с фамилией
lastName.on('text', async (ctx) => {
	ctx.wizard.state.data.lastName = ctx.message.text
	await ctx.reply('Варианты с кнопкми', Markup.inlineKeyboard([
		[Markup.button.callback('telegram', 'telegram')],
		[Markup.button.callback('whatsap', 'whatsap')]
	]))
	return ctx.wizard.next() // переходим на следующий шаг (messanger)
})

const messanger = new Composer()  // в эту часть приходит ответ с кнопками
messanger.action('telegram', async (ctx) => {
	await ctx.answerCbQuery()
	ctx.wizard.state.data.messanger = 'Telegram'
	await ctx.reply(`${ctx.wizard.state.data.firstName} ${ctx.wizard.state.data.lastName}`)
	await ctx.reply(`${ctx.wizard.state.data.messanger} - ваш выбор верен!`)
	return ctx.scene.leave() // выходим из сцены
})
messanger.action('whatsap', async (ctx) => {
	await ctx.answerCbQuery()
	ctx.wizard.state.data.messanger = 'Whatsapp'
	await ctx.reply(`${ctx.wizard.state.data.firstName} ${ctx.wizard.state.data.lastName}`)
	await ctx.reply(`${ctx.wizard.state.data.messanger} - ваш выбор не верен!`)
	return ctx.scene.leave() // выходим из сцены
})



// 'sceneWizard' - id сцены
// далее прописываем шаги сцены
const menuScene = new Scenes.WizardScene('sceneWizard', startWizard, firstName, lastName, messanger)

// обрабатываем сцену
const stage = new Scenes.Stage([menuScene])
bot.use(session())
bot.use(stage.middleware())

// запускаем сцену
bot.command('start', (ctx) => {
	ctx.scene.enter('sceneWizard')
})

bot.launch()