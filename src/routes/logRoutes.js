import express from 'express';
import LogController from '../controllers/logController.js';

const router = express.Router();
const logController = new LogController();

// POST /api/setLog - Définir un log qui prend un objet json avec les champs : MailParam, DosPgiParam, ModifParam, TypeModifParam, ModuleParam, ChampParam, ValeurParam, PeriodeParam
router.post('/setLog', logController.setLog);

router.post('/setLogMission', logController.setLogMission);

router.post('/setLogConnexion', logController.setLogConnexion);

export default router;