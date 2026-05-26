const pool = require('../config/database');

async function create(client, userId, initialBalance = 0) {
  const query = `
    INSERT INTO balances (user_id, balance)
    VALUES ($1, $2)
    RETURNING balance
  `;
  const result = await client.query(query, [userId, initialBalance]);
  return result.rows[0];
}

async function getByUserId(userId) {
  const query = 'SELECT balance FROM balances WHERE user_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[0] ? Number(result.rows[0].balance) : 0;
}

async function addBalance(client, userId, amount) {
  const query = `
    UPDATE balances
    SET balance = balance + $1, updated_on = CURRENT_TIMESTAMP
    WHERE user_id = $2
    RETURNING balance
  `;
  const result = await client.query(query, [amount, userId]);
  return Number(result.rows[0].balance);
}

async function deductBalance(client, userId, amount) {
  const query = `
    UPDATE balances
    SET balance = balance - $1, updated_on = CURRENT_TIMESTAMP
    WHERE user_id = $2 AND balance >= $1
    RETURNING balance
  `;
  const result = await client.query(query, [amount, userId]);
  if (result.rows.length === 0) {
    throw new Error('Saldo tidak mencukupi');
  }
  return Number(result.rows[0].balance);
}

module.exports = { create, getByUserId, addBalance, deductBalance };