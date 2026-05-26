const bannerRepo = require('../repositories/banner.repository');

async function getBanners() {
  return await bannerRepo.findAll();
}


module.exports = { getBanners };