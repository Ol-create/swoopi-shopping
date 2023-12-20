import pool from "./config/db.js";

const createCategoryTableQuery = `
  CREATE TABLE IF NOT EXISTS Category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE
  )
`;

async function createCategoryTable() {
  try {
    const client = await pool.connect();
    await client.query(createCategoryTableQuery);
    console.log("Category table created or already exists.");
    client.release();
  } catch (error) {
    console.error("Error creating Category table:", error);
  }
}

async function prepopulateCategories() {
  const categories = [
    "Electronics",
    "Apparel and Fashion",
    "Beauty and Personal Care",
    "Home and Kitchen Appliances",
    "Health and Wellness",
    "Toys and Games",
    "Books and Stationery",
    "Sports and Outdoor Gear",
    "Automotive Products",
    "Food and Beverages",
  ];

  try {
    const client = await pool.connect();
    await createCategoryTable(); // Create the Category table first
    for (const category of categories) {
      const insertQuery =
        "INSERT INTO Category (category_name) VALUES ($1) ON CONFLICT DO NOTHING";
      await client.query(insertQuery, [category]);
      console.log(`Inserted category: ${category}`);
    }
    console.log("Inserted all categories successfully!")
    client.release();
  } catch (error) {
    console.error("Error prepopulating categories:", error);
  }
}

prepopulateCategories();
