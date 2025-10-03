import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import sql from 'mssql';
import { getConnection } from '../config/database.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class MissionDao {
  constructor() {
    this.queries = null;
  }

  async loadQueries() {
    if (!this.queries) {
      try {
        const queriesPath = join(__dirname, '../SQL/missionQueries.yaml');
        const queriesContent = await fs.readFile(queriesPath, 'utf8');
        this.queries = yaml.load(queriesContent);
        logger.debug('Requêtes missions chargées depuis missionQueries.yaml');
      } catch (error) {
        logger.error('Erreur lors du chargement des requêtes YAML:', error);
        throw new Error('Impossible de charger les requêtes missions depuis le fichier YAML');
      }
    }
    return this.queries;
  }

  async getAllMissionsDashboard(email) {
    try {
      const queries = await this.loadQueries();
      const query = queries.getAllMissionsDashboard;
      const pool = await getConnection();
      const request = pool.request();

      request.input('MailParam', sql.VarChar, email);
      const result = await request.query(query);
      logger.info(`${result.recordset.length} lignes récupérées`);

      // 1️⃣  Regrouper par missionId (ou autre clé unique)
      const grouped = {};

      for (const row of result.recordset) {
        const key = row.DTMISS_MissionId; // clé d'agrégation

        // Création d'un conteneur s'il n'existe pas
        if (!grouped[key]) {
          grouped[key] = {
            numeroGroupe: row.DOS_SOCIETEGROUPE,
            nomGroupe: row.DOS_SOCIETEGROUPELIBELLE,
            numeroClient: row.DOS_PGI,
            nomClient: row.DOS_NOM,
            LIBELLE_MISSIONS: row.LIBELLE_MISSIONS,
            missionId: row.DTMISS_MissionId,
            profilId: row.DTMISS_ProfilId,
            source: row.DTMISS_Source,
            BUREAU_ID: row.BUREAU_ID,
            MD_RESP_PRINCIPAL_MISS_SIRH: row.MD_RESP_PRINCIPAL_MISS_SIRH,
            MD_MISSION: row.MD_MISSION,
            MD_MILLESIME: row.MD_MILLESIME,
            MD_ETAT: row.MD_ETAT == 'ENC' ? 'ouvert' : 'ferme',
            MD_DMCM_SIRH: row.MD_DMCM_SIRH,
            MD_FACTUREUR_SIRH: row.MD_FACTUREUR_SIRH,
            DOS_BUREAU: row.DOS_BUREAU,
            DOS_ASSOCIE_SIRH: row.DOS_ASSOCIE_SIRH,
            DOS_ETAT: row.DOS_ETAT == 'NON' ? 'ouvert' : 'ferme',
            NAF_ID: row.NAF_ID,
            DOS_MOIS_CLOTURE: row.DOS_MOIS_CLOTURE,
            DOS_FORME_JURIDIQUE: row.DOS_FORME_JURIDIQUE,
            avantMission: {
              labGroupe: '',
              labDossier: '',
              cartoLabGroupe: '',
              cartoLabDossier: '',
              conflitCheck: '',
              qac: '',
              qam: '',
              ldm: '',
              labGroupeAccess: '',
              labDossierAccess: '',
              cartoLabGroupeAccess: '',
              cartoLabDossierAccess: '',
              conflitCheckAccess: '',
              qacAccess: '',
              qamAccess: '',
              ldmAccess: ''
            },
            pendantMission: {
              nog: '',
              checklist: '',
              revision: '',
              supervision: '',
              nogAccess: '',
              checklistAccess: '',
              revisionAccess: '',
              supervisionAccess: ''
            },
            finMission: {
              cr: '',
              nds: '',
              qmm: '',
              plaquette: '',
              restitution: '',
              finRelationClient: '',
              crAccess: '',
              ndsAccess: '',
              qmmAccess: '',
              plaquetteAccess: '',
              restitutionAccess: '',
              finRelationClientAccess: ''
            }
          };
        }
             
        const g = grouped[key];
        const m = row.MOD_ModuleId;
        const s = row.SourcePossible;
        const e = row.MODSTAT_Status;
        const ml = row.DTMOD_ModuleLecture;
        const mm = row.DTMOD_ModuleModification; 

        if (s === 'Groupe' && m === 2) {g.avantMission.labGroupe = e; g.avantMission.labGroupeAccess = this.getAccessString(ml, mm);}
        if (s === 'Dossier' && m === 2) {g.avantMission.labDossier = e; g.avantMission.labDossierAccess = this.getAccessString(ml, mm);}
        if (s === 'Groupe' && m === 3) {g.avantMission.cartoLabGroupe = e; g.avantMission.cartoLabGroupeAccess = this.getAccessString(ml, mm);}
        if (s === 'Dossier' && m === 3) {g.avantMission.cartoLabDossier = e; g.avantMission.cartoLabDossierAccess = this.getAccessString(ml, mm);}
        if (s === 'Dossier' && m === 1) {g.avantMission.conflitCheck = e; g.avantMission.conflitCheckAccess = this.getAccessString(ml, mm);}
        if (s === 'Dossier' && m === 4) {g.avantMission.qac = e; g.avantMission.qacAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 5) {g.avantMission.qam = e; g.avantMission.qamAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 6) {g.avantMission.ldm = e; g.avantMission.ldmAccess = this.getAccessString(ml, mm);}

        if (s === 'Mission' && m === 7) {g.pendantMission.nog = e; g.pendantMission.nogAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 8) {g.pendantMission.checklist = e; g.pendantMission.checklistAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 9) {g.pendantMission.revision = e; g.pendantMission.revisionAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 10) {g.pendantMission.supervision = e; g.pendantMission.supervisionAccess = this.getAccessString(ml, mm);}

        if (s === 'Mission' && m === 12) {g.finMission.cr = e; g.finMission.crAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 11) {g.finMission.nds = e; g.finMission.ndsAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 13) {g.finMission.qmm = e; g.finMission.qmmAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 14) {g.finMission.plaquette = e; g.finMission.plaquetteAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 15) {g.finMission.restitution = e; g.finMission.restitutionAccess = this.getAccessString(ml, mm);}
        if (s === 'Mission' && m === 16) {g.finMission.finRelationClient = e; g.finMission.finRelationClientAccess = this.getAccessString(ml, mm);}
      }

      
      const final = Object.values(grouped).map(m => {
        const a = m.avantMission;
        const p = m.pendantMission;
        const f = m.finMission;

        const pct = (obj, denom) =>
          Math.ceil(
            (Object.values(obj).filter(v => v === true).length * 100) / denom
          );

        a.percentage = pct(a, 8);
        p.percentage = pct(p, 4);
        f.percentage = pct(f, 6);

        return m;
      });

      logger.info(`${final.length} missions agrégées`);
      return final;

    } catch (err) {
      logger.error('Erreur getAllMissionsDashboard : ', err);
      throw new Error('Erreur lors de la récupération des missions pour le tableau de bord');
    }
  }

  getAccessString(ml, mm) {
    if(ml == 'oui' && mm == 'oui') {
      return 'modif';
    } else if(ml == 'oui' && mm == 'non') {
      return 'lecture';
    } else {
      return 'noaccess';
    }
  }

}

export default MissionDao;