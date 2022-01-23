const { Markup, Scenes, Composer } = require('telegraf')

// Шаг 2 (проверка имени а-я, a-z)
const firstStep = new Composer()
firstStep.on('text', async (ctx) => {
   ctx.wizard.state.formData = {}
   let msg = ctx.message.text

   if (/^[а-я А-Яa-zA-Z]+$/.test(msg)) {
      msg = msg[0].toUpperCase() + msg.slice(1)
      ctx.wizard.state.formData.firstName = msg
      await ctx.reply('Введите e-mail адрес:')
      return ctx.wizard.next()
   } else {
      await ctx.replyWithHTML(
         '<b>Имя может содержать только буквы и пробел! Представьтесь пожалуйста:</b>'
      )
   }
   return false
})

// Шаг 3
const phoneStep = new Composer()
phoneStep.on('text', async (ctx) => {
   ctx.wizard.state.formData = {}
   await ctx.reply('Номер телефона для связи в формате +7(905)022-40-00')
   return ctx.wizard.next()
})

// в каком порядке идут сцены
const registerScene = new Scenes.WizardScene(
   'registerWizard',
   firstStep,
   phoneStep
)

module.exports = registerScene
