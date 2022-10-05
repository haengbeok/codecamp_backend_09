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
    const result = await this.iamportService.paymentInfo({
      imp_uid: impUid,
      amount,
    });
    const findPayment = await this.moviesUsersService.findOne({ impUid });
    // console.log(findPayment.impUid);
    if (findPayment.impUid === impUid) {
      throw new ConflictException('이미 추가되어있습니다.');
    }
    const user = context.req.user;
    if (result) {
      return this.moviesUsersService.create({ impUid, amount, user });
    }
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => MovieUser)
  async cancelPayment(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    //
    const findPayment = await this.moviesUsersService.findOne({ impUid });

    const user = context.req.user;
    const result = await this.iamportService.cancelPayment({ impUid, amount });
    if (result === null) {
      throw new UnprocessableEntityException('이미 취소된 건입니다.');
    } else {
      if (findPayment.isPayment == MOVIE_USER_PAYMENT_STATUS_ENUM.CANCEL) {
        throw new UnprocessableEntityException('이미 취소된 건입니다.');
      } else if (
        findPayment.isPayment === MOVIE_USER_PAYMENT_STATUS_ENUM.PAYMENT
      ) {
        return this.iamportService.cancel({ impUid, amount, user });
      }
    }
  }
}
