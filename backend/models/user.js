const pool = require('../config/database');

async function createUsers({ name, email, password, role, companyName }) {
  const result = await pool.query(
    'INSERT INTO "users" (name, email, password, role, "companyName", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
    [name, email, password, role, companyName]
  );
  return result.rows[0];
}

// Find user by email (for checking duplicates or login)
async function findUserByEmail(email) {
  const result = await pool.query(
    'SELECT * FROM "users" WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

// Find user by ID
async function findUserById(id) {
  const result = await pool.query(
    'SELECT * FROM "users" WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createUsers,
  findUserByEmail,
  findUserById, 
};