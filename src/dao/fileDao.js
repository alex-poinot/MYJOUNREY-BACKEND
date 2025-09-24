import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import sql from 'mssql';
import { getConnection } from '../config/database.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class FileDao {
  constructor() {
    this.queries = null;
  }
  
  async loadQueries() {
    if (!this.queries) {
      try {
        const queriesPath = join(__dirname, '../SQL/fileQueries.yaml');
        const queriesContent = await fs.readFile(queriesPath, 'utf8');
        this.queries = yaml.load(queriesContent);
        logger.debug('Requêtes fichiers chargées depuis fileQueries.yaml');
      } catch (error) {
        logger.error('Erreur lors du chargement des requêtes YAML:', error);
        throw new Error('Impossible de charger les requêtes fichiers depuis le fichier YAML');
      }
    }
    return this.queries;
  }

  async setModuleFile(moduleFile) {
    let module = moduleFile.module;
    let email = moduleFile.email;
    let file = moduleFile.file;
    let missionIdDosPgiDosGroupe = moduleFile.missionIdDosPgiDosGroupe;
    let title = moduleFile.title;
    let source = moduleFile.source;

    if (source === 'Mission') {
      try {
        const queries = await this.loadQueries();
        const query = queries.setModuleFileMission;
        logger.info('query', query);
        const pool = await getConnection();
        const request = pool.request();

        request.input('ModuleParam', sql.NVarChar, module);
        request.input('MailParam', sql.NVarChar, email);
        request.input('FileParam', sql.NVarChar, file);
        request.input('MissionIdParam', sql.NVarChar, missionIdDosPgiDosGroupe);
        request.input('TitleParam', sql.NVarChar, title);

        const result = await request.query(query);

        return result.recordset;
      } catch (error) {
        logger.error('Erreur lors de la récupération des utilisateurs:', error);
        throw error;
      }
    } else if(source === 'Dossier') {
      try {
        const queries = await this.loadQueries();
        const query = queries.setModuleFileDossier;
        logger.info('query', query);
        const pool = await getConnection();
        const request = pool.request();

        request.input('ModuleParam', sql.NVarChar, module);
        request.input('MailParam', sql.NVarChar, email);
        request.input('FileParam', sql.NVarChar, file);
        request.input('DossierParam', sql.NVarChar, missionIdDosPgiDosGroupe);
        request.input('TitleParam', sql.NVarChar, title);

        const result = await request.query(query);

        return result.recordset;
      } catch (error) {
        logger.error('Erreur lors de la récupération des utilisateurs:', error);
        throw error;
      }
    } else if(source === 'Groupe') {
      try {
        const queries = await this.loadQueries();
        const query = queries.setModuleFileGroupe;
        logger.info('query', query);
        const pool = await getConnection();
        const request = pool.request();

        request.input('ModuleParam', sql.NVarChar, module);
        request.input('MailParam', sql.NVarChar, email);
        request.input('FileParam', sql.NVarChar, file);
        request.input('GroupeParam', sql.NVarChar, missionIdDosPgiDosGroupe);
        request.input('TitleParam', sql.NVarChar, title);

        const result = await request.query(query);
        return result.recordset;
      } catch (error) {
        logger.error('Erreur lors de la récupération des utilisateurs:', error);
        throw error;
      }
    }
  }

  async getModuleFiles(missionIdDosPgiDosGroupe, module, profilId, source) {
    if(source === 'Mission') {
      try {
        const queries = await this.loadQueries();
        const query = queries.getModuleFilesMission;
        logger.info('query', query);
        const pool = await getConnection();
        const request = pool.request();

        request.input('MissionIdParam', sql.NVarChar, missionIdDosPgiDosGroupe);
        request.input('ModuleParam', sql.NVarChar, module);
        request.input('ProfilIdParam', sql.NVarChar, profilId);

        const result = await request.query(query);

        return result.recordset;
      } catch (error) {
        logger.error('Erreur lors de la récupération des fichiers:', error);
        throw error;
      }
    } else if(source === 'Dossier') {
      try {
        const queries = await this.loadQueries();
        const query = queries.getModuleFilesDossier;
        logger.info('query', query);
        const pool = await getConnection();
        const request = pool.request();

        request.input('DossierParam', sql.NVarChar, missionIdDosPgiDosGroupe);
        request.input('ModuleParam', sql.NVarChar, module);
        request.input('ProfilIdParam', sql.NVarChar, profilId);

        const result = await request.query(query);

        return result.recordset;
      } catch (error) {
        logger.error('Erreur lors de la récupération des fichiers:', error);
        throw error;
      }
    } else if(source === 'Groupe') {
      try {
        const queries = await this.loadQueries();
        const query = queries.getModuleFilesGroupe;
        logger.info('query', query);
        const pool = await getConnection();
        const request = pool.request();

        request.input('GroupeParam', sql.NVarChar, missionIdDosPgiDosGroupe);
        request.input('ModuleParam', sql.NVarChar, module);
        request.input('ProfilIdParam', sql.NVarChar, profilId);

        const result = await request.query(query);

        return result.recordset;
      } catch (error) {
        logger.error('Erreur lors de la récupération des fichiers:', error);
        throw error;
      }
    }
  }

  async deleteModuleFile(fileId) {
    try {
      const queries = await this.loadQueries();
      const query = queries.deleteModuleFile;
      logger.info('query', query);
      const pool = await getConnection();
      const request = pool.request();

      request.input('FileIdParam', sql.Int, fileId);

      const result = await request.query(query);
      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de la suppression du fichier:', error);
      throw error;
    }
  }
}

export default FileDao;