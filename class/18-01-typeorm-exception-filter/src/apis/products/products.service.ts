import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productsRepository.find();
  }

  findOne({ productId }) {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }) {
    const result = this.productsRepository.save({
      ...createProductInput,

      // 하나하나 직접 나열하는 방식
      //   name: '마우스',
      //   description: '좋은 마우스',
      //   price: 3000,
    });
    return result; //{ id: ~!@, name: "마우스", description: "좋은 마우스", ...}
  }

  async update({ productId, updateProductInput }) {
    // this.productsRepository.create() // 등록을 위한 빈 객체 만들기
    // this.productsRepository.insert() // 결과는 못 받는 등록 방법
    // this.productsRepository.update() // 결과는 못 받는 수정 방법

    // 수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
    const myproduct = await this.productsRepository.findOne({
      where: { id: productId },
    });
    const result = this.productsRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
