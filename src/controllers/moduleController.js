import ModuleService from '../services/moduleService.js';
import logger from '../utils/logger.js';
import { asyncHandler } from '../utils/errorHandlers.js';

class ModuleController {
  constructor() {
    this.moduleService = new ModuleService();
  }

  setModuleStatus = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête POST /setModuleStatus`);

    const moduleStatus = req.body;
    const result = await this.moduleService.setModuleStatus(moduleStatus);

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });
}

export default ModuleController;