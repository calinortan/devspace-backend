import { Router, Request, Response, NextFunction } from 'express';
import { encode } from 'jwt-simple';
import JwtTokenCreator from '../../services/JwtTokenCreator'
import * as Passport from 'passport';
import UsersController from '../../controllers/UsersController'
import PassportStrategyManager from '../../services/PassportStrategyManager'

export class UsersRouter {
  private router: Router;
  private controller: UsersController;
  private strategyManager: PassportStrategyManager;

  constructor() {
    this.router = Router();
    this.controller = new UsersController();
    this.strategyManager = new PassportStrategyManager();
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.get('/',this.strategyManager.createJwtHandler(), this.controller.getAllUsers);
    this.router.post('/', this.controller.addUser);
    this.router.get('/:user_id', this.controller.getUserWithId);
    this.router.get('/:user_id/stats', this.controller.getStats);
    this.router.put('/:user_id/stats', this.controller.saveOrUpdateStats);

  }

  public getRouter(): Router {
    return this.router
  }
}

// Create the HeroRouter, and export its configured Express.Router
const usersRoutes = new UsersRouter();

export default usersRoutes.getRouter();