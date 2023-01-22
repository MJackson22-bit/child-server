import { Router } from "express";

export class BaseRouter<T, U> {
  public router: Router;
  public controller: T;
  public middelware: U

  constructor(TController: { new (): T }, UMiddleware: { new (): U}) {
    this.router = Router();
    this.controller = new TController();
    this.middelware = new UMiddleware();
    this.routes();
  }

  routes() {}
}
