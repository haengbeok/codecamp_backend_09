import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMovieImageInput {
  @Field(() => String)
  url: string;

  @Field(() => Boolean)
  isMain: boolean;

  @Field(() => String)
  movieId: string;
}
