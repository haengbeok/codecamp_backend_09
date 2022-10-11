import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  summary: string;

  @Field(() => String)
  open: string;
}
