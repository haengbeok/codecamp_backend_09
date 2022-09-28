import { InputType, OmitType } from '@nestjs/graphql';
import { Movie } from '../entities/movie.entity';

@InputType()
export class MovieInput extends OmitType(Movie, ['id'], InputType) {}
