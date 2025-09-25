import LogDao from '../dao/logDao.js';
import logger from '../utils/logger.js';

class LogService {
  constructor() {
    this.logDao = new LogDao();
  }

  async setLog(log) {
    try {
      logger.info(`Service: Tentative de définition du statut pour le log ${log.log} et l'utilisateur ${log.email}`);
      const result = await this.logDao.setLog(log);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la définition du status :', error);
      throw {
        status: 500,
        message: 'Erreur lors de la définition du status'
      };
    }
  }

  async setLogMission(log) {
    try {
      logger.info(`Service: Tentative de définition du statut pour le log ${log.log} et l'utilisateur ${log.email}`);
      const result = await this.logDao.setLogMission(log);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la définition du status :', error);
      throw {
        status: 500,
        message: 'Erreur lors de la définition du status'
      };
    }
  }

  async setLogConnexion(logObj) {
    try {
      logger.info(`Service: Tentative de définition du log connexion pour la page ${logObj.page} et l'utilisateur ${logObj.email}`);
      const result = await this.logDao.setLogConnexion(logObj);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la définition du log connexion :', error);
      throw {
        status: 500,
        message: 'Erreur lors de la définition du log connexion'
      };
    }
  }
}

export default LogService;