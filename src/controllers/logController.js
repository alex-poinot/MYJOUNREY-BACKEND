import LogService from '../services/logService.js';
import logger from '../utils/logger.js';
import { asyncHandler } from '../utils/errorHandlers.js';

class LogController {
  constructor() {
    this.logService = new LogService();
  }

  setLog = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête POST /setLog`);

    const log = req.body;
    const result = await this.logService.setLog(log);

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  setLogMission = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête POST /setLogMission`);

    const log = req.body;
    const result = await this.logService.setLogMission(log);

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  setLogConnexion = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête POST /setLogConnexion`);

    const logObj = req.body;
    const result = await this.logService.setLogConnexion(logObj);

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });
}

export default LogController;