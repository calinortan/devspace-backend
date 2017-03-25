import { Router, Request, Response, NextFunction } from 'express';
import { encode } from 'jwt-simple';
import JwtTokenCreator from '../../services/JwtTokenCreator'
import * as Passport from 'passport';
import DocumentsController from '../../controllers/DocumentsController'
import PassportStrategyManager from '../../services/PassportStrategyManager'

export class DocumentsRouter {
  private router: Router;
  private controller: DocumentsController;
  private strategyManager: PassportStrategyManager;

  constructor() {
    this.router = Router();
    this.controller = new DocumentsController();
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.json({
        message: 'This is the documents endpoint and should be guarded by authorization token'
      });
    });
  }

  public getRouter(): Router {
    return this.router
  }
}

// Create the HeroRouter, and export its configured Express.Router
const documentsRoutes = new DocumentsRouter();

export default documentsRoutes.getRouter();