import express from 'express';
import NogController from '../controllers/nogController.js';

const router = express.Router();
const nogController = new NogController();

router.get('/getCoordonneesNog/:dosPgi', nogController.getCoordonneesNog);
router.get('/getTypeMissionNatureNog', nogController.getTypeMissionNatureNog);
router.get('/getListeDiligenceDefault', nogController.getListeDiligenceDefault);
router.get('/getListeDiligenceBibliotheque', nogController.getListeDiligenceBibliotheque);
router.get('/verifNogLoad/:codeAffaire', nogController.verifNogLoad);
router.post('/insertNogCoordonnees', nogController.insertNogCoordonnees);
router.post('/insertNogContacts', nogController.insertNogContacts);
router.post('/insertNogAssocies', nogController.insertNogAssocies);
router.post('/insertNogCS', nogController.insertNogCS);
router.post('/insertNogTypeMission', nogController.insertNogTypeMission);
router.post('/insertNogNatureMission', nogController.insertNogNatureMission);
router.post('/insertNogPlanning', nogController.insertNogPlanning);
router.post('/insertNogEquipeInter', nogController.insertNogEquipeInter);
router.post('/insertNogLogiciel', nogController.insertNogLogiciel);
router.post('/insertNogFE', nogController.insertNogFE);
router.post('/insertNogVigilance', nogController.insertNogVigilance);
router.post('/insertNogDiligence', nogController.insertNogDiligence);
router.post('/insertNogModuleTexte', nogController.insertNogModuleTexte);
router.post('/insertNogValue', nogController.insertNogValue);
router.post('/insertNogFileAnnexe', nogController.insertNogFileAnnexe);
router.post('/insertNogDiligenceAdd', nogController.insertNogDiligenceAdd);
router.post('/insertNogDiligenceLab', nogController.insertNogDiligenceLab);

export default router;