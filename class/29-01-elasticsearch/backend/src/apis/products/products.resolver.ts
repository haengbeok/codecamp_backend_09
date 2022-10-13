import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //

    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => String)
  async fetchProducts() {
    // elasticsearch에서 조회하기 연습
    const result = await this.elasticsearchService.search({
      index: 'myproduct09',
      query: {
        match_all: {},
      },
    });

    console.log(JSON.stringify(result, null, '  '));

    return 'elasticsearch에서 조회 완료!!';
    // elasticsearch에서 조회해보기 위해 임시로 주석
    // return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => String)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // elasticsearch에 등록하기 연습
    this.elasticsearchService.create({
      id: 'myid',
      index: 'myproduct09',
      document: {
        name: '철수',
        age: 13,
        school: '다람쥐초등학교',
        ...createProductInput,
      },
    });

    return 'elasticsearch에 등록 완료!!';
    // elasticsearch에 등록해보기 위해 임시로 주석
    // return this.productsService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매 완료가 되었는지 확인해보기
    await this.productsService.checkSoldout({ productId });

    // 수정하기
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productsService.delete({ productId });
  }
}
