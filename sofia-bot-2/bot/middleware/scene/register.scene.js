const { Markup, Scenes, Composer } = require('telegraf')
// https://highload.today/regulyarnye-vyrazheniya-v-javascript-primery-ispolzovaniya-i-servisy-dlya-proverki/

// Шаг 1 (пользователь согласен пройти регистрацию?)
const nameStep = new Composer()
nameStep.action('/yes', async (ctx) => {
   ctx.wizard.state.formData = {}
   await ctx.reply('Представьтесь пожалуйста:')
   return ctx.wizard.next()
})
nameStep.action('/no', async (ctx) => {
   await ctx.answerCbQuery()
   await ctx.deleteMessage()
   return ctx.scene.leave()
})

// Шаг 2 (проверка имени а-я, a-z)
const emailStep = new Composer()
emailStep.on('text', async (ctx) => {
   let msg = ctx.message.text

   if (/^[а-я А-Яa-zA-Z]+$/.test(msg)) {
      msg = msg[0].toUpperCase() + msg.slice(1)
      ctx.wizard.state.formData.firstName = msg
      await ctx.reply('Введите e-mail адрес:')
      return ctx.wizard.next()
   } else {
      await ctx.replyWithHTML(
         '🦞 <b>Имя может содержать только буквы и пробел!</b>\n\nПредставьтесь пожалуйста:'
      )
   }

   return false
})

// Шаг 3 (проверка e-mail)
const phoneStep = new Composer()
phoneStep.on('text', async (ctx) => {
   const msg = ctx.message.text
   const reg = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(msg)

   if (reg) {
      ctx.wizard.state.formData.email = msg
      await ctx.reply('Номер телефона для связи в формате: +7(905)022-40-00')
      return ctx.wizard.next()
   } else {
      await ctx.replyWithHTML('🦞 <b>Введите корректный e-mail!</b>')
   }

   return false
})

// Шаг 4 (проверка номера телефона)
const phoneStep2 = new Composer()
phoneStep2.on('text', async (ctx) => {
   const msg = ctx.message.text
   const reg =
      /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d[- ]\d\d$/.test(
         msg
      )
   if (reg) {
      ctx.wizard.state.formData.phone = msg
      await ctx.reply('Дополнительный телефон для связи\n(можно пропустить):', {
         reply_markup: JSON.stringify({
            inline_keyboard: [
               [{ text: '✅ Пропустить', callback_data: '/skip' }],
            ],
         }),
      })
      return ctx.wizard.next()
   } else {
      await ctx.replyWithHTML(
         '🦞 <b>Введите корректный номер в формате: +7(905)022-40-00!</b>'
      )
   }

   return false
})

// в каком порядке идут сцены
const registerScene = new Scenes.WizardScene(
   'registerWizard',
   nameStep,
   emailStep,
   phoneStep,
   phoneStep2
)

module.exports = registerScene
