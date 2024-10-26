const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'BarbeariaApp',
  password: '!@#admin',
  port: 5432
});

// Exportar a pool para ser usada em outros lugares
module.exports = pool;