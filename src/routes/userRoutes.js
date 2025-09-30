import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();
const userController = new UserController();

// GET /api/users - Récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);
router.get('/getAllAdminUsers', userController.getAllAdminUsers);


export default router;