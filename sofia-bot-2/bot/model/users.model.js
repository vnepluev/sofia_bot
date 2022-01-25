const { DataTypes } = require('sequelize')
const db = require('../connection/db.connection.js')

// определяем модель таблицы `chatbot`
// https://sequelize.org/v7/manual/model-basics.html#model-definition
// https://sequelize.org/v7/manual/model-basics.html#data-types
module.exports = db.define(
   'users',
   {
      user_id: {
         type: DataTypes.BIGINT.UNSIGNED,
         primaryKey: true,
         unique: true,
         autoIncrement: true,
      },
      user_name: {
         type: DataTypes.TEXT,
         require: true,
      },
      user_password: {
         type: DataTypes.TEXT,
      },
      user_email: {
         type: DataTypes.TEXT,
      },
      user_confirm_email: {
         type: DataTypes.TEXT,
         defaultValue: 'строка активации',
      },
      user_phone1: {
         type: DataTypes.TEXT,
         require: true,
      },
      user_phone2: {
         type: DataTypes.TEXT,
      },
      user_telegram_id: {
         type: DataTypes.BIGINT.UNSIGNED,
         unique: true,
      },
      user_telegram_nickname: {
         type: DataTypes.TEXT,
      },
      user_marketing: {
         type: DataTypes.TEXT,
      },
      user_group: {
         type: DataTypes.INTEGER,
         defaultValue: 0,
      },
      user_private_about: {
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
      timestamps: true,
   }
)
