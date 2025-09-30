import FilterDao from '../dao/filterDao.js';
import logger from '../utils/logger.js';

class FilterService {
  constructor() {
    this.filterDao = new FilterDao();
  }

  async getAllGroupesFilter() {

    try {
      logger.info(`Service: Récupération de tous les filters pour le groupe`);
      const filters = await this.filterDao.getAllGroupesFilter();
      return {
        success: true,
        data: filters,
        count: filters.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des filters pour le groupe:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des filters pour le groupe'
      };
    }
  }

  async getAllDossiersFilter() {

    try {
      logger.info(`Service: Récupération de tous les filters pour le dossier`);
      const filters = await this.filterDao.getAllDossiersFilter();
      return {
        success: true,
        data: filters,
        count: filters.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des filters pour le dossier:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des filters pour le dossier'
      };
    }
  }

  async getAllBureauxFilter() {

    try {
      logger.info(`Service: Récupération de tous les filters pour les bureaux`);
      const filters = await this.filterDao.getAllBureauxFilter();
      return {
        success: true,
        data: filters,
        count: filters.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des filters pour les bureaux:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des filters pour les bureaux'
      };
    }
  }

  async getAllMissionsFilter() {

    try {
      logger.info(`Service: Récupération de tous les filters pour les missions`);
      const filters = await this.filterDao.getAllMissionsFilter();
      return {
        success: true,
        data: filters,
        count: filters.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des filters pour les missions:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des filters pour les missions'
      };
    }
  }

  async getAllMillesimesFilter() {

    try {
      logger.info(`Service: Récupération de tous les filters pour les millesimes`);
      const filters = await this.filterDao.getAllMillesimesFilter();
      return {
        success: true,
        data: filters,
        count: filters.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des filters pour les millesimes:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des filters pour les millesimes'
      };
    }
  }

  async getAllFormesJuridiqueFilter() {

    try {
      logger.info(`Service: Récupération de tous les filters pour les formes juridique`);
      const filters = await this.filterDao.getAllFormesJuridiqueFilter();
      return {
        success: true,
        data: filters,
        count: filters.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des filters pour les formes juridique:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des filters pour les formes juridique'
      };
    }
  }

  async getAllNafsFilter() {

    try {
      logger.info(`Service: Récupération de tous les filters pour les nafs`);
      const filters = await this.filterDao.getAllNafsFilter();
      return {
        success: true,
        data: filters,
        count: filters.length
      };
    } catch (error) {
      logger.error('Service: Erreur lors de la récupération des filters pour les nafs:', error);
      throw {
        status: 500,
        message: 'Erreur lors de la récupération des filters pour les nafs'
      };
    }
  }
}

export default FilterService;