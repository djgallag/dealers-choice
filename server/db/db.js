const Sequelize = require("sequelize")
//initialize your db, don't forget to include the possible heroku database URL
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/sins', {logging: false});

module.exports = db