import express from 'express';
import ModuleController from '../controllers/moduleController.js';

const router = express.Router();
const moduleController = new ModuleController();

// POST /api/setModuleStatus - Définir un statut pour un module qui prend un objet json avec les champs : module, email, status, missionId
router.post('/setModuleStatus', moduleController.setModuleStatus);

export default router;