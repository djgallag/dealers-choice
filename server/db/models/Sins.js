const Sequelize = require("sequelize") //for things like Sequelize.STRING
const db = require('../db')
const { STRING } = Sequelize;

//define your model
const Character = db.define('character', {
    name: {
        type: STRING
    },
    imageURL: {
        type: STRING
    }

})

const Stat = db.define('stat', {
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

    let characters = [
        {
            name: 'Meliodas',
            imageURL: 'https://i1.sndcdn.com/avatars-000560328765-wu8rvi-t500x500.jpg'
        },
        {
            name: 'King',
            imageURL: 'https://cdn.myanimelist.net/images/characters/16/277006.jpg'
        },
        {
            name: 'Diane',
            imageURL: 'https://i.pinimg.com/236x/3d/57/38/3d5738d2e6f3232808c651b73039eaba.jpg'
        },
        {
            name: 'Merlin',
            imageURL: 'https://pm1.narvii.com/6836/2120ea1eb0b9838ecadad06bc1b5e760c49e7b39v2_hq.jpg'
        },
        {
            name: 'Ban',
            imageURL: 'https://i.pinimg.com/236x/29/c3/e7/29c3e750ba0ae062a37e7d8ae3e4fb1d.jpg'
        },
        {
            name: 'Gowther',
            imageURL: 'https://vignette.wikia.nocookie.net/p__/images/a/a5/Gowther_Anime.png/revision/latest/scale-to-width-down/340?cb=20151115203751&path-prefix=protagonist'
        },
        {
            name: 'Escanor',
            imageURL: 'https://cdn.myanimelist.net/r/360x360/images/characters/10/406047.jpg?s=3a14accd6ff4e748fac728bb3c4ac850'
        },
    ];

    let stats = [
        {
            name: 'Dragon',
            sin: 'Wrath',
            race: 'Demon',
            ability: 'Full Counter',
            power: '142,000',
            treasure: 'The Demon Sword, Lostvayne'
        },
        {
            name: 'Grizzly',
            sin: 'Sloth',
            race: 'Fairy',
            ability: 'Disaster',
            power: '41,600',
            treasure: 'The Spirit Spear, Chastiefol'
        },
        {
            name: 'Serpent',
            sin: 'Envy',
            race: 'Giant',
            ability: 'Creation',
            power: '8,800',
            treasure: 'The War Hammer, Gideon'
        },
        {
            name: 'Boar',
            sin: 'Lust',
            race: 'Human',
            ability: 'Infinity',
            power: '4,710',
            treasure: 'The Morning Star, Aldan'
        },
        {
            name: 'Fox',
            sin: 'Greed',
            race: 'Human',
            ability: 'Snatch',
            power: '3,220',
            treasure: 'The Holy Rod, Courechouse'
        },
        {
            name: 'Goat',
            sin: 'Lust',
            race: 'Doll',
            ability: 'Invastion',
            power: '35,400',
            treasure: 'The Twin bow, Herritt'
        },
        {
            name: 'Lion',
            sin: 'Pride',
            race: 'Human',
            ability: 'Sunshine',
            power: 'Immeasurable - scales with daylight',
            treasure: 'The Divine Axe, Rhitta'
        },
    ];

    characters = await Promise.all(characters.map( character => Character.create(character)));

    characters = characters.reduce( (acc, character) => {
        acc[character.name] = character;
        return acc;
    }, {});

    stats = await Promise.all(stats.map( (stat, index) => {
        stat.characterId = index + 1;
        return Stat.create(stat);
    }));

    stats = stats.reduce( (acc, stat) => {
        acc[stat.name] = stat;
        return acc;
    }, {});
}

//export your model
module.exports = {
    syncAndSeed,
    Character,
    Stat
}