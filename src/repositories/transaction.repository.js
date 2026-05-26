const pool = require('../config/database');

async function create(client, { invoiceNumber, userId, transactionType, serviceCode, description, totalAmount }) {
  const query = `
    INSERT INTO transactions
      (invoice_number, user_id, transaction_type, service_code, description, total_amount)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING invoice_number, transaction_type, description, total_amount, created_on
  `;
  const values = [invoiceNumber, userId, transactionType, serviceCode, description, totalAmount];
  const result = await client.query(query, values);
  return result.rows[0];
}

async function findByUserId(userId, limit, offset) {
  const query = `
    SELECT
      invoice_number,
      transaction_type,
      description,
      total_amount,
      created_on
    FROM transactions
    WHERE user_id = $1
    ORDER BY created_on DESC
    LIMIT $2 OFFSET $3
  `;
  const result = await pool.query(query, [userId, limit, offset]);
  return result.rows;
}

async function countByUserId(userId) {
  const query = 'SELECT COUNT(*) FROM transactions WHERE user_id = $1';
  const result = await pool.query(query, [userId]);
  return parseInt(result.rows[0].count);
}

module.exports = { create, findByUserId, countByUserId };