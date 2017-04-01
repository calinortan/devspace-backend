import { Router, Request, Response, NextFunction } from 'express';
import { UserModel, User } from '../models/User';
import { encode } from 'jwt-simple';
import JwtTokenCreator from '../services/JwtTokenCreator'
import * as Passport from 'passport';
import UsersRouter from './entityRouters/UsersRouter';
import DocumentsRouter from './entityRouters/DocumentsRouter';
import FriendRequestsRouter from './entityRouters/FriendRequestsRouter';
import PassportStrategyManager from '../services/PassportStrategyManager'

export class AuthenticationRouter {
  private router: Router;
  private strategyManager: PassportStrategyManager;

  constructor() {
    this.router = Router();
    this.strategyManager = new PassportStrategyManager();
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.use(/^(?!(\/session|\/users)$).*$/, this.strategyManager.createJwtHandler());
    this.router.post('/session', this.strategyManager.createLocalHandler(), this.attemptLogin);
    // endpoints 
    this.router.use('/users', UsersRouter);
    this.router.use('/documents', DocumentsRouter);
    this.router.use('/friend-requests', FriendRequestsRouter);
  }

  public attemptLogin(req: Request, res: Response, next: NextFunction) {
    const token = JwtTokenCreator.generateToken(req.user.id, Date.now())
    res.status(200).json({ status: "succesful", token });
  }

  public getRouter(): Router {
    return this.router
  }
}

// Create the HeroRouter, and export its configured Express.Router
const authenticationRoutes = new AuthenticationRouter();

export default authenticationRoutes.getRouter();