import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'myRefreshKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    // console.log(payload);
    const refreshToken = req.headers['cookie'].replace('refreshToken=', '');
    const isToken = await this.cacheManager.get(
      `refreshToken: ${refreshToken}`,
    );

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
