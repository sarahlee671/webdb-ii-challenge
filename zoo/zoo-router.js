const knex = require('knex');

const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/rolex.db3',
    },
    useNullAsDefault: true, //required only for sqlite3
  };
  
  const db = knex(knexConfig);


module.exports = router;