const pool = require('../config/database');

async function findAll() {
  const query = 'SELECT service_code, service_name, service_icon, service_tariff FROM services ORDER BY id';
  const result = await pool.query(query);
  return result.rows;
}

async function findByCode(serviceCode) {
  const query = 'SELECT * FROM services WHERE service_code = $1';
  const result = await pool.query(query, [serviceCode]);
  return result.rows[0] || null;
}

module.exports = { findAll, findByCode };