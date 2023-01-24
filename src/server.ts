import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { CategoryRouter } from "./category/category.router";
import { CustomerRouter } from "./customer/customer.router";
import { ProductRouter } from "./product/product.router";
import { PurchaseRouter } from "./purchase/purchase.router";
import { PurchasesProductsRouter } from "./purchase/purchases-products.router";
import { DataSource } from "typeorm";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { AuthRouter } from "./auth/auth.router";

class ServerBootstrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor() {
    // Initial configuration
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.passportUse();
    this.dbConnect()
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use('/api', this.routers());

    this.listen();
  }

  routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new CategoryRouter().router,
      new CustomerRouter().router,
      new ProductRouter().router,
      new PurchaseRouter().router,
      new PurchasesProductsRouter().router,
      new AuthRouter().router
    ];
  }

  passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use]
  }

  async dbConnect(): Promise<DataSource | void> {
      return this.initConnect.then(() => {
        console.log("Connect Success")
      }).catch((err) => {
        console.error(err);
      })
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port => ${this.port}`);
    });
  }
}

new ServerBootstrap();
