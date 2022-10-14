import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
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
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    MovieResolver, //
    MovieService,
    FilesService,
  ],
})
export class MovieModule {}
