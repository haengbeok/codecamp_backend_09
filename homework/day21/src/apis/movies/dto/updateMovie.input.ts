import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMovieInput } from './createMovie.input';

@InputType()
export class UpdateMovieInput extends PartialType(CreateMovieInput) {}
