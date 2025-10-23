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
          await request.input('NbTitresParam', sql.Numeric, element.nbTitres);
          await request.input('MontantCapitalParam', sql.Numeric, element.montantCapital);
          await request.input('PourcDetentionParam', sql.Numeric, element.pourcDetention);
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
      request.input('NbMoisExN1Param', sql.Int, obj.nbMoisN1);
      request.input('EffectifN1Param', sql.Numeric, obj.effectifN1);
      request.input('CapitauxPropresN1Param', sql.Numeric, obj.capitauxPropresN1);
      request.input('BilanN1Param', sql.Numeric, obj.bilanN1);
      request.input('CAN1Param', sql.Numeric, obj.caN1);
      request.input('ResultatNetN1Param', sql.Numeric, obj.resultatN1);
      request.input('LibelleExN2Param', sql.NVarChar, obj.libelleN2);
      request.input('NbMoisExN2Param', sql.Int, obj.nbMoisN2);
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

  async getListeValeurUnique(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getListeValeurUnique;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      return result.recordset;
    } catch (error) {
      logger.error('Erreur lors de la récupération getListeValeurUnique:', error);
      throw error;
    }
  }

  async getPlanningMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getPlanningMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let tab = [];
      let sauvNom = '';
      let i = 0;
      let dateUpdate = '';

      result.recordset.forEach(element => {
        if(sauvNom == element.MyNogPP_Nom) {
          obj[element.MyNogPP_Periode] = element.MyNogPP_NbHeures;
        } else {
          if(i != 0) {
            tab.push(obj);
          } else {
            dateUpdate = element.MyNogPP_DateLastModif;
          }
          obj = new Object();
          obj.fonction = element.MyNogPP_Fonction;
          obj.nom = element.MyNogPP_Nom;
          obj[element.MyNogPP_Periode] = element.MyNogPP_NbHeures;

          sauvNom = element.MyNogPP_Nom;
          i++;
        }
      });

      let objR = {
        dateUpdate: dateUpdate,
        data: tab
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getPlanningMJNog:', error);
      throw error;
    }
  }

  async getEquipeInterMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getEquipeInterMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let dateUpdate = '';

      result.recordset.forEach(element => {
        if(element.MyNogPE_Fonction == 'DMCM') {
          obj.dmcm = element.MyNogPE_Nom;
          obj.dmcmStatut = element.MyNogPE_Actif;
        }
        if(element.MyNogPE_Fonction == 'Responsable mission') {
          obj.respMission = element.MyNogPE_Nom;
          obj.respMissionStatut = element.MyNogPE_Actif;
        } 
        if(element.MyNogPE_Fonction == 'Factureur') {
          obj.factureur = element.MyNogPE_Nom;
          obj.factureurStatut = element.MyNogPE_Actif;
        } 
      });

      let objR = {
        dateUpdate: dateUpdate,
        data: obj
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getEquipeInterMJNog:', error);
      throw error;
    }
  }

  async getContactMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getContactMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let tab = [];
      let dateUpdate = result.recordset.length == 0 ? '' : result.recordset[0].MyNogPC_DateLastModif;

      result.recordset.forEach(element => {
        obj = new Object();
        obj.id = element.MyNogPC_Id;
        obj.nom = element.MyNogPC_Nom;
        obj.prenom = element.MyNogPC_Prenom;
        obj.mail = element.MyNogPC_AdresseMail;
        obj.telephone = element.MyNogPC_Telephone;
        obj.libelle = element.MyNogPC_Fonction;
        obj.fonction = element.MyNogPC_Fonction;
        tab.push(obj);
      });

      let objR = {
        dateUpdate: dateUpdate,
        data: tab
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getContactMJNog:', error);
      throw error;
    }
  }

  async getAssocieMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAssocieMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let tab = [];
      let dateUpdate = result.recordset.length == 0 ? '' : result.recordset[0].MyNogPA_DateLastModif;

      result.recordset.forEach(element => {
        obj = new Object();
        obj.nom = element.MyNogPA_Nom;
        obj.nbPart = element.MyNogPA_NbTitres;
        obj.partCapital = element.MyNogPA_MontantCapital;
        obj.pourcPart = element.MyNogPA_PourcDetention;
        tab.push(obj);
      });

      let objR = {
        dateUpdate: dateUpdate,
        data: tab
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getAssocieMJNog:', error);
      throw error;
    }
  }

  async getLogicielMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getLogicielMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let tabGT = [];
      let tabClient = [];
      let dateUpdate = result.recordset.length == 0 ? '' : result.recordset[0].MyNogOL_DateLastModif;

      result.recordset.forEach(element => {
        if(element.MyNogOL_InterneClient == 'Interne') {
          obj = new Object();
          obj.type = element.MyNogOL_Type;
          obj.logiciel = element.MyNogOL_Outil;
          obj.montant = element.MyNogOL_Cout;
          tabGT.push(obj);
        } else if(element.MyNogOL_InterneClient == 'Client') {
          obj = new Object();
          obj.type = element.MyNogOL_Type;
          obj.logiciel = element.MyNogOL_Outil;
          tabClient.push(obj);
        }
      });

      let objR = {
        dateUpdate: dateUpdate,
        logicielGT: tabGT,
        logicielClient: tabClient
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getLogicielMJNog:', error);
      throw error;
    }
  }

  async getDiligenceMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getDiligenceMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let tab = [];
      let dateUpdate = result.recordset.length == 0 ? '' : result.recordset[0].MyNogDL_DateLastModif;

      let sauvCycle = '';
      let i = 0;


      result.recordset.forEach(element => {

        if(sauvCycle == element.MyNogDL_Cycle) {
          obj.tabDiligence.push(
              {
                cycle: element.MyNogDL_Cycle,
                diligence: element.MyNogDL_CodeDiligence,
                titre: element.MyNogDL_TitreDiligence,
                activation: element.MyNogDL_Activation == 'Oui',
                objectif: element.MyNogDL_Objectif,
                controle: element.MyNogDL_Controle
              }
            );
        } else {
          if(i != 0) {
            tab.push(obj);
          }
          obj = new Object();
          obj.groupe = element.MyNogDL_Cycle;
          obj.libelleGroupe = element.MyNogDL_CycleLibelle;
          obj.tabDiligence = [
            {
              cycle: element.MyNogDL_Cycle,
              diligence: element.MyNogDL_CodeDiligence,
              titre: element.MyNogDL_TitreDiligence,
              activation: element.MyNogDL_Activation == 'Oui',
              objectif: element.MyNogDL_Objectif,
              controle: element.MyNogDL_Controle
            }
          ];

          sauvCycle = element.MyNogDL_Cycle;
          i++;
        }
      });

      tab.push(obj);

      let objR = {
        dateUpdate: dateUpdate,
        data: tab
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getDiligenceMJNog:', error);
      throw error;
    }
  }

  async getDiligenceLabMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getDiligenceLabMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let tab = [];
      let dateUpdate = result.recordset.length == 0 ? '' : result.recordset[0].MyNogDLL_DateLastModif      

      result.recordset.forEach(element => {
        obj = new Object();
        obj.cycle = element.MyNogDLL_Cycle;
        obj.diligence = element.MyNogDLL_CodeDiligence;
        obj.titre = element.MyNogDLL_TitreDiligence;
        obj.activation = element.MyNogDLL_Activation == 'Oui';
        obj.objectif = element.MyNogDLL_Objectif;
        obj.controle = element.MyNogDLL_Controle;
        tab.push(obj);
      });

      let objR = {
        dateUpdate: dateUpdate,
        data: tab
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getDiligenceLabMJNog:', error);
      throw error;
    }
  }

  async getDiligenceAddMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getDiligenceAddMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let tab = [];
      let dateUpdate = result.recordset.length == 0 ? '' : result.recordset[0].MyNogDLA_DateLastModif      

      result.recordset.forEach(element => {
        obj = new Object();
        obj.cycle = element.MyNogDLA_Cycle;
        obj.diligence = element.MyNogDLA_CodeDiligence;
        obj.titre = element.MyNogDLA_TitreDiligence;
        obj.objectif = element.MyNogDLA_Objectif;
        obj.controle = element.MyNogDLA_Controle;
        tab.push(obj);
      });

      let objR = {
        dateUpdate: dateUpdate,
        data: tab
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getDiligenceAddMJNog:', error);
      throw error;
    }
  }

  async getFichiersAnnexeMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getFichiersAnnexeMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let tab = [];
      let dateUpdate = result.recordset.length == 0 ? '' : result.recordset[0].MyNogAFA_DateLastModif      

      result.recordset.forEach(element => {
        obj = new Object();
        obj.titre = element.MyNogAFA_Titre;
        obj.file = element.Base64_File;
        tab.push(obj);
      });

      let objR = {
        dateUpdate: dateUpdate,
        data: tab
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getFichiersAnnexeMJNog:', error);
      throw error;
    }
  }

  async getFEMJNog(codeAffaire) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getFEMJNog;
      logger.info('query',query);
      const pool = await getConnection();
      const request = pool.request();
      request.input('CodeAffaireParam', sql.NVarChar, codeAffaire);

      const result = await request.query(query);

      let obj = new Object();
      let tabMission = [];
      let tabBD = [];
      let dateUpdate = result.recordset.length == 0 ? '' : result.recordset[0].MyNogOF_DateLastModif      

      result.recordset.forEach(element => {
        obj = new Object();
        obj.categorie = element.MyNogOF_Categorie;
        obj.libelle = element.MyNogOF_Mission;
        obj.logiciel = element.MyNogOF_Outil;
        tabBD.push(element.MyNogOF_BD);
        tabMission.push(obj);
      });

      let objR = {
        dateUpdate: dateUpdate,
        tabMission: tabMission,
        tabBD: tabBD
      }
      return objR;
    } catch (error) {
      logger.error('Erreur lors de la récupération getFEMJNog:', error);
      throw error;
    }
  }
}

export default NogDao;