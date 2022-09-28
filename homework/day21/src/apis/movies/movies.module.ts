import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGenre } from '../moviesGenres/entities/movieGenre.entity';
import { Movie } from './entities/movie.entity';
import { MovieResolver } from './movies.resolver';
import { MovieService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie, //
      MovieGenre,
    ]),
  ],
  providers: [
    MovieResolver, //
    MovieService,
  ],
})
export class MovieModule {}
