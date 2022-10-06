import {
  ConflictException,
  HttpException,
  Injectable,
  Ip,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    try {
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
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async paymentInfo({ impUid, amount, token }) {
    try {
      const getPaymentData = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`, // imp_uid 전달
        method: 'get', // GET method
        headers: { Authorization: token }, // 인증 토큰 Authorization header에 추가
      });
      if (getPaymentData.data.response.status !== 'paid')
        throw new ConflictException('결제 내역이 존재하지 않습니다.');
      if (getPaymentData.data.response.amount !== amount)
        throw new UnprocessableEntityException(
          '결제 금액이 일치하지 않습니다.',
        );
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async cancelPayment({ impUid, amount, token }) {
    try {
      const getCancelData = await axios({
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
      return getCancelData.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}
