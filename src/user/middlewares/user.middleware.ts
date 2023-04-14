import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { UserDTO } from "../dto/user.dto";

export class UserMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  userValidator(req: Request, res: Response, next: NextFunction) {
    const {username, email, password} =
        req.body;

    const valid = new UserDTO();
    valid.username = username;
    valid.email = email;
    valid.password = password;

    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}
