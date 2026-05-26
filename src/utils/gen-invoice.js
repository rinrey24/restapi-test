function generateInvoiceNumber() {
  const now = new Date();

  const day    = String(now.getDate()).padStart(2, '0');
  const month  = String(now.getMonth() + 1).padStart(2, '0');
  const year   = now.getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000; 

  return `INV${day}${month}${year}-${random}`;
}

module.exports = { generateInvoiceNumber };