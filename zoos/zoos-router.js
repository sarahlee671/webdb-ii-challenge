const knex = require('knex');

const router = require('express').Router();

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3',
  },
  useNullAsDefault: true, //required only for sqlite3
};
  
const db = knex(knexConfig);

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    })
})


router.put('/:id', (req, res) => {
  const changes = req.body;
  db('zoos')
  .where({id: req.params.id})
  .update(changes)
  .then(zoo => {
      res.status(200).json({changes})
  })
  .catch(error => {
    res.status(500).json(error)
  })
});





module.exports = router;