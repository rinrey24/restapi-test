const pool = require('../config/database');

async function findAll() {
  const query = 'SELECT banner_name, banner_image, description FROM banners ORDER BY id';
  const result = await pool.query(query);
  return result.rows;
}

module.exports = { findAll };