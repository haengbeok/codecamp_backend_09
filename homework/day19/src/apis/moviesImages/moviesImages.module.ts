import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieImage } from './entities/movieImage.entity';
import { MoviesImagesResolver } from './moviesImages.resolver';
import { MoviesImagesService } from './moviesImages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieImage, //
    ]),
  ],
  providers: [
    MoviesImagesResolver, //
    MoviesImagesService,
  ],
})
export class MoviesImagesModule {}
