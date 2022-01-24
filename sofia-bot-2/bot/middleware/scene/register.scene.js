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
      ctx.wizard.state.formData.email = msg.toLowerCase()
      await ctx.reply('Номер телефона для связи в формате: +7(905)022-40-00')
      return ctx.wizard.next()
   } else {
      await ctx.replyWithHTML('🦞 <b>Введите корректный e-mail!</b>')
   }

   return false
})

// Шаг 4 (проверка номера телефона)
const phone2Step = new Composer()
phone2Step.on('text', async (ctx) => {
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

// Шаг 5 (проверка 2 номера телефона)
const howFindStep = new Composer()
const txt = 'Как вы о нас узнали (н-р: реклама в инстаграм)?'

howFindStep.action('/skip', async (ctx) => {
   await ctx.answerCbQuery()
   ctx.wizard.state.formData.phone2 = ''
   await ctx.reply(txt)
   return ctx.wizard.next()
})
howFindStep.on('text', async (ctx) => {
   const msg = ctx.message.text
   const reg =
      /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d[- ]\d\d$/.test(
         msg
      )
   if (reg === true) {
      ctx.wizard.state.formData.phone2 = msg
      await ctx.reply(txt)
      return ctx.wizard.next()
   } else {
      await ctx.replyWithHTML(
         '🦞 <b>Введите корректный номер в формате: +7(905)022-40-00!</b>',
         {
            reply_markup: JSON.stringify({
               inline_keyboard: [
                  [{ text: '✅ Пропустить', callback_data: '/skip' }],
               ],
            }),
         }
      )
   }

   return false
})

// Шаг 6 (проверка как вы о нас узнали)
const isCorrectStep = new Composer()

isCorrectStep.on('text', async (ctx) => {
   const userData = ctx.wizard.state.formData
   const msg = ctx.message.text
   if (msg.length > 6 && /^[а-я А-Яa-zA-Z0-9]+$/.test(msg)) {
      userData.howFind = msg
      userData.userID = ctx.chat.id //user id
      userData.nickName = ctx.chat.username ? ctx.chat.username : '' //@
      await ctx.replyWithHTML('<b>Проверьте ваши данные:</b>')
      await ctx.replyWithHTML(
         `
         <b>Ваше имя:</b>\n${userData.firstName}\n\n<b>Почтовый адрес:</b>\n${
            userData.email
         }\n\n<b>Телефон для связи (основной):</b>\n${userData.phone}\n${
            userData.phone2
               ? '<b>Телефон для связи (резервный):</b>\n' +
                 userData.phone2 +
                 '\n\n'
               : ''
         }\n${
            userData.nickName
               ? '<b>Ник в телеграм:</b>\n' + 't.me/' + userData.nickName + '\n'
               : ''
         }\n<b>Как о нас узнали:</b>\n${userData.howFind}`,
         {
            disable_web_page_preview: true,
            reply_markup: JSON.stringify({
               inline_keyboard: [
                  [
                     { text: '✅ Все верно', callback_data: '/yes' },
                     { text: '❌ Нет, не верно', callback_data: '/no' },
                  ],
               ],
            }),
         }
      )
      return ctx.wizard.next()
   } else {
      await ctx.replyWithHTML(
         '🦞 <b>Пожалуйста, напишите как вы о нас узнали</b>'
      )
   }

   return false
})

// Шаг 7 (итоговая проверка данных)
const saveBDStep = new Composer()
saveBDStep.action('/no', async (ctx) => {
   await ctx.answerCbQuery()
   await ctx.reply(
      'Для повторной регистрации вернитесь в основное меню нажав /start'
   )
   return ctx.scene.leave()
})
// сохраняем в БД users
saveBDStep.action('/yes', async (ctx) => {
   await ctx.answerCbQuery()
   await ctx.replyWithSticker(
      'https://tlgrm.ru/_/stickers/8c8/aa0/8c8aa0c1-8da1-3a11-ae45-fc092dd0c263/16.webp'
   )
   await ctx.replyWithHTML(
      `<b>Поздравляю ${ctx.wizard.state.formData.firstName}! Вы успешно зарегистрировались!</b>\n\nТеперь Вам доступны расширенные опции (расписание, напоминания, заказы...). Не забудьте включить звуковые уведомления в боте!\n\nВернуться в главное меню /start`
   )
   return ctx.scene.leave()
})

// в каком порядке идут сцены
const registerScene = new Scenes.WizardScene(
   'registerWizard',
   nameStep,
   emailStep,
   phoneStep,
   phone2Step,
   howFindStep,
   isCorrectStep,
   saveBDStep
)

module.exports = registerScene
