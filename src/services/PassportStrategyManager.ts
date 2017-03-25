import * as Passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { StrategyOptions as JwtStrategyOptions } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { IStrategyOptions as LocalStrategyOptions } from 'passport-local';
import { ITokenPayload } from './JwtTokenCreator';
import { UserModel, User } from '../models/User';
import { Handler } from 'express'
const config = require('../../config');

class PassportStrategyManager {
  private manager: Passport.Passport = Passport;
  private strategies = [];

  constructor() {
    this.computeStrategies();
    this.addStrategiesToManager();
  }

  private computeStrategies(): void {
    this.strategies.push(
      this.createJwtStrategy(),
      this.createLocalStrategy()
    );
  }

  private addStrategiesToManager(): void {
    this.strategies.forEach((strategy: JwtStrategy) => {
      this.manager.use(strategy);
    });
  }

  private createJwtStrategy(): JwtStrategy {
    const jwtOptions: JwtStrategyOptions = {
      secretOrKey: config.secret,
      jwtFromRequest: ExtractJwt.fromHeader('authorization')
    }
    return new JwtStrategy(jwtOptions, (payload: ITokenPayload, done: VerifiedCallback) => {
      UserModel.findById(payload.iss, (err, user: User) => {
        if (err != null) {
          return done(err, false)
        }
        return done(null, user != null ? user : false)
      });
    });
  }

  private createLocalStrategy(): LocalStrategy {
    const options: LocalStrategyOptions = {
      usernameField: 'email'
    }
    return new LocalStrategy(options, (email, password, done) => {
      UserModel.findOne({ email }, (err, user: User) => {
        if (err != null) return done(err);
        if (user == null) return done(null, false);
        return user.handleLoginAttempt(password, (err, isMatch) => {
          if (err != null) return done(err);

          return isMatch ? done(null, user) : done(null, false);
        });
      });
    });
  }

  public createJwtHandler(): Handler {
    return this.manager.authenticate('jwt', { session: false });
  }

  public createLocalHandler(): Handler {
    return this.manager.authenticate('local', { session: false });
  }
}

export default PassportStrategyManager;