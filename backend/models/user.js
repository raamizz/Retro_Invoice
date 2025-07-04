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
    `
    SELECT u., o.
    FROM users u
    LEFT JOIN user_org uo ON u.id = uo.user_id
    LEFT JOIN organization o ON uo.org_id = o.id
    WHERE u.email = $1
    `,
    [email]
  );
  return result.rows;
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