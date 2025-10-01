import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import sql from 'mssql';
import { getConnection } from '../config/database.js';
import logger from '../utils/logger.js';
import LogDao from './logDao.js';
const logDao = new LogDao();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ModuleDao {
  constructor() {
    this.queries = null;
  }
  
  async loadQueries() {
    if (!this.queries) {
      try {
        const queriesPath = join(__dirname, '../SQL/moduleQueries.yaml');
        const queriesContent = await fs.readFile(queriesPath, 'utf8');
        this.queries = yaml.load(queriesContent);
        logger.debug('Requêtes fichiers chargées depuis moduleQueries.yaml');
      } catch (error) {
        logger.error('Erreur lors du chargement des requêtes YAML:', error);
        throw new Error('Impossible de charger les requêtes fichiers depuis le fichier YAML');
      }
    }
    return this.queries;
  }

  async setModuleStatus(moduleStatus) {
    let module = moduleStatus.module;
    let email = moduleStatus.email;
    let status = moduleStatus.status;
    let missionIdDosPgiDosGroupe = moduleStatus.missionIdDosPgiDosGroupe;
    let source = moduleStatus.source;
    let mailPriseProfil = moduleStatus.mailPriseProfil;

    try {
      const queries = await this.loadQueries();
      let objLog = {};
      let query = queries.setModuleStatusMission;
      if (source === 'Mission') {
        query = queries.setModuleStatusMission;
        objLog = {
          email,
          missionId: missionIdDosPgiDosGroupe,
          modif: 'Modif status mission',
          typeModif: 'Modif status vue listing',
          module,
          champ: source,
          valeur: status,
          periode: null,
          mailPriseProfil: mailPriseProfil || null
        }

      } else if(source === 'Dossier') {
        query = queries.setModuleStatusDossier;
        objLog = {
          email,
          dosPgi: missionIdDosPgiDosGroupe,
          modif: 'Modif status dossier',
          typeModif: 'Modif status vue listing',
          module,
          champ: source,
          valeur: status,
          periode: null,
          mailPriseProfil: mailPriseProfil || null
        }
      } else if(source === 'Groupe') {
        query = queries.setModuleStatusGroupe;
        objLog = {
          email,
          dosPgi: missionIdDosPgiDosGroupe,
          modif: 'Modif status groupe',
          typeModif: 'Modif status vue listing',
          module,
          champ: source,
          valeur: status,
          periode: null,
          mailPriseProfil: mailPriseProfil || null
        }
      }
      logger.info('query', query);
      const pool = await getConnection();
      const request = pool.request();

      request.input('ModuleParam', sql.NVarChar, module);
      request.input('MailParam', sql.NVarChar, email);
      request.input('StatusParam', sql.NVarChar, status);
      request.input('MissionIdDosPgiDosGroupeParam', sql.NVarChar, missionIdDosPgiDosGroupe);
      request.input('MailPriseProfilParam', sql.NVarChar, mailPriseProfil || null);

      const result = await request.query(query);
      if (source === 'Mission') {
        await logDao.setLogMission(objLog);
      } else {
        await logDao.setLog(objLog);
      }
      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de l\'envoie du status:', error);
      throw error;
    }
  }
}

export default ModuleDao;