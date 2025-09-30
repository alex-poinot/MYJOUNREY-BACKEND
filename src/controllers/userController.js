import UserService from '../services/userService.js';
import logger from '../utils/logger.js';
import { asyncHandler } from '../utils/errorHandlers.js';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /users');
    
    const result = await this.userService.getAllUsers();
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });

  getAllAdminUsers = asyncHandler(async (req, res) => {
    logger.info('Controller: Requête GET /getAllAdminUsers');
    
    const result = await this.userService.getAllAdminUsers();
    
    res.status(200).json({
      ...result,
      timestamp: new Date().toISOString()
    });
  });
}

export default UserController;