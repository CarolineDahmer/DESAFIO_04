const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'tacops1996',
        database: 'pdv'
    }
});

module.exports = knex;