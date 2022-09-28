import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authservice: AuthService, //
    private readonly userService: UserService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('userEmail') userEmail: string, //
    @Args('password') password: string,
  ) {
    const user = await this.userService.findOne({ userEmail });

    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');
    console.log(user);
    return this.authservice.getAccessToken({ user });
  }
}
