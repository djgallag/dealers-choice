const db = require('./db');
const { Sins, Stats } = require('./db')

//state your model associations (hasOne etc)
Sins.hasOne(Stats)
Stats.BelongsTo(Sins)

//export your db and Models (so they all can be imported from a single central location)
module.exports = {
    db,
    models: {
        Sins,
        Stats
    }
}