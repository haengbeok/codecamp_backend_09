import {
  ConflictException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/types/context';
import { IamportService } from '../iamport/iamport.service';
import {
  MovieUser,
  MOVIE_USER_PAYMENT_STATUS_ENUM,
} from './entities/movieUser.entity';
import { MoviesUsersService } from './moviesUsers.service';

@Resolver()
export class MoviesUsersResolver {
  constructor(
    private readonly moviesUsersService: MoviesUsersService, //
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => MovieUser)
  async createPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const token = await this.iamportService.getAccessToken();
    await this.iamportService.paymentInfo({ impUid, amount, token });

    await this.moviesUsersService.checkDuplicate({ impUid });

    const user = context.req.user;
    return this.moviesUsersService.create({ impUid, amount, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => MovieUser)
  async cancelPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    await this.moviesUsersService.checkCanceled({ impUid });

    const token = await this.iamportService.getAccessToken();
    const canceledAmount = await this.iamportService.cancelPayment({
      impUid,
      amount,
      token,
    });

    return await this.moviesUsersService.cancel({
      impUid,
      amount: canceledAmount,
      user,
    });
  }
}
