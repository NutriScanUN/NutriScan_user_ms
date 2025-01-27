// externalApiService.js
require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.BASE_URL_STORE_MS;

module.exports = {
  async getStoreById(id) {
    const response = await axios.get(`${BASE_URL}/store/user/${id}`);
    return response.data;
  },
};

