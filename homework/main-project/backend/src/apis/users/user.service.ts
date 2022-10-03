import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ createUserInput, hashedPassword: password }) {
    const { ...user } = createUserInput;
    const userEmail = createUserInput.email;
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const prevUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (prevUser) {
      throw new ConflictException('이미 가입한 회원입니다.');
    }

    return await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  findOne({ userEmail }) {
    return this.userRepository.findOne({ where: { email: userEmail } });
  }

  findId({ userId }) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  findAll() {
    return this.userRepository.find();
  }

  async delete({ userEmail }) {
    const result = await this.userRepository.softDelete({
      email: userEmail,
    });
    return result.affected ? true : false;
  }

  async restore({ userEmail }) {
    const result = await this.userRepository.restore({
      email: userEmail,
    });
    return result.affected ? true : false;
  }

  async update({ userEmail, updateUserInput }) {
    const updateUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    const result = this.userRepository.save({
      ...updateUser,
      email: userEmail,
      ...updateUserInput,
    });
    return result;
  }

  async updateUserPwd({
    userEmail,
    updateUserInput,
    hashedPassword: password,
  }) {
    const updateUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    const result = this.userRepository.save({
      ...updateUser,
      ...updateUserInput,
      password,
    });
    return result;
  }
}
