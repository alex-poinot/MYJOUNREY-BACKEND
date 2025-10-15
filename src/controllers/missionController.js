import MissionService from '../services/missionService.js';
import logger from '../utils/logger.js';
import { asyncHandler } from '../utils/errorHandlers.js';

class MissionController {
  constructor() {
    this.missionService = new MissionService();
  }

  getAllMissionsDashboard = asyncHandler(async (req, res) => {
    const { email } = req.params;
    logger.info(`Controller: Requête GET /getAllMissionsDashboard/${email}`);

    const result = await this.missionService.getAllMissionsDashboard(email);

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllMissionAccessModuleEditor = asyncHandler(async (req, res) => {
    const { email, module } = req.params;
    logger.info(`Controller: Requête GET /getAllMissionAccessModuleEditor/${email}&${module}`);

    const result = await this.missionService.getAllMissionAccessModuleEditor(email, module);

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });
}

export default MissionController;