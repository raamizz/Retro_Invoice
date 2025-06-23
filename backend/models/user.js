const pool = require('../config/database');

async function createUsers({ name, email, password, role, companyName }) {
  const result = await pool.query(
    'INSERT INTO "users" (name, email, password, role, "companyName") VALUES ($1, $2, $3, $4, $5) RETURNING *',
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

module.exports = {
  createUsers,
  findUserByEmail
};