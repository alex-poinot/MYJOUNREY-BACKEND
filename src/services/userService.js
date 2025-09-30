import UserDao from '../dao/userDao.js';
import logger from '../utils/logger.js';

class UserService {
  constructor() {
    this.userDao = new UserDao();
  }

  async getAllUsers() {
    try {
      logger.info('Service: Récupération de tous les utilisateurs');
      const users = await this.userDao.getAllUsers();
      return {
        success: true,
        data: users,
        count: users.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des utilisateurs:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des utilisateurs'
      };
    }
  }

  async getAllAdminUsers() {
    try {
      logger.info('Service: Récupération de tous les admins');
      const admins = await this.userDao.getAllAdminUsers();
      return {
        success: true,
        data: admins,
        count: admins.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des admins:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des admins'
      };
    }
  }
}

export default UserService;