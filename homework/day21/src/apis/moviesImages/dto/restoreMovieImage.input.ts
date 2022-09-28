import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMovieImageInput } from './createMovieImage.input';

@InputType()
export class RestoreMovieImageInput extends PartialType(
  CreateMovieImageInput,
) {}
