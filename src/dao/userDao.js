import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import sql from 'mssql';
import { getConnection } from '../config/database.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class UserDao {
  constructor() {
    this.queries = null;
  }
  
  async loadQueries() {
    if (!this.queries) {
      try {
        const queriesPath = join(__dirname, '../SQL/userQueries.yaml');
        const queriesContent = await fs.readFile(queriesPath, 'utf8');
        this.queries = yaml.load(queriesContent);
        logger.debug('Requêtes utilisateurs chargées depuis userQueries.yaml');
      } catch (error) {
        logger.error('Erreur lors du chargement des requêtes YAML:', error);
        throw new Error('Impossible de charger les requêtes missions depuis le fichier YAML');
      }
    }
    return this.queries;
  }

  async getAllUsers() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllUsers;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  }

  async getAllAdminUsers() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllAdminUsers;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      const result = await request.query(query);

      let returnTab = [];
      
      for (const row of result.recordset) {
        returnTab.push(row.MailAdminUser.toLowerCase());
      }
      return returnTab;
    } catch (error) {
      logger.error('Erreur lors de la récupération des admins:', error);
      throw error;
    }
  }
}

export default UserDao;