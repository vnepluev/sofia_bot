// подключаем БД
require('dotenv').config()
const { Sequelize } = require('sequelize')
const sequalize = new Sequelize(
   process.env.BOT_DATABASE,
   process.env.BOT_USERNAME,
   process.env.BOT_PASSWORD,
   {
      host: process.env.BOT_HOST,
      dialect: process.env.BOT_DIALECT,
   }
)

module.exports = sequalize
