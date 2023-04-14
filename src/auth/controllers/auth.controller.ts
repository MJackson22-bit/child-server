import { Request, Response } from "express";
import { HttpResponse } from "../../shared/response/http.response";
import { UserEntity } from "../../user/entities/user.entity";
import { AuthService } from "../services/auth.service";

export class AuthController extends AuthService {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()) {
        super();
    }

    async login(req: Request, res: Response) {
        try {
            const userEncode = req.user as UserEntity;
            const encode = await this.generateJWT(userEncode);
            if (!encode) {
                return this.httpResponse.Unauthorized(res, "Unauthorized");
            }
            res.header("Content-Type", "application/json");
            res.cookie("accessToken", encode.accessToken, {maxAge: 60000 * 60});
            res.write(JSON.stringify(encode));
            res.end();
        } catch (error) {
            console.error(error);
            return this.httpResponse.Error(res, error);
        }
    }
}
