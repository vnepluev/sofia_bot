const { DataTypes } = require('sequelize')
const db = require('../connection/db.connection.js')

// определяем модель таблицы `chatbot`
// https://sequelize.org/v7/manual/model-basics.html#model-definition
// https://sequelize.org/v7/manual/model-basics.html#data-types
module.exports = db.define(
   'chatbot',
   {
      chatbot_id: {
         type: DataTypes.BIGINT.UNSIGNED,
         primaryKey: true,
         unique: true,
         autoIncrement: true,
      },
      chatbot_user_id: {
         type: DataTypes.BIGINT.UNSIGNED,
         unique: true,
      },
      chatbot_tg_user_id: {
         type: DataTypes.BIGINT.UNSIGNED,
         unique: true,
      },
      chatbot_tg_user_name: {
         type: DataTypes.TEXT,
      },
      chatbot_tg_first_name: {
         type: DataTypes.TEXT,
      },
      chatbot_tg_last_name: {
         type: DataTypes.TEXT,
      },
      createdAt: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
      updatedAt: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
   },
   {
      timestamps: false,
   }
)
