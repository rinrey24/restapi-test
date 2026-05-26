const bcrypt = require('bcrypt');
const pool = require('../config/database');
const userRepo = require('../repositories/user.repository');
const balanceRepo = require('../repositories/balance.repository');
const { generateToken } = require('../utils/jwt');
const AppError = require('../utils/app-error');

async function register({ email, first_name, last_name, password }) {

  const existing = await userRepo.findByEmail(email);
  if (existing) {
    throw new AppError(400, 102, 'Email sudah terdaftar');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const user = await userRepo.create(client, {
      email,
      firstName: first_name,
      lastName: last_name,
      hashedPassword,
    });

    await balanceRepo.create(client, user.id, 0);

    await client.query('COMMIT');
    return user;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function login({ email, password }) {
  const user = await userRepo.findByEmail(email);
  if (!user) {
    throw new AppError(401, 103, 'Username atau password salah');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AppError(401, 103, 'Username atau password salah');
  }

  const token = generateToken({ userId: user.id, email: user.email });
  return token;
}

module.exports = { register, login };