import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import sql from 'mssql';
import { getConnection } from '../config/database.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class NogDao {
  constructor() {
    this.queries = null;
  }
  
  async loadQueries() {
    if (!this.queries) {
      try {
        const queriesPath = join(__dirname, '../SQL/nogQueries.yaml');
        const queriesContent = await fs.readFile(queriesPath, 'utf8');
        this.queries = yaml.load(queriesContent);
        logger.debug('Requêtes utilisateurs chargées depuis nogQueries.yaml');
      } catch (error) {
        logger.error('Erreur lors du chargement des requêtes YAML:', error);
        throw new Error('Impossible de charger les requêtes missions depuis le fichier YAML');
      }
    }
    return this.queries;
  }

  async getCoordonneesNog(dosPgi) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getCoordonneesNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();

      request.input('DosPgiParam', sql.NVarChar, dosPgi);
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de la récupération des coordonnees:', error);
      throw error;
    }
  }

  async getTypeMissionNaureNog(dosPgi) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getTypeMissionNaureNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de la récupération des type mission nature:', error);
      throw error;
    }
  }
}

export default NogDao;