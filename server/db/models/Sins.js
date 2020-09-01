const Sequelize = require("sequelize") //for things like Sequelize.STRING
const db = require('../db')
const { STRING } = Sequelize;

//define your model
const Sin = db.define('sin', {
    name: {
        type: STRING
    },
    imageURL: {
        type: STRING
    }

})

const Stats = db.define('stats', {
    name: {
        type: STRING
    },
    sin: {
        type: STRING
    },
    race: {
        type: STRING
    },
    ability: {
        type: STRING
    },
    power: {
        type: STRING
    },
    treasure: {
        type: STRING
    }
})

//define any class or instance methods

const syncAndSeed = async () => {
    await db.sync({ force: true});

    let sins = [
        {
            name: 'Meliodas',
            imageURL: ''
        }
    ];

    let stats = [
        {
            name: 'Dragon',
            sin: 'Wrath',
            race: 'Demon',
            ability: 'Full Counter',
            power: '142,000',
            treasure: 'Lostvayne',
        }
    ];

    sins = await Promise.all(sins.map( sin => Sins.create(sin)));

    sins = sins.reduce( (acc, sin) => {
        acc[sin.name] = sin;
        return acc;
    }, {});

    stats = await Promise.all(stats.map( stat => Stats.create(stat)));

    stats = stats.reduce( (acc, stat) => {
        acc[stat.name] = stat;
        return acc;
    }, {});
}

//export your model
module.exports = {
    syncAndSeed,
    models: {
        Sin,
        Stats
    }
}