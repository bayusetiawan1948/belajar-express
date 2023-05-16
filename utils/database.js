const mysql = require('mysql2/promise');

const databaseConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'node_db',
};

async function query(sql, params) {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const [results] = await connection.execute(sql, params);
    await connection.end();
    return results;
  } catch (error) {
    console.info(error);
  }
}

module.exports = { query };
