import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateStarbucksInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  kcal: number;

  @Field(() => Int)
  saturated_fat: number;

  @Field(() => Int)
  protein: number;

  @Field(() => Int)
  natrium: number;

  @Field(() => Int)
  sugar: number;

  @Field(() => Int)
  caffeine: number;
}
