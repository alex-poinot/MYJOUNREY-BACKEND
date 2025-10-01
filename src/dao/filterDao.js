import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import sql from 'mssql';
import { getConnection } from '../config/database.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class FilterDao {
  constructor() {
    this.queries = null;
  }

  async loadQueries() {
    if (!this.queries) {
      try {
        const queriesPath = join(__dirname, '../SQL/filterQueries.yaml');
        const queriesContent = await fs.readFile(queriesPath, 'utf8');
        this.queries = yaml.load(queriesContent);
        logger.debug('Requêtes filters chargées depuis filterQueries.yaml');
      } catch (error) {
        logger.error('Erreur lors du chargement des requêtes YAML:', error);
        throw new Error('Impossible de charger les requêtes filters depuis le fichier YAML');
      }
    }
    return this.queries;
  }

  async getAllGroupesFilter() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllGroupesFilter;
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      let returnTab = [];

      for (const row of result.recordset) {
        let obj = new Object();
        obj['value'] = row.DOS_SOCIETEGROUPE.trim();
        obj['label'] = row.DOS_SOCIETEGROUPE.trim() + ' - ' + row.DOS_SOCIETEGROUPELIBELLE.trim();
        obj['selected'] = false;
        returnTab.push(obj);
      }      

      logger.info(`${returnTab.length} filters groupes`);

      return returnTab;
    } catch (err) {
      logger.error('Erreur getAllGroupesFilter : ', err);
      throw new Error('Erreur lors de la récupération des filters pour le tableau de bord');
    }
  }

  async getAllDossiersFilter() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllDossiersFilter;
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      let returnTab = [];

      for (const row of result.recordset) {
        let obj = new Object();
        obj['value'] = row.DOS_PGI.trim();
        obj['label'] = row.DOS_PGI.trim() + ' - ' + row.DOS_NOM.trim();
        obj['selected'] = false;
        returnTab.push(obj);
      }      

      logger.info(`${returnTab.length} filters dossiers`);

      return returnTab;
    } catch (err) {
      logger.error('Erreur getAllDossiersFilter : ', err);
      throw new Error('Erreur lors de la récupération des filters pour les dossiers');
    }
  }

  async getAllBureauxFilter() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllBureauxFilter;
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      let returnTab = [];

      for (const row of result.recordset) {
        let obj = new Object();
        obj['value'] = row.BUR_Id.toString().trim();
        obj['label'] = row.BUR_Libelle.trim();
        obj['selected'] = false;
        returnTab.push(obj);
      }      

      logger.info(`${returnTab.length} filters bureaux`);

      return returnTab;
    } catch (err) {
      logger.error('Erreur getAllBureauxFilter : ', err);
      throw new Error('Erreur lors de la récupération des filters pour les bureaux');
    }
  }

  async getAllMissionsFilter() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllMissionsFilter;
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      let returnTab = [];

      for (const row of result.recordset) {
        let obj = new Object();
        obj['value'] = row.MD_MISSION.toString().trim();
        obj['label'] = row.MD_MISSION.toString().trim() + ' - ' + row.LIBELLE_MISSIONS.trim();
        obj['selected'] = false;
        returnTab.push(obj);
      }      

      logger.info(`${returnTab.length} filters missions`);

      return returnTab;
    } catch (err) {
      logger.error('Erreur getAllMissionsFilter : ', err);
      throw new Error('Erreur lors de la récupération des filters pour les missions');
    }
  }

  async getAllMillesimesFilter() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllMillesimesFilter;
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      let returnTab = [];

      for (const row of result.recordset) {
        let obj = new Object();
        obj['value'] = row.MD_MILLESIME.toString().trim();
        obj['label'] = row.MD_MILLESIME.toString().trim();
        obj['selected'] = false;
        returnTab.push(obj);
      }      

      logger.info(`${returnTab.length} filters missions`);

      return returnTab;
    } catch (err) {
      logger.error('Erreur getAllMillesimesFilter : ', err);
      throw new Error('Erreur lors de la récupération des filters pour les missions');
    }
  }

  async getAllFormesJuridiqueFilter() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllFormesJuridiqueFilter;
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      let returnTab = [];

      for (const row of result.recordset) {
        let obj = new Object();
        obj['value'] = row.DOS_FORME_JURIDIQUE.trim();
        obj['label'] = row.DOS_FORME_JURIDIQUE.trim();
        obj['selected'] = false;
        returnTab.push(obj);
      }      

      logger.info(`${returnTab.length} filters formes juridique`);

      return returnTab;
    } catch (err) {
      logger.error('Erreur getAllFormesJuridiqueFilter : ', err);
      throw new Error('Erreur lors de la récupération des filters pour les formes juridique');
    }
  }

  async getAllNafsFilter() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllNafsFilter;
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      let returnTab = [];

      for (const row of result.recordset) {
        let obj = new Object();
        obj['value'] = row.NAF_ID.trim();
        obj['label'] = row.NAF_ID.trim() + ' - ' + row.NAF_LIBELLE.trim();
        obj['selected'] = false;
        returnTab.push(obj);
      }      
      logger.info(`${returnTab.length} filters nafs`);

      return returnTab;
    } catch (err) {
      logger.error('Erreur getAllNafsFilter : ', err);
      throw new Error('Erreur lors de la récupération des filters pour les nafs');
    }
  }

  async getAllDmcmFactFilter() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllDmcmFactFilter;
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      let returnTab = [];

      for (const row of result.recordset) {
        let obj = new Object();
        obj['value'] = row.USR_UNIQUE_ID.trim();
        obj['label'] = row.USR_FullName.trim();
        obj['selected'] = false;
        returnTab.push(obj);
      }      
      logger.info(`${returnTab.length} filters dmcm fact`);

      return returnTab;
    } catch (err) {
      logger.error('Erreur getAllDmcmFactFilter : ', err);
      throw new Error('Erreur lors de la récupération des filters pour les dmcm fact');
    }
  }

  async getAllAssociesFilter() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllAssociesFilter;
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      let returnTab = [];

      for (const row of result.recordset) {
        let obj = new Object();
        obj['value'] = row.USR_UNIQUE_ID.trim();
        obj['label'] = row.USR_FullName.trim();
        obj['selected'] = false;
        returnTab.push(obj);
      }      
      logger.info(`${returnTab.length} filters associes`);

      return returnTab;
    } catch (err) {
      logger.error('Erreur getAllAssociesFilter : ', err);
      throw new Error('Erreur lors de la récupération des filters pour les associes');
    }
  }

}

export default FilterDao;