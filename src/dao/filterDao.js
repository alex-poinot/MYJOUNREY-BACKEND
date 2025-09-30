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
        obj['value'] = row.BUR_Id;
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
        obj['value'] = row.MD_MISSION;
        obj['label'] = row.MD_MISSION + ' - ' + row.LIBELLE_MISSIONS.trim();
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
        obj['value'] = row.MD_MILLESIME;
        obj['label'] = row.MD_MILLESIME;
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
        obj['value'] = row.NAF_ID;
        obj['label'] = row.NAF_ID + ' - ' + row.NAF_LIBELLE.trim();
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

}

export default FilterDao;