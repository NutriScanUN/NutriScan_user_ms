// apiController.js
const externalApiService = require('../services/externalApiService');
const externalApiStoreService = require('../services/externalApiStoreService');
const { convertFirestoreTimestampToDate, convertDateToFirestoreTimestamp } = require('../utils/utils');

module.exports = {
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await externalApiService.getUserById(id);
      
      const store = await externalApiStoreService.getStoreById(id);
      user.data.store = store;

      // Convertir timestamps a fechas legibles
      user.data.fecha_registro = convertFirestoreTimestampToDate(user.data.fecha_registro);
      user.data.fecha_nacimiento = convertFirestoreTimestampToDate(user.data.fecha_nacimiento);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  },

  async createUser(req, res) {
    try {
      let userData = req.body;

      // Convertir fechas a Timestamp antes de guardar
      if (userData.fecha_nacimiento) {
        userData.fecha_nacimiento = convertDateToFirestoreTimestamp(userData.fecha_nacimiento);
      }
      userData.fecha_registro = convertDateToFirestoreTimestamp(new Date());

      const newUser = await externalApiService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      let userData = req.body;

      // Convertir fechas a Timestamp si existen
      if (userData.fecha_nacimiento) {
        userData.fecha_nacimiento = convertDateToFirestoreTimestamp(userData.fecha_nacimiento);
      }
      if (userData.fecha_registro) {
        userData.fecha_registro = convertDateToFirestoreTimestamp(userData.fecha_registro);
      }

      const updatedUser = await externalApiService.updateUser(id, userData);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await externalApiService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  },

  async isUserRegistered(req, res) {
    try {
      const { id } = req.params;
      const isRegistered = await externalApiService.checkUserRegistration(id);
      res.status(200).json({ registered: isRegistered });
    } catch (error) {
      res.status(500).json({ message: 'Error checking user registration', error });
    }
  },
};
