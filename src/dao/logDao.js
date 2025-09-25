import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import sql from 'mssql';
import { getConnection } from '../config/database.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class LogDao {
  constructor() {
    this.queries = null;
  }
  
  async loadQueries() {
    if (!this.queries) {
      try {
        const queriesPath = join(__dirname, '../SQL/logQueries.yaml');
        const queriesContent = await fs.readFile(queriesPath, 'utf8');
        this.queries = yaml.load(queriesContent);
        logger.debug('Requêtes fichiers chargées depuis logQueries.yaml');
      } catch (error) {
        logger.error('Erreur lors du chargement des requêtes YAML:', error);
        throw new Error('Impossible de charger les requêtes fichiers depuis le fichier YAML');
      }
    }
    return this.queries;
  }

  async setLog(log) {
    let email = log.email;
    let dosPgi = log.dosPgi;
    let modif = log.modif;
    let typeModif = log.typeModif;
    let module = log.module;
    let champ = log.champ;
    let valeur = log.valeur;
    let periode = log.periode;

    try {
      const queries = await this.loadQueries();
      let query = queries.setLog;
      logger.info('query', query);
      const pool = await getConnection();
      const request = pool.request();

      request.input('MailParam', sql.NVarChar, email);
      request.input('DosPgiParam', sql.NVarChar, dosPgi);
      request.input('ModifParam', sql.NVarChar, modif);
      request.input('TypeModifParam', sql.NVarChar, typeModif);
      request.input('ModuleParam', sql.NVarChar, module);
      request.input('ChampParam', sql.NVarChar, champ);
      request.input('ValeurParam', sql.NVarChar, valeur);
      request.input('PeriodeParam', sql.NVarChar, periode);

      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de l\'envoie du status:', error);
      throw error;
    }
  }

  async setLogMission(log) {
    let email = log.email;
    let missionId = log.missionId;
    let modif = log.modif;
    let typeModif = log.typeModif;
    let module = log.module;
    let champ = log.champ;
    let valeur = log.valeur;
    let periode = log.periode;

    try {
      const queries = await this.loadQueries();
      let query = queries.setLogMission;
      logger.info('query', query);
      const pool = await getConnection();
      const request = pool.request();

      request.input('MailParam', sql.NVarChar, email);
      request.input('MissionIdParam', sql.NVarChar, missionId);
      request.input('ModifParam', sql.NVarChar, modif);
      request.input('TypeModifParam', sql.NVarChar, typeModif);
      request.input('ModuleParam', sql.NVarChar, module);
      request.input('ChampParam', sql.NVarChar, champ);
      request.input('ValeurParam', sql.NVarChar, valeur);
      request.input('PeriodeParam', sql.NVarChar, periode);

      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de l\'envoie du status:', error);
      throw error;
    }
  }

  async setLogConnexion(logObj) {
    let email = logObj.email;
    let page = logObj.page;

    try {
      const queries = await this.loadQueries();
      let query = queries.setLogConnexion;
      logger.info('query', query);
      const pool = await getConnection();
      const request = pool.request();

      request.input('MailParam', sql.NVarChar, email);
      request.input('PageParam', sql.NVarChar, page);

      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de l\'envoie du status:', error);
      throw error;
    }
  }
}

export default LogDao;