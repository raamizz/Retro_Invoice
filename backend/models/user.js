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
    `SELECT u.*, 
            o.id as org_id, 
            o.name as org_name, 
            o.address as org_address
            FROM "users" u 
     LEFT JOIN "user_org" uo ON u.id = uo.user_id 
     LEFT JOIN "organization" o ON uo.org_id = o.id 
     WHERE u.email = $1`,
    [email]
  );
  if (result.rows.length === 0) return null;

  // Extract user fields from the first row
  const user = {
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email,
    password : result.rows[0].password,
    role: result.rows[0].role,
    companyName: result.rows[0].companyName,
    organizations: []
  };

  // Collect organizations
  user.organizations = result.rows.filter(row => row.org_id).map(row => ({
    id: row.org_id,
    name: row.org_name,
    address: row.org_address
  }));
  
  return user;
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