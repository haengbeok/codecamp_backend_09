import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import {
  MovieUser,
  MOVIE_USER_PAYMENT_STATUS_ENUM,
} from '../moviesUsers/entities/movieUser.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class IamportService {
  constructor(
    @InjectRepository(MovieUser)
    private readonly moviesUsersRepository: Repository<MovieUser>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getAccessToken() {
    const token = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_KEY, // REST API키
        imp_secret: process.env.IMP_SECRET, // REST API Secret
      },
    });
    return token.data.response.access_token;
  }

  async paymentInfo({ imp_uid, amount }) {
    const token = await this.getAccessToken();
    const getPaymentData: any = await axios({
      url: 'https://api.iamport.kr/payments/' + imp_uid, // imp_uid 전달
      method: 'get', // GET method
      headers: { Authorization: token }, // 인증 토큰 Authorization header에 추가
    }).catch((err) => {
      console.log(err);
    });
    if (getPaymentData == null)
      throw new UnprocessableEntityException('결제 정보가 유효하지 않습니다.');
    else {
      if (getPaymentData.data?.response.amount === amount) {
        return true;
      } else {
        throw new UnprocessableEntityException(
          '결제 금액이 유효하지 않습니다.',
        );
      }
    }
  }

  async cancelPayment({ impUid, amount }) {
    const token = await this.getAccessToken();
    const getCancelData: any = await axios({
      url: 'https://api.iamport.kr/payments/cancel/',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // 아임포트 서버로부터 발급받은 엑세스 토큰
      },
      data: {
        // reason, // 가맹점 클라이언트로부터 받은 환불사유
        imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
        amount, // 가맹점 클라이언트로부터 받은 환불금액
        // checksum: cancelableAmount, // [권장] 환불 가능 금액 입력
      },
    });
    if (getCancelData.data.response == null) {
      return null;
    } else {
      return getCancelData;
    }
  }

  async cancel({ impUid, amount, user: _user }) {
    const movieUser = this.moviesUsersRepository.create({
      impUid: impUid,
      amount: -1 * amount,
      user: _user,
      isPayment: MOVIE_USER_PAYMENT_STATUS_ENUM.CANCEL,
    });

    await this.moviesUsersRepository.save(movieUser);

    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    this.usersRepository.update(
      { id: _user.id },
      { point: user.point + -1 * amount },
    );

    return movieUser;
  }
}
