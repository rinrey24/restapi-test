const serviceRepo = require('../repositories/service.repository');

async function getServices() {
  return await serviceRepo.findAll();
}

module.exports = {  getServices };