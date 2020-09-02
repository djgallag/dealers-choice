const express = require("express")
const app = express();
const path = require('path')
const morgan = require('morgan')
const { syncAndSeed, Character, Stat } = require('./db')

app.use(morgan('dev'))
app.use(require('body-parser').json());

app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
//require in your routes and use them on your api path

app.get('/api/characters', async(req, res, next)=> {
    try {
      res.send(await Character.findAll());
    }
    catch(ex){
      next(ex);
    }
  });

  app.get('/api/characters/:characterId/stats', async(req, res, next)=> {
    try {
      res.send(await Stat.findAll({ where: { characterId: req.params.characterId }, include: [{ model: Character}] }));
    }
    catch(ex){
      next(ex);
    }
  });

//404 handler

//500 handler

const port = 3000

const init = async () => {
  try {
    await syncAndSeed();
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (err) {
    console.log(`There was an error starting up!`, err);
  }
}

init();