const pool = require('../config/database');
const userRepo = require('../repositories/user.repository');
const balanceRepo = require('../repositories/balance.repository');
const AppError = require('../utils/app-error');
const path = require('path');

async function getProfile(userId) {
  const query = `
    SELECT email, first_name, last_name, profile_image
    FROM users WHERE id = $1
  `;
  const result = await pool.query(query, [userId]);
  if (!result.rows[0]) throw new AppError(401, 108, 'User tidak ditemukan');
  return result.rows[0];
}

async function updateProfile(userId, { first_name, last_name }) {
  const user = await userRepo.updateProfile(userId, { firstName: first_name, lastName: last_name });
  if (!user) throw new AppError(401, 108, 'User tidak ditemukan');
  return user;
}

async function updateProfileImage(userId, file) {
  if (!file) throw new AppError(400, 102, 'File gambar tidak ditemukan');

  const ext = path.extname(file.originalname).toLowerCase();
  if (!['.jpeg', '.png'].includes(ext)) {
    throw new AppError(400, 102, 'Format gambar tidak didukung. Gunakan jpeg atau png');
  }

  const imageUrl = `/uploads/${file.filename}`;
  const user = await userRepo.updateProfileImage(userId, imageUrl);
  return user;
}

async function getBalance(userId) {
  const balance = await balanceRepo.getByUserId(userId);
  return { balance };
}

module.exports = { getProfile, updateProfile, updateProfileImage, getBalance };