import NogDao from '../dao/nogDao.js';
import logger from '../utils/logger.js';

class NogService {
  constructor() {
    this.nogDao = new NogDao();
  }

  async getCoordonneesNog(dosPgi) {
    try {
      logger.info('Service: Récupération des coordonnees');
      const nogs = await this.nogDao.getCoordonneesNog(dosPgi);
      return {
        success: true,
        data: nogs,
        count: nogs.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des coordonnees:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des coordonnees'
      };
    }
  }

  async getTypeMissionNaureNog() {
    try {
      logger.info('Service: Récupération des type mission nature');
      const nogs = await this.nogDao.getTypeMissionNaureNog();
      return {
        success: true,
        data: nogs,
        count: nogs.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des type mission nature:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des type mission nature'
      };
    }
  }
}

export default NogService;