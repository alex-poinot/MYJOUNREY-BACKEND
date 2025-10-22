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

  async getTypeMissionNatureNog() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getTypeMissionNatureNog;
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

  async getListeDiligenceDefault() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getListeDiligenceDefault;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de la récupération des diligences:', error);
      throw error;
    }
  }

  async getListeDiligenceBibliotheque() {
    try {
      const queries = await this.loadQueries();
      const query = queries.getListeDiligenceBibliotheque;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();

      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de la récupération des diligences:', error);
      throw error;
    }
  }

  async verifNogLoad(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.verifNogLoad;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();

      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors des donnees nog:', error);
      throw error;
    }
  }

  async insertNogCoordonnees(obj) {
    try {
      const queries = await this.loadQueries();
      const query = queries.insertNogCoordonnees;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();

      request.input('CodeAffaireParam', sql.NVarChar, obj.codeAffaire);
      request.input('NomSocieteParam', sql.NVarChar, obj.nomSociete);
      request.input('AdresseParam', sql.NVarChar, obj.adresse);
      request.input('SiretParam', sql.NVarChar, obj.siret);
      request.input('CodeAPEParam', sql.NVarChar, obj.codeAPE);
      request.input('LibelleAPEParam', sql.NVarChar, obj.libelleAPE);
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de l\'insertion des coordonnees:', error);
      throw error;
    }
  }

  async insertNogContacts(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogContacts;
      const query = queries.insertNogContacts;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj[0].codeAffaire);
      await requestD.query(queryD);
      
      for (const element of obj) {
        if (element.nom != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('NomParam', sql.NVarChar, element.nom);
          await request.input('PrenomParam', sql.NVarChar, element.prenom);
          await request.input('FonctionParam', sql.NVarChar, element.fonction);
          await request.input('TelephoneParam', sql.NVarChar, element.telephone);
          await request.input('AdresseMailParam', sql.NVarChar, element.adresseMail);
          await request.query(query);
        }
      }
      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion des contacts:', error);
      throw error;
    }
  }

  async insertNogAssocies(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogAssocies;
      const query = queries.insertNogAssocies;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj[0].codeAffaire);
      await requestD.query(queryD);
      
      for (const element of obj) {
        if (element.nom != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('NomParam', sql.NVarChar, element.nom);
          await request.input('NbTitresParam', sql.NVarChar, element.nbTitres);
          await request.input('MontantCapitalParam', sql.NVarChar, element.montantCapital);
          await request.input('PourcDetentionParam', sql.NVarChar, element.pourcDetention);
          await request.query(query);
        }
      }

      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion des associes:', error);
      throw error;
    }
  }

  async insertNogCS(obj) {
    try {
      const queries = await this.loadQueries();
      const query = queries.insertNogCS;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      
      request.input('CodeAffaireParam', sql.NVarChar, obj.codeAffaire);
      request.input('LibelleExN1Param', sql.NVarChar, obj.libelleN1);
      request.input('NbMoisExN1Param', sql.NVarChar, obj.nbMoisN1);
      request.input('EffectifN1Param', sql.Numeric, obj.effectifN1);
      request.input('CapitauxPropresN1Param', sql.Numeric, obj.capitauxPropresN1);
      request.input('BilanN1Param', sql.Numeric, obj.bilanN1);
      request.input('CAN1Param', sql.Numeric, obj.caN1);
      request.input('ResultatNetN1Param', sql.Numeric, obj.resultatN1);
      request.input('LibelleExN2Param', sql.NVarChar, obj.libelleN2);
      request.input('NbMoisExN2Param', sql.NVarChar, obj.nbMoisN2);
      request.input('EffectifN2Param', sql.Numeric, obj.effectifN2);
      request.input('CapitauxPropresN2Param', sql.Numeric, obj.capitauxPropresN2);
      request.input('BilanN2Param', sql.Numeric, obj.bilanN2);
      request.input('CAN2Param', sql.Numeric, obj.caN2);
      request.input('ResultatNetN2Param', sql.Numeric, obj.resultatN2);
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de l\'insertion des CS:', error);
      throw error;
    }
  }

  async insertNogTypeMission(obj) {
    try {
      const queries = await this.loadQueries();
      const query = queries.insertNogTypeMission;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      
      request.input('CodeAffaireParam', sql.NVarChar, obj.codeAffaire);
      request.input('TypeMissionParam', sql.NVarChar, obj.typeMission);
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de l\'insertion du type mission:', error);
      throw error;
    }
  }

  async insertNogNatureMission(obj) {
    try {
      const queries = await this.loadQueries();
      const query = queries.insertNogNatureMission;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      
      request.input('CodeAffaireParam', sql.NVarChar, obj.codeAffaire);
      request.input('NatureMissionParam', sql.NVarChar, obj.natureMission);
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de l\'insertion du type mission:', error);
      throw error;
    }
  }

  async insertNogPlanning(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogPlanning;
      const query = queries.insertNogPlanning;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj[0].codeAffaire);
      await requestD.query(queryD);
      
      for (const element of obj) {
        if (element.nom != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('FonctionParam', sql.NVarChar, element.fonction);
          await request.input('NomParam', sql.NVarChar, element.nom);
          await request.input('PeriodeParam', sql.NVarChar, element.periode);
          await request.input('NbHeuresParam', sql.NVarChar, element.nbHeures);
          await request.query(query);
        }
      }

      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion du planning:', error);
      throw error;
    }
  }

  async insertNogEquipeInter(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogEquipeInter;
      const query = queries.insertNogEquipeInter;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj[0].codeAffaire);
      await requestD.query(queryD);
      
      for (const element of obj) {
        if (element.nom != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('FonctionParam', sql.NVarChar, element.fonction);
          await request.input('NomParam', sql.NVarChar, element.nom);
          await request.input('ActifParam', sql.NVarChar, element.actif);
          await request.query(query);
        }
      }

      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion de l\'equipe inter:', error);
      throw error;
    }
  }

  async insertNogLogiciel(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogLogiciel;
      const query = queries.insertNogLogiciel;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj[0].codeAffaire);
      await requestD.query(queryD);
      
      for (const element of obj) {
        if (element.interneClient != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('InterneClientParam', sql.NVarChar, element.interneClient);
          await request.input('TypeParam', sql.NVarChar, element.type);
          await request.input('OutilParam', sql.NVarChar, element.outil);
          await request.input('CoutParam', sql.NVarChar, element.cout);
          await request.query(query);
        }
      }

      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion des logiciels:', error);
      throw error;
    }
  }

  async insertNogFE(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogFE;
      const query = queries.insertNogFE;
      const queryU = queries.insertNogFEUnique;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj.tableFE[0].codeAffaire);
      await requestD.query(queryD);

      const requestU = pool.request();
      await requestU.input('CodeAffaireParam', sql.NVarChar, obj.uniqueFE.codeAffaire);
      await requestU.input('EInvoicingParam', sql.NVarChar, obj.uniqueFE.eInvoicing);
      await requestU.input('EReportingPaiementParam', sql.NVarChar, obj.uniqueFE.eReportingPaiement);
      await requestU.input('EReportingTransactionParam', sql.NVarChar, obj.uniqueFE.eReportingTransaction);
      await requestU.input('CasGestionParam', sql.NVarChar, obj.uniqueFE.casGestion);
      await requestU.input('EnvoiMailParam', sql.NVarChar, obj.uniqueFE.envoiMail);
      await requestU.input('SignatureMandatParam', sql.NVarChar, obj.uniqueFE.signatureMandat);
      await requestU.query(queryU);
      
      for (const element of obj.tableFE) {
        if (element.categorie != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('CategorieParam', sql.NVarChar, element.categorie);
          await request.input('MissionParam', sql.NVarChar, element.mission);
          await request.input('OutilParam', sql.NVarChar, element.outil);
          await request.input('BDParam', sql.NVarChar, element.bd);
          await request.query(query);
        }
      }
      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion FE :', error);
      throw error;
    }
  }

  async insertNogVigilance(obj) {
    try {
      const queries = await this.loadQueries();
      const query = queries.insertNogVigilance;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      
      request.input('CodeAffaireParam', sql.NVarChar, obj.codeAffaire);
      request.input('VigilanceParam', sql.NVarChar, obj.vigilance);
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de l\'insertion vigilance:', error);
      throw error;
    }
  }

  async insertNogDiligence(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogDiligence;
      const query = queries.insertNogDiligence;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj[0].codeAffaire);
      await requestD.query(queryD);
      
      for (const element of obj) {
        if (element.cycle != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('CycleParam', sql.NVarChar, element.cycle);
          await request.input('CycleLibelleParam', sql.NVarChar, element.cycleLibelle);
          await request.input('CodeDiligenceParam', sql.NVarChar, element.codeDiligence);
          await request.input('TitreDiligenceParam', sql.NVarChar, element.titreDiligence);
          await request.input('ActivationParam', sql.NVarChar, element.activation);
          await request.input('ObjectifParam', sql.NVarChar, element.objectif);
          await request.input('ControleParam', sql.NVarChar, element.controle);
          await request.query(query);
        }
      }
      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion diligence:', error);
      throw error;
    }
  }

  async insertNogModuleTexte(obj) {
    try {
      const queries = await this.loadQueries();
      let query = queries.insertNogModuleTexte;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();

      query = query.replaceAll('@ColonneParam', obj.colonne).replaceAll('@ColonneDateParam', obj.colonneDate);
      
      request.input('CodeAffaireParam', sql.NVarChar, obj.codeAffaire);
      request.input('TexteParam', sql.NVarChar, obj.texte);
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de insertNogModuleTexte:', error);
      throw error;
    }
  }

  async insertNogValue(obj) {
    try {
      const queries = await this.loadQueries();
      let query = queries.insertNogValue;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();

      query = query.replaceAll('@ColonneParam', obj.colonne).replaceAll('@ColonneDateParam', obj.colonneDate);
      
      request.input('CodeAffaireParam', sql.NVarChar, obj.codeAffaire);
      request.input('ValueParam', sql.NVarChar, obj.value);
      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de insertNogValue:', error);
      throw error;
    }
  }

  async insertNogFileAnnexe(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogFileAnnexe;
      const query = queries.insertNogFileAnnexe;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj[0].codeAffaire);
      await requestD.query(queryD);
      
      for (const element of obj) {
        if (element.titre != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('TitreParam', sql.NVarChar, element.titre);
          await request.input('FileParam', sql.NVarChar, element.file);
          await request.input('OrderParam', sql.NVarChar, element.order);
          await request.query(query);
        }
      }
      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion file:', error);
      throw error;
    }
  }

  async insertNogDiligenceAdd(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogDiligenceAdd;
      const query = queries.insertNogDiligenceAdd;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj[0].codeAffaire);
      await requestD.query(queryD);
      
      for (const element of obj) {
        if (element.cycle != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('CycleParam', sql.NVarChar, element.cycle);
          await request.input('CodeDiligenceParam', sql.NVarChar, element.codeDiligence);
          await request.input('TitreDiligenceParam', sql.NVarChar, element.titreDiligence);
          await request.input('ObjectifParam', sql.NVarChar, element.objectif);
          await request.input('ControleParam', sql.NVarChar, element.controle);
          await request.query(query);
        }
      }
      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion diligence add:', error);
      throw error;
    }
  }

  async insertNogDiligenceLab(obj) {
    try {
      const queries = await this.loadQueries();

      const queryD = queries.deleteNogDiligenceLab;
      const query = queries.insertNogDiligenceLab;
      logger.info('query', query);
      const pool = await getConnection();

      const requestD = pool.request();
      await requestD.input('CodeAffaireParam', sql.NVarChar, obj[0].codeAffaire);
      await requestD.query(queryD);
      
      for (const element of obj) {
        if (element.cycle != null) {
          const request = pool.request();
          await request.input('CodeAffaireParam', sql.NVarChar, element.codeAffaire);
          await request.input('CycleParam', sql.NVarChar, element.cycle);
          await request.input('CycleLibelleParam', sql.NVarChar, element.cycleLibelle);
          await request.input('CodeDiligenceParam', sql.NVarChar, element.codeDiligence);
          await request.input('TitreDiligenceParam', sql.NVarChar, element.titreDiligence);
          await request.input('ActivationParam', sql.NVarChar, element.activation);
          await request.input('ObjectifParam', sql.NVarChar, element.objectif);
          await request.input('ControleParam', sql.NVarChar, element.controle);
          await request.query(query);
        }
      }
      return [];
    } catch (error) {
      logger.error('Erreur lors de l\'insertion diligence lab:', error);
      throw error;
    }
  }
}

export default NogDao;