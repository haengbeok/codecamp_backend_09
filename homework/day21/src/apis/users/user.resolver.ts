import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'createUserInput', nullable: true }) //
    createUserInput: CreateUserInput,
  ) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    return this.userService.create({ createUserInput, hashedPassword });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteLoginUser(
    @Args('userEmail') userEmail: string, //
    @Context() Context: any,
  ) {
    return this.userService.delete({ userEmail });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchLoginUser(
    @Args('userEmail') userEmail: string,
    @Context() context: any, //
  ) {
    // console.log(context.req.user);
    // console.log('fetchUser 실행 완료');
    return this.userService.findOne({ userEmail });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUserPwd(
    @Args('userEmail') userEmail: string,
    @Context() Context: any,
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    const hashedPassword = await bcrypt.hash(updateUserInput.password, 10);
    return this.userService.updateUserPwd({
      userEmail,
      updateUserInput,
      hashedPassword,
    });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userEmail')
    userEmail: string,
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update({ userEmail, updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('userEmail') userEmail: string) {
    return this.userService.delete({ userEmail });
  }

  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  fetchUser(
    @Args('userEmail')
    userEmail: string,
  ) {
    return this.userService.findOne({ userEmail });
  }
}
