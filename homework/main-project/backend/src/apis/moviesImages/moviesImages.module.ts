import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../movies/entities/movie.entity';
import { MovieImage } from './entities/movieImage.entity';
import { MovieImageResolver } from './moviesImages.resolver';
import { MovieImageService } from './moviesImages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieImage, //
      Movie,
    ]),
  ],
  providers: [
    MovieImageResolver, //
    MovieImageService,
  ],
})
export class MovieImageModule {}
