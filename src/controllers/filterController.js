import FilterService from '../services/filterService.js';
import logger from '../utils/logger.js';
import { asyncHandler } from '../utils/errorHandlers.js';

class FilterController {
  constructor() {
    this.filterService = new FilterService();
  }

  getAllGroupesFilter = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getAllGroupesFilter`);

    const result = await this.filterService.getAllGroupesFilter();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllDossiersFilter = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getAllDossiersFilter`);

    const result = await this.filterService.getAllDossiersFilter();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllBureauxFilter = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getAllBureauxFilter`);

    const result = await this.filterService.getAllBureauxFilter();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllMissionsFilter = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getAllMissionsFilter`);

    const result = await this.filterService.getAllMissionsFilter();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllMillesimesFilter = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getAllMillesimesFilter`);

    const result = await this.filterService.getAllMillesimesFilter();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllFormesJuridiqueFilter = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getAllFormesJuridiqueFilter`);

    const result = await this.filterService.getAllFormesJuridiqueFilter();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllNafsFilter = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getAllNafsFilter`);

    const result = await this.filterService.getAllNafsFilter();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllDmcmFactFilter = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getAllDmcmFactFilter`);

    const result = await this.filterService.getAllDmcmFactFilter();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllAssociesFilter = asyncHandler(async (req, res) => {
    logger.info(`Controller: Requête GET /getAllAssociesFilter`);

    const result = await this.filterService.getAllAssociesFilter();

    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });
}

export default FilterController;