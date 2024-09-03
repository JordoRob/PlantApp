require("dotenv").config();
const pg = require("pg");

const database = process.env.PGDATABASE;
const conString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;


var client = new pg.Client(conString);
client.connect();

module.exports = client;

// const pool = new Pool({
//   connectionString: connectionString,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
//   end: () => pool.end(),
// };