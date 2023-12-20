import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config()

import pool from "../config/db.js";

async function register(req, res) {
  const { name, email, password, userType } = req.body;

  // Hash and salt the password before storing it
  const saltRound = parseInt(process.env.SALT_ROUND) 
  const hashedPassword = await bcrypt.hash(password, saltRound);

  try {
    const query = {
      text: "INSERT INTO users(name, email, password, user_type) VALUES($1, $2, $3, $4) RETURNING *",
      values: [name, email, hashedPassword, userType],
    };

    const result = await pool.query(query);
    res
      .status(201)
      .json({ message: "User registered successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default register