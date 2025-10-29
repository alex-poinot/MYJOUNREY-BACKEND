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

  async getTypeMissionNatureNog() {
    try {
      logger.info('Service: Récupération des type mission nature');
      const nogs = await this.nogDao.getTypeMissionNatureNog();
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

  async getListeDiligenceDefault() {
    try {
      logger.info('Service: Récupération des diligences');
      const nogs = await this.nogDao.getListeDiligenceDefault();
      return {
        success: true,
        data: nogs,
        count: nogs.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des diligences:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des diligences'
      };
    }
  }

  async getListeDiligenceBibliotheque() {
    try {
      logger.info('Service: Récupération des diligences');
      const nogs = await this.nogDao.getListeDiligenceBibliotheque();
      return {
        success: true,
        data: nogs,
        count: nogs.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des diligences:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des diligences'
      };
    }
  }

  async verifNogLoad(codeAffaire) {
    try {
      logger.info('Service: Récupération des donnees nog');
      const nogs = await this.nogDao.verifNogLoad(codeAffaire);
      return {
        success: true,
        data: nogs,
        count: nogs.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des donnees nog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des donnees nog'
      };
    }
  }

  async insertNogCoordonnees(obj) {
    try {
      logger.info('Service: Insertion des coordonnees');
      const nogs = await this.nogDao.insertNogCoordonnees(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion des coordonnees:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion des coordonnees'
      };
    }
  }

  async insertNogContacts(obj) {
    try {
      logger.info('Service: Insertion des contacts');
      const nogs = await this.nogDao.insertNogContacts(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion des contacts:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion des contacts'
      };
    }
  }

  async insertNogAssocies(obj) {
    try {
      logger.info('Service: Insertion des associes');
      const nogs = await this.nogDao.insertNogAssocies(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion des associes:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion des associes'
      };
    }
  }

  async insertNogCS(obj) {
    try {
      logger.info('Service: Insertion des CS');
      const nogs = await this.nogDao.insertNogCS(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion des CS:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion des CS'
      };
    }
  }

  async insertNogTypeMission(obj) {
    try {
      logger.info('Service: Insertion du type mission');
      const nogs = await this.nogDao.insertNogTypeMission(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion du type mission:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion du type mission'
      };
    }
  }

  async insertNogNatureMission(obj) {
    try {
      logger.info('Service: Insertion du nature mission');
      const nogs = await this.nogDao.insertNogNatureMission(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion du nature mission:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion du nature mission'
      };
    }
  }

  async insertNogPlanning(obj) {
    try {
      logger.info('Service: Insertion du planning');
      const nogs = await this.nogDao.insertNogPlanning(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion du planning:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion du planning'
      };
    }
  }

  async insertNogEquipeInter(obj) {
    try {
      logger.info('Service: Insertion de l\'equipe inter');
      const nogs = await this.nogDao.insertNogEquipeInter(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion de l\'equipe inter:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion de l\'equipe inter'
      };
    }
  }

  async insertNogLogiciel(obj) {
    try {
      logger.info('Service: Insertion des logiciels');
      const nogs = await this.nogDao.insertNogLogiciel(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion des logiciels:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion des logiciels'
      };
    }
  }

  async insertNogFE(obj) {
    try {
      logger.info('Service: Insertion FE');
      const nogs = await this.nogDao.insertNogFE(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion FE:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion FE'
      };
    }
  }

  async insertNogVigilance(obj) {
    try {
      logger.info('Service: Insertion Vigilance');
      const nogs = await this.nogDao.insertNogVigilance(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion Vigilance:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion Vigilance'
      };
    }
  }

  async insertNogDiligence(obj) {
    try {
      logger.info('Service: Insertion diligence');
      const nogs = await this.nogDao.insertNogDiligence(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion diligence:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion diligence'
      };
    }
  }

  async insertNogModuleTexte(obj) {
    try {
      logger.info('Service: Insertion module texte');
      const nogs = await this.nogDao.insertNogModuleTexte(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion module texte:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion module texte'
      };
    }
  }

  async insertNogValue(obj) {
    try {
      logger.info('Service: Insertion value');
      const nogs = await this.nogDao.insertNogValue(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion value:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion value'
      };
    }
  }

  async insertNogFileAnnexe(obj) {
    try {
      logger.info('Service: Insertion file');
      const nogs = await this.nogDao.insertNogFileAnnexe(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion file:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion file'
      };
    }
  }

  async insertNogDiligenceAdd(obj) {
    try {
      logger.info('Service: Insertion diligence add');
      const nogs = await this.nogDao.insertNogDiligenceAdd(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion diligence add:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion diligence add'
      };
    }
  }

  async insertNogDiligenceLab(obj) {
    try {
      logger.info('Service: Insertion diligence lab');
      const nogs = await this.nogDao.insertNogDiligenceLab(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de l\'insertion diligence lab:', error);
      throw {
        status: 500,
        message: 'Erreur lors de l\'insertion diligence lab'
      };
    }
  }

  async getListeValeurUnique(codeAffaire) {
    try {
      logger.info('Service: getListeValeurUnique');
      const nogs = await this.nogDao.getListeValeurUnique(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getListeValeurUnique:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getListeValeurUnique'
      };
    }
  }

  async getPlanningMJNog(codeAffaire) {
    try {
      logger.info('Service: getPlanningMJNog');
      const nogs = await this.nogDao.getPlanningMJNog(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getPlanningMJNog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getPlanningMJNog'
      };
    }
  }

  async getEquipeInterMJNog(codeAffaire) {
    try {
      logger.info('Service: getEquipeInterMJNog');
      const nogs = await this.nogDao.getEquipeInterMJNog(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getEquipeInterMJNog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getEquipeInterMJNog'
      };
    }
  }

  async getContactMJNog(codeAffaire) {
    try {
      logger.info('Service: getContactMJNog');
      const nogs = await this.nogDao.getContactMJNog(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getContactMJNog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getContactMJNog'
      };
    }
  }

  async getAssocieMJNog(codeAffaire) {
    try {
      logger.info('Service: getAssocieMJNog');
      const nogs = await this.nogDao.getAssocieMJNog(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getAssocieMJNog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getAssocieMJNog'
      };
    }
  }

  async getLogicielMJNog(codeAffaire) {
    try {
      logger.info('Service: getLogicielMJNog');
      const nogs = await this.nogDao.getLogicielMJNog(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getLogicielMJNog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getLogicielMJNog'
      };
    }
  }

  async getDiligenceMJNog(codeAffaire) {
    try {
      logger.info('Service: getDiligenceMJNog');
      const nogs = await this.nogDao.getDiligenceMJNog(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getDiligenceMJNog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getDiligenceMJNog'
      };
    }
  }

  async getDiligenceLabMJNog(codeAffaire) {
    try {
      logger.info('Service: getDiligenceLabMJNog');
      const nogs = await this.nogDao.getDiligenceLabMJNog(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getDiligenceLabMJNog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getDiligenceLabMJNog'
      };
    }
  }

  async getDiligenceAddMJNog(codeAffaire) {
    try {
      logger.info('Service: getDiligenceAddMJNog');
      const nogs = await this.nogDao.getDiligenceAddMJNog(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getDiligenceAddMJNog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getDiligenceAddMJNog'
      };
    }
  }

  async getFichiersAnnexeMJNog(codeAffaire) {
    try {
      logger.info('Service: getFichiersAnnexeMJNog');
      const nogs = await this.nogDao.getFichiersAnnexeMJNog(codeAffaire);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de getFichiersAnnexeMJNog:', error);
      throw {
        status: 500,
        message: 'Erreur lors de getFichiersAnnexeMJNog'
      };
    }
  }

  async updateValidationCollab(obj) {
    try {
      logger.info('Service: updateValidationCollab');
      const nogs = await this.nogDao.updateValidationCollab(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de updateValidationCollab:', error);
      throw {
        status: 500,
        message: 'Erreur lors de updateValidationCollab'
      };
    }
  }

  async updateValidationAssocie(obj) {
    try {
      logger.info('Service: updateValidationAssocie');
      const nogs = await this.nogDao.updateValidationAssocie(obj);
      return {
        success: true,
        data: nogs
      };
    } catch (error) {
      logger.error('Service: Erreur lors de updateValidationAssocie:', error);
      throw {
        status: 500,
        message: 'Erreur lors de updateValidationAssocie'
      };
    }
  }
}

export default NogService;