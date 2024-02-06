import { Router, Request, Response, NextFunction } from 'express';

export default class IndexRouter {
  public router: Router

  constructor() {
    this.router = Router();
    this.router.get('/', this.getIndex)
  }

  getIndex(req: Request, res: Response, next: NextFunction) {
    res.render('index', { title: 'Express' });
  };

}