import express from 'express';
import NogController from '../controllers/nogController.js';

const router = express.Router();
const nogController = new NogController();

router.get('/getCoordonneesNog/:dosPgi', nogController.getCoordonneesNog);
router.get('/getTypeMissionNatureNog', nogController.getTypeMissionNatureNog);
router.get('/getListeDiligenceDefault', nogController.getListeDiligenceDefault);
router.get('/getListeDiligenceBibliotheque', nogController.getListeDiligenceBibliotheque);


export default router;