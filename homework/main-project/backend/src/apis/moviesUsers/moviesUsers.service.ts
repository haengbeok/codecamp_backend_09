import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

    private readonly dataSource: DataSource,
  ) {}

  async checkDuplicate({ impUid }) {
    const result = await this.moviesUsersRepository.findOne({
      where: { impUid },
    });
    if (result) throw new ConflictException('이미 결제된 건입니다.');
  }

  async checkCanceled({ impUid }) {
    const checkCanceled = await this.moviesUsersRepository.findOne({
      where: { impUid, isPayment: MOVIE_USER_PAYMENT_STATUS_ENUM.CANCEL },
    });
    if (checkCanceled) throw new ConflictException('이미 취소된 건입니다.');
  }

  async cancel({ impUid, amount, user: _user }) {
    const movieUser = await this.create({
      impUid,
      amount: -amount,
      user: _user,
      isPayment: MOVIE_USER_PAYMENT_STATUS_ENUM.CANCEL,
    });
    return movieUser;
  }

  async create({
    impUid,
    amount,
    user: _user,
    isPayment = MOVIE_USER_PAYMENT_STATUS_ENUM.PAYMENT,
  }) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 1. MovieUser 테이블에 거래기록 1줄 생성
      const movieUser = this.moviesUsersRepository.create({
        impUid,
        amount,
        user: _user,
        isPayment,
      });

      // await this.moviesUsersRepository.save(movieUser);
      await queryRunner.manager.save(movieUser);

      // 2. 유저의 돈 찾기
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' },
      });

      // 3, 유저의 돈 업데이트 하기
      // this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser);

      await queryRunner.commitTransaction();

      // 4. 프론트에 넘겨주기
      return movieUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
