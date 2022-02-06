const { DataTypes } = require('sequelize')
const db = require('../connection/db.connection.js')

module.exports = db.define(
   'orders',
   {
      orders_id: {
         type: DataTypes.BIGINT.UNSIGNED,
         primaryKey: true,
         unique: true,
         autoIncrement: true,
      },
      orders_user_id: {
         type: DataTypes.BIGINT.UNSIGNED,
         require: true,
      },
      orders_start: {
         type: DataTypes.DATE,
         require: true,
      },
      orders_end: {
         type: DataTypes.DATE,
         require: true,
      },
      orders_people_count: {
         type: DataTypes.SMALLINT,
         require: true,
      },
      orders_comment: {
         type: DataTypes.TEXT,
      },
      orders_skip: {
         type: DataTypes.SMALLINT,
         defaultValue: 2,
      },
      orders_pay: {
         type: DataTypes.TEXT,
      },
      orders_promo: {
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
