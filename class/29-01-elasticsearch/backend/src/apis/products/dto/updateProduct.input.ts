import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // @Field(() => String)
  // qqq : string
}

// 유틸리티 타입
// PickType(CreateProductInput, ['name', 'price']); // 고르기
// OmitType(CreateProductInput, ['description']);   // 빼기
// PartialType(CreateProductInput);                 // 있어도 되고 없어도 됨(전부 nullable: true로 바뀜)
