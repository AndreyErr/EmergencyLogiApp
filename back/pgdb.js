const Pool = require('pg').Pool
const pool = new Pool({
    connectionString: process.env.DBConnLink
    // user: process.env.DBUsername,
    // password: process.env.DBPassword,
    // host: process.env.DBHost,
    // port: Number(process.env.DBPort),
    // database: process.env.DBDatabase
})

module.exports = pool