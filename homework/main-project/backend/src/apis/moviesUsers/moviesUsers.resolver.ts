import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/types/context';
import { MovieUser } from './entities/movieUser.entity';
import { MoviesUsersService } from './moviesUsers.service';

@Resolver()
export class MoviesUsersResolver {
  constructor(
    private readonly moviesUsersService: MoviesUsersService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => MovieUser)
  createPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.moviesUsersService.create({ impUid, amount, user });
  }
}
