import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSalesLocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductSalesLocation)
    private readonly productSaleslocationRepository: Repository<ProductSalesLocation>,

    @InjectRepository(ProductTag)
    private readonly productTagsRepository: Repository<ProductTag>,
  ) {}

  findAll() {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    // 1. 상품만 등록하는 경우
    // const result = this.productsRepository.save({
    //   ...createProductInput,

    //   // 하나하나 직접 나열하는 방식
    //   //   name: '마우스',
    //   //   description: '좋은 마우스',
    //   //   price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    // 2-1. 상품판매위치 등록
    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,

      // 하나하나 직접 나열하는 방식
      // address: productSalesLocation.address
      // addressDetail: productSalesLocation.addressDetail
      // lat: productSalesLocation.lat
      // lng: productSalesLocation.lng
      // meetingTime: productSalesLocation.meetingTime
    });

    // 2-2. 상품태그 등록
    // productTags가 ['#전자제품', '#영등포', '#컴퓨터']와 같은 패턴으로 가정
    const temp = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      // 이미 등록된 태그 조회
      const prevTag = await this.productTagsRepository.findOne({
        where: { name: tagname },
      });

      if (prevTag) {
        // 기존에 태그가 존재한다면
        temp.push(prevTag);
      } else {
        // 기존에 태그가 존재하지 않는다면
        // for문 안에서의 await는 안티패턴(나중에 Promise.all로 바꾸기)
        const newTag = await this.productTagsRepository.save({
          name: tagname,
        });
        temp.push(newTag);
      }
    }

    // # 없을때
    // for (let i = 0; i < productTags.length; i++) {
    //   this.productTagsRepository.save({
    //     name: productTags[i],
    //   });
    // }

    // 2-3. 상품 등록
    const result2 = await this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기 ex) {id: result.id} 프론트에서 등록 결과를 saleslocation까지 모두 받을 수 없음
      productCategory: {
        id: productCategoryId,
        // name 까지 받고싶으면? 1) createProductInput에서 productCategoryInput 만들고 name까지 포함시켜서 받아오기
        //                   2) result2를 만들기 전에, productCategoryId를 사용해서 카테고리 name을 조회하고, 그 name을 여기에 포함시키기
      },
      productTags: temp,

      // 하나하나 직접 나열하는 방식
      // name: product.name,
      // description: product.description,
      // price: product.price,
      // productSalesLocation: {
      //   id: result.id,
      // },
    });

    // 4. 최종결과 돌려주기
    return result2; //{ id: ~!@, name: "마우스", description: "좋은 마우스", ...}
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

  async delete({ productId }) {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //
    // 2. 소프트 삭제(직접 구현) -isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });
    //
    // 3. 소프트 삭제(직접 구현) - deletdeAt
    // this.productsRepository.update({ id: productId },{ deletedAt: new Date() });
    //
    // 4. 소프트 삭제(TypeORM이 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제(TypeOrm이 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); // 다른 컬럼으로도 삭제 가능
    return result.affected ? true : false;
  }
}
