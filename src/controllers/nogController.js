import NogService from '../services/nogService.js';
import logger from '../utils/logger.js';
import { asyncHandler } from '../utils/errorHandlers.js';

class NogController {
  constructor() {
    this.nogService = new NogService();
  }

  getCoordonneesNog = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const { dosPgi } = req.params;
    const result = await this.nogService.getCoordonneesNog(dosPgi);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getTypeMissionNatureNog = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const result = await this.nogService.getTypeMissionNatureNog();
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getListeDiligenceDefault = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const result = await this.nogService.getListeDiligenceDefault();
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getListeDiligenceBibliotheque = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const result = await this.nogService.getListeDiligenceBibliotheque();
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

}

export default NogController;