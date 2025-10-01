import express from 'express';
import FilterController from '../controllers/filterController.js';

const router = express.Router();
const filterController = new FilterController();

// GET /api/getAllGroupesFilter - Récupérer toutes les filters
router.get('/getAllGroupesFilter', filterController.getAllGroupesFilter);
router.get('/getAllDossiersFilter', filterController.getAllDossiersFilter);
router.get('/getAllBureauxFilter', filterController.getAllBureauxFilter);
router.get('/getAllMissionsFilter', filterController.getAllMissionsFilter);
router.get('/getAllMillesimesFilter', filterController.getAllMillesimesFilter);
router.get('/getAllFormesJuridiqueFilter', filterController.getAllFormesJuridiqueFilter);
router.get('/getAllNafsFilter', filterController.getAllNafsFilter);
router.get('/getAllDmcmFactFilter', filterController.getAllDmcmFactFilter);
router.get('/getAllAssociesFilter', filterController.getAllAssociesFilter);

export default router;