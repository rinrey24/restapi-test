const pool = require('../config/database');
const balanceRepo = require('../repositories/balance.repository');
const serviceRepo = require('../repositories/service.repository');
const transactionRepo = require('../repositories/transaction.repository');
const { generateInvoiceNumber } = require('../utils/gen-invoice');
const AppError = require('../utils/app-error');

async function topUp(userId, amount) {
  if (!amount || amount <= 0) {
    throw new AppError(400, 102, 'Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0');
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Tambah saldo
    const newBalance = await balanceRepo.addBalance(client, userId, amount);

    // 2. Catat di riwayat transaksi
    const invoice = generateInvoiceNumber();
    await transactionRepo.create(client, {
      invoiceNumber: invoice,
      userId,
      transactionType: 'TOPUP',
      serviceCode: null,
      description: 'Top Up Balance',
      totalAmount: amount,
    });

    await client.query('COMMIT');
    return { balance: newBalance };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release(); // WAJIB — kembalikan koneksi ke pool
  }
}

async function payment(userId, serviceCode) {
  // 1. Cek service_code valid
  const service = await serviceRepo.findByCode(serviceCode);
  if (!service) {
    throw new AppError(400, 102, 'Service atau Layanan tidak ditemukan');
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 2. Kurangi saldo — akan throw error kalau saldo tidak cukup
    const newBalance = await balanceRepo.deductBalance(client, userId, service.service_tariff);

    // 3. Catat transaksi
    const invoice = generateInvoiceNumber();
    const transaction = await transactionRepo.create(client, {
      invoiceNumber: invoice,
      userId,
      transactionType: 'PAYMENT',
      serviceCode: service.service_code,
      description: service.service_name,
      totalAmount: service.service_tariff,
    });

    await client.query('COMMIT');

    return {
      invoice_number: transaction.invoice_number,
      service_code: service.service_code,
      service_name: service.service_name,
      transaction_type: transaction.transaction_type,
      total_amount: transaction.total_amount,
      created_on: transaction.created_on,
    };
  } catch (err) {
    await client.query('ROLLBACK');

    // Bedakan error saldo tidak cukup vs error lain
    if (err.message === 'Saldo tidak mencukupi') {
      throw new AppError(400, 102, 'Saldo tidak mencukupi');
    }
    throw err;
  } finally {
    client.release();
  }
}

async function getHistory(userId, offset = 0, limit = 0) {
  // limit = 0 artinya ambil semua (sesuai Swagger — kalau tidak ada limit param)
  const effectiveLimit = limit > 0 ? limit : null;
  const effectiveOffset = offset >= 0 ? offset : 0;

  // Kalau limit null, ambil semua dengan query tanpa LIMIT
  let rows;
  if (effectiveLimit === null) {
    const query = `
      SELECT invoice_number, transaction_type, description, total_amount, created_on
      FROM transactions
      WHERE user_id = $1
      ORDER BY created_on DESC
      OFFSET $2
    `;
    const result = await pool.query(query, [userId, effectiveOffset]);
    rows = result.rows;
  } else {
    rows = await transactionRepo.findByUserId(userId, effectiveLimit, effectiveOffset);
  }

  return {
    offset: effectiveOffset,
    limit: effectiveLimit || 0,
    records: rows,
  };
}

module.exports = { topUp, payment, getHistory };