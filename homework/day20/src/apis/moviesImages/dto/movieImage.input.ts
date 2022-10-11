import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MovieImageInput {
  @Field(() => String)
  url: string;

  @Field(() => Boolean)
  isMain: boolean;

  @Field(() => String)
  movieId: string;
}
