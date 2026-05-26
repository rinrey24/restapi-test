const pool = require('../config/database');

async function findByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
}

async function create(client, { email, firstName, lastName, hashedPassword }) {
  const query = `
    INSERT INTO users (email, first_name, last_name, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, first_name, last_name, profile_image
  `;
  const values = [email, firstName, lastName, hashedPassword];
  const result = await client.query(query, values);
  return result.rows[0];
}

async function updateProfile(userId, { firstName, lastName }) {
  const query = `
    UPDATE users
    SET first_name = $1, last_name = $2, updated_on = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING email, first_name, last_name, profile_image
  `;
  const result = await pool.query(query, [firstName, lastName, userId]);
  return result.rows[0];
}

async function updateProfileImage(userId, imageUrl) {
  const query = `
    UPDATE users
    SET profile_image = $1, updated_on = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING email, first_name, last_name, profile_image
  `;
  const result = await pool.query(query, [imageUrl, userId]);
  return result.rows[0];
}

module.exports = { findByEmail, create, updateProfile, updateProfileImage };