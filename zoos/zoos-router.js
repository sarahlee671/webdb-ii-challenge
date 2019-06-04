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

// router.get('/:id', (req, res) => {

// })

router.post('/', (req, res) => {
  db('zoos').insert(req.body, 'ids').then(ids => {
      res.status(201).json(req.body)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});





module.exports = router;