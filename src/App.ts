import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

// import HeroRouter from './routes/HeroRouter';
import AuthenticationRouter from './routes/AuthenticationRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(this.allowedOrigins);
  }

  private allowedOrigins(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' == req.method) {
      return res.send(200);
    }
    // Pass to next layer of middleware
    next();
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router: express.Router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        friend_reccomendations: [{
          _id: '58d7a61f11af570bc83e9d3c',
          recomendationFor: '58d7a61f11af570bc83e9d34',
          user: {
            _id: '58d7a61f11af570bc83e9d3e',
            "name": "Zsolt Solyom",
            "email": "zsoltsolyom18@test.com",
            "avatar": "",
            "age": 24,
            "workplace": "Softvision",
            "computerOS": "Linux",
            "mobileOS": "Android",
            "connections": [],
            "programmingLanguages": [
              "Javascript",
              "Java",
              "C/C++"
            ],
            "interests": [
              "Movies",
              " swimming",
              " cycling"
            ],
            "__v": 0
          }
        }]
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1/', AuthenticationRouter)
  }

}

export default new App().express;