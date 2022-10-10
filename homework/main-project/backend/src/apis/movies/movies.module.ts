import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from '../files/files.service';
import { MovieGenre } from '../moviesGenres/entities/movieGenre.entity';
import { MovieImage } from '../moviesImages/entities/movieImage.entity';
import { Movie } from './entities/movie.entity';
import { MovieResolver } from './movies.resolver';
import { MovieService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie, //
      MovieGenre,
      MovieImage,
    ]),
  ],
  providers: [
    MovieResolver, //
    MovieService,
    FilesService,
  ],
})
export class MovieModule {}
