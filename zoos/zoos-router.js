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

router.get('/:id', (req, res) => {
  db('zoos')
    .where({id: req.params.id})
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'Zoo with that ID does not exist'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

router.post('/', (req, res) => {
  db('zoos').insert(req.body, 'ids').then(ids => {
      res.status(201).json(req.body)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

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

router.delete('/:id', (req, res) => {
  db('zoos')
    .where({id: req.params.id})
    .del()
    .then(count => {
      if (count > 0) {
        const unit = count > 1 ? 'records': 'record';
        res.status(200).json({ message: `${count} ${unit} deleted`})
      } else {
        res.status(404).json({ message: 'zoo with the ID is not found'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});





module.exports = router;