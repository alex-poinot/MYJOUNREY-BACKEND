import express from 'express';
import FileController from '../controllers/fileController.js';

const router = express.Router();
const fileController = new FileController();

// POST /api/setModuleFile - Définir un fichier pour un module qui prend un objet json avec les champs : module, email, file, missionId, title
router.post('/setModuleFile', fileController.setModuleFile);
router.get('/getModuleFiles/:missionIdDosPgiDosGroupe&:module&:profilId&:source', fileController.getModuleFiles);
router.post('/deleteModuleFile', fileController.deleteModuleFile);

export default router;