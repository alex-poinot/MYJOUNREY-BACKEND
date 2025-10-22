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

  verifNogLoad = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const { codeAffaire } = req.params;
    const result = await this.nogService.verifNogLoad(codeAffaire);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogCoordonnees = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogCoordonnees(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogContacts = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogContacts(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogAssocies = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogAssocies(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogCS = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogCS(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogTypeMission = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogTypeMission(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogNatureMission = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogNatureMission(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogPlanning = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogPlanning(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogEquipeInter = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogEquipeInter(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogLogiciel = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogLogiciel(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogFE = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogFE(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogVigilance = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogVigilance(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogDiligence = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogDiligence(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogModuleTexte = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogModuleTexte(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogValue = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogValue(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogFileAnnexe = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogFileAnnexe(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogDiligenceAdd = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogDiligenceAdd(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  insertNogDiligenceLab = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /nogs');
    
    const obj = req.body;
    const result = await this.nogService.insertNogDiligenceLab(obj);
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

}

export default NogController;