import ModuleDao from '../dao/moduleDao.js';
import logger from '../utils/logger.js';

class ModuleService {
  constructor() {
    this.moduleDao = new ModuleDao();
  }

  async setModuleStatus(moduleStatus) {
    try {
      logger.info(`Service: Tentative de définition du statut pour le module ${moduleStatus.module} et l'utilisateur ${moduleStatus.email}`);
      const result = await this.moduleDao.setModuleStatus(moduleStatus);
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
}

export default ModuleService;