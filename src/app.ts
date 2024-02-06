import createError from 'http-errors';
import express, { Application, Request, Response, NextFunction } from 'express';

import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import IndexRouter from './routes/index';
import UserRouter from './routes/user';

export default class App {
  public app: Application;

  constructor() {
    this.app = express();

    // view engine setup
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'ejs');

    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, '../public')));

    this.app.use('/', new IndexRouter().router);
    this.app.use('/users', new UserRouter().router);

    // catch 404 and forward to error handler
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      next(createError(404));
    });

    // error handler
    this.app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }

}