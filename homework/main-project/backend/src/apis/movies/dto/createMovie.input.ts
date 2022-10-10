import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  summary: string;

  @Field(() => String)
  open: string;

  @Field(() => [String])
  movieGenres: string[];

  @Field(() => [String])
  movieURL: string[];
}
