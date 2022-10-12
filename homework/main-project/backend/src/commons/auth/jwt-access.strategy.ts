import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    // console.log(payload);
    const accessToken = req.headers['authorization'].replace('Bearer ', '');
    const isToken = await this.cacheManager.get(`accessToken: ${accessToken}`);

    try {
      if (isToken === null) {
        return {
          email: payload.email,
          id: payload.sub,
        };
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
