import FileDao from '../dao/fileDao.js';
import logger from '../utils/logger.js';

class FileService {
  constructor() {
    this.fileDao = new FileDao();
  }

  async setModuleFile(moduleFile) {
    try {
      logger.info(`Service: Tentative de définition du fichier pour le module ${moduleFile.module} et l'utilisateur ${moduleFile.email}`);
      const result = await this.fileDao.setModuleFile(moduleFile);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la définition du fichier :', error);
      throw {
        status: 500,
        message: 'Erreur lors de la définition du fichier'
      };
    }
  }

  async getModuleFiles(missionIdDosPgiDosGroupe, module, profilId, source) {
    try {
      logger.info(`Service: Tentative de récupération des fichiers pour le module ${module} et l'utilisateur ${profilId}`);
      const result = await this.fileDao.getModuleFiles(missionIdDosPgiDosGroupe, module, profilId, source);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des fichiers :', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des fichiers'
      };
    }
  }

  async deleteModuleFile(fileId, email, source, missionIdDosPgiDosGroupe, module, mailPriseProfil) {
    try {
      logger.info(`Service: Tentative de suppression du fichier avec l'ID ${fileId}`);
      const result = await this.fileDao.deleteModuleFile(fileId, email, source, missionIdDosPgiDosGroupe, module, mailPriseProfil);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la suppression du fichier :', error);
      throw {
        status: 500,
        message: 'Erreur lors de la suppression du fichier'
      };
    }
  }
}

export default FileService;