/**
 * start.action.js и start.command.js запускают startFunction.js
 */
const bot = require('../../connection/token.connection.js')

module.exports = bot.start((ctx) => {
   const start = require('../startFunction.js')
   return start(ctx)
})
