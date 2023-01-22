import { UserController } from "./controllers/user.controller";
import { BaseRouter } from "../shared/router/router";
import { UserMiddleware } from "./middlewares/user.middleware";

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware);
  }

  routes(): void {
    this.router.get('/users', (req, res) => this.controller.getUsers(req, res));
    this.router.get('/user/:id', (req, res) => this.controller.getUserById(req, res));
    this.router.get('/userCustomer/:id', (req, res) => this.controller.getUserWithRelation(req, res));
    this.router.post('/createUser', 
      (req, res, next) => this.middelware.userValidator(req, res, next),
      (req, res) => this.controller.createUser(req, res));
    this.router.put('/updateUser/:id', (req, res) => this.controller.updateUser(req, res));
    this.router.delete('/deleteUser/:id', (req, res) => this.controller.deleteUser(req, res));
  }
}
