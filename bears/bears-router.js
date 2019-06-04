const knex = require('knex');

const router = require ('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3',
    },
    useNullAsDefault: true,
};

const bearsData = knex(knexConfig);

router.get('/', (req, res) => {
    bearsData('bears')
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  })

  module.exports = router;