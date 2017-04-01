import { Router, Request, Response, NextFunction } from 'express';
import { encode } from 'jwt-simple';
import FriendRequestsController from '../../controllers/FriendRequestsController'
import PassportStrategyManager from '../../services/PassportStrategyManager'

export class FriendRequestsRouter {
  private router: Router;
  private controller: FriendRequestsController;
  private strategyManager: PassportStrategyManager;

  constructor() {
    this.router = Router();
    this.controller = new FriendRequestsController();
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.get('/', this.controller.getFriendRequestsForUser);
    this.router.post('/', this.controller.addFriendRequest);
    this.router.put('/:friendRequest_id', this.controller.updateFriendRequestStatus);
  }

  private addFriendRequest(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: 'This is FRIEND REQUESTS ENDPOINT POST POST'
    });
  }

  public getRouter(): Router {
    return this.router
  }
}

// Create the HeroRouter, and export its configured Express.Router
const routes = new FriendRequestsRouter();

export default routes.getRouter();