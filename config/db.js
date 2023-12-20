import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: "Food Delivery",
  port: 5432, 
});

// Query to Create User Table
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('customer', 'vendor'))
  );

  CREATE TABLE IF NOT EXISTS Category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL CHECK (user_type IN ('Apparel and Fashion',
    'Beauty and Personal Care', 'Home and Kitchen Appliances', 'Health and Wellness',
    'Home and Kitchen Appliances', 'Toys and Games', 'Books and Stationery',
    'Sports and Outdoor Gear',
    'Automotive Products', 'Food and Beverages'))
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
