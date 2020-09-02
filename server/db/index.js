const db = require('./db');
const { syncAndSeed, Character, Stat } = require('./models/Sins.js')

//state your model associations (hasOne etc)
Character.hasOne(Stat)
Stat.belongsTo(Character)

//export your db and Models (so they all can be imported from a single central location)
module.exports = {
    db,
    syncAndSeed,
    Character,
    Stat
}