import FileService from '../services/fileService.js';
import logger from '../utils/logger.js';
import { asyncHandler } from '../utils/errorHandlers.js';

class FileController {
  constructor() {
    this.fileService = new FileService();
  }

  setModuleFile = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête POST /setModuleFile`);

    const moduleFile = req.body;
    const result = await this.fileService.setModuleFile(moduleFile);

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });


  getModuleFiles = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getModuleFiles`);

    const { missionIdDosPgiDosGroupe, module, profilId, source } = req.params;
    const result = await this.fileService.getModuleFiles(missionIdDosPgiDosGroupe, module, profilId, source);

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  deleteModuleFile = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête DELETE /deleteModuleFile`);

    const { fileId } = req.params;
    const result = await this.fileService.deleteModuleFile(fileId);

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });
}

export default FileController;