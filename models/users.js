import pool from "../config/db.js"

// Query to Create User Table
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('customer', 'vendor'))
  );
`;

// Connect to the database and create the users table if it doesn't exist
pool
  .query(createUsersTableQuery)
  .then(() => {
    console.log("Users table created or already exists.");
    // pool.end(); // Close the connection pool
  })
  .catch((err) => {
    console.error("Error creating users table:", err);
    pool.end(); // Close the connection pool
  });

export default pool;
