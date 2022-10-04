import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  MovieUser,
  MOVIE_USER_PAYMENT_STATUS_ENUM,
} from './entities/movieUser.entity';

@Injectable()
export class MoviesUsersService {
  constructor(
    @InjectRepository(MovieUser)
    private readonly moviesUsersRepository: Repository<MovieUser>, //

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, user: _user }) {
    // 1. MovieUser 테이블에 거래기록 1줄 생성
    const movieUser = this.moviesUsersRepository.create({
      impUid: impUid,
      amount: amount,
      user: _user,
      isPayment: MOVIE_USER_PAYMENT_STATUS_ENUM.PAYMENT,
    });

    await this.moviesUsersRepository.save(movieUser);

    // 2. 유저의 돈 찾기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    // 3, 유저의 돈 업데이트 하기
    this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );

    // 4. 프론트에 넘겨주기
    return movieUser;
  }
}
