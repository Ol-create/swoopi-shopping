import { Pool } from "pg";

const pool = new Pool({
  user: "oluola96",
  password: "oluola1992",
  host: "localhost",
  database: "Food Delivery",
  post: "5432",
});

// Query to Create Tables for Database

const createTablesQuery = `
--Create User Table
  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('customer', 'vendor'))
);
`;

// Connect to the database and create multiple tables
pool
  .query(createTablesQuery)
  .then(() => {
    console.log("Tables created successfully.");
    pool.end(); // Close the connection pool
  })
  .catch((err) => {
    console.error("Error creating tables:", err);
    pool.end(); // Close the connection pool
  });

