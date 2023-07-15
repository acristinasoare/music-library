const { Pool } = require("pg"); //imports the pool object from 'pg' module => a connection pool that manages multiple connections to the PostgreSQL database
const pool = new Pool(); //creates a new instance of the pool object -> will be used to establish connections with the database

module.exports = { query: (text, params) => pool.query(text, params) };
//exports an object from this module, the object has a single property called query
//query is a function that takes two parameteres. When it is called, is uses the pool.query
//method to execute a query on the database
//the 'text' parameter represents the SQL query string
//the 'params' parameter is an optional array of query parameters
// exporting this allows other modules in the app to use the 'query' method to
//send SQL queries to the PostgreSQL database
