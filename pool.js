const Pool = require("pg").Pool;
// require("dotenv").config();

// const pool = new Pool({
//   host: process.env.HOST_NAME,
//   user: process.env.USER_NAME,
//   password: process.env.PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.PG_PORT,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "20020124",
  port: 5432,
});

module.exports = pool;
