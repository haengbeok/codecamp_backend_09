import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/types/context';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authservice: AuthService, //
    private readonly userService: UserService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('userEmail') userEmail: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    const user = await this.userService.findOne({ userEmail });

    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');
    // console.log(context.res);
    this.authservice.setRefreshToken({ user, res: context.res });

    return this.authservice.getAccessToken({ user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(@Context() context: IContext) {
    // const jwtToken = jwt.verify(token, 'shhhh');
    const accessToken = context.req.headers['authorization'].replace(
      'Bearer ',
      '',
    );
    const refreshToken = context.req.headers['cookie'].replace(
      'refreshToken=',
      '',
    );

    const accessTokenTtl =
      jwt.verify(accessToken, 'myAccessKey')['exp'] -
      jwt.verify(accessToken, 'myAccessKey')['iat'];

    const refreshTokenTtl =
      jwt.verify(refreshToken, 'myRefreshKey')['exp'] -
      jwt.verify(refreshToken, 'myRefreshKey')['iat'];

    try {
      jwt.verify(accessToken, 'myAccessKey');
      await this.cacheManager.set(
        `accessToken: ${accessToken}`,
        'accessToken',
        { ttl: accessTokenTtl },
      );

      jwt.verify(refreshToken, 'myRefreshKey');
      await this.cacheManager.set(
        `refreshToken: ${refreshToken}`,
        'refreshToken',
        { ttl: refreshTokenTtl },
      );
    } catch {
      throw new UnauthorizedException();
    }

    return '로그아웃에 성공했습니다';
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ) {
    return this.authservice.getAccessToken({ user: context.req.user });
  }
}
