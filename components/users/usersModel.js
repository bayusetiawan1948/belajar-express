// get the client
const mysql = require('mysql2/promise');
const db = require('./../../utils/database.js');

async function getData() {
  try {
    const data = await db.query(
      'SELECT id, name, sex, relgion, birth_date, phone_number FROM users'
    );
    return data;
  } catch (error) {
    console.info(error);
  }
}

module.exports = { getData };

// const usersModel = [];

// module.exports = usersModel;

// contoh

// async function example1 () {
//   const mysql = require('mysql2/promise');
//   const conn = await mysql.createConnection({ database: test });
//   const [rows, fields] = await conn.execute('select ?+? as sum', [2, 2]);
//   await conn.end();
// }

// async function example2 () {
//   const mysql = require('mysql2/promise');
//   const pool = mysql.createPool({database: test});
//   execute in parallel, next console.log in 3 seconds
//   await Promise.all([pool.query('select sleep(2)'), pool.query('select sleep(3)')]);
//   console.log('3 seconds after');
//   await pool.end();
// }
