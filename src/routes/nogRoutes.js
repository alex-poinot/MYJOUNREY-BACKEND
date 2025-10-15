import express from 'express';
import NogController from '../controllers/nogController.js';

const router = express.Router();
const nogController = new NogController();

router.get('/getCoordonneesNog/:dosPgi', nogController.getCoordonneesNog);
router.get('/getTypeMissionNaureNog', nogController.getTypeMissionNaureNog);


export default router;