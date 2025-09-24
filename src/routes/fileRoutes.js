import express from 'express';
import FileController from '../controllers/fileController.js';

const router = express.Router();
const fileController = new FileController();

// POST /api/setModuleFile - Définir un fichier pour un module qui prend un objet json avec les champs : module, email, file, missionId, title
router.post('/setModuleFile', fileController.setModuleFile);
//"message": "La route GET /files/getModuleFiles/179185&7&1 n'existe pas"
router.get('/getModuleFiles/:missionIdDosPgiDosGroupe&:module&:profilId&:source', fileController.getModuleFiles);
router.delete('/deleteModuleFile/:fileId', fileController.deleteModuleFile);

export default router;