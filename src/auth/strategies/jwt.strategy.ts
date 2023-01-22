import { ExtractJwt, StrategyOptions, Strategy } from "passport-jwt";
import { PayloadToken } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passport.user";

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }

  get use() {
    return PassportUse<
      Strategy,
      StrategyOptions,
      (payload: PayloadToken, done: any) => Promise<PayloadToken>
    >(
      "jwt",
      Strategy,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.getEnvironment("JWT_SECRET"),
      },
      this.validate
    );
  }
}
