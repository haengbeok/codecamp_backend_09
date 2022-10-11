import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MovieImageInput } from './dto/movieImage.input';
import { MovieImage } from './entities/movieImage.entity';
import { MoviesImagesService } from './moviesImages.service';

@Resolver()
export class MoviesImagesResolver {
  constructor(
    private readonly moviesImagesService: MoviesImagesService, //
  ) {}

  @Mutation(() => MovieImage)
  createMovieImage(
    @Args({ name: 'movieImageInput', nullable: true })
    movieImageInput: MovieImageInput,
  ) {
    return this.moviesImagesService.create({ movieImageInput });
  }
}
