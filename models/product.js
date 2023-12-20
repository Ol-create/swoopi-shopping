import pool from "../config/db.js";

// Query to Create Product Table
const createProductTable = `CREATE TABLE Product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES Category(category_id)
        ON DELETE CASCADE
);
`;

// Connect to the database and create the users table if it doesn't exist
pool
  .query(createProductTable)
  .then(() => {
    console.log("Product table created or already exists.");
  })
  .catch((err) => {
    console.error("Error creating Product table:", err);
    pool.end(); // Close the connection pool
  });

export default pool;