import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMovieInput } from './dto/createMovie.input';
import { UpdateMovieInput } from './dto/updateMovie.input';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Resolver()
export class MoviesResolver {
  constructor(
    private readonly moviesService: MoviesService, //
  ) {}

  @Query(() => [Movie])
  fetchMovies() {
    return this.moviesService.findAll();
  }

  @Query(() => Movie)
  fetchMovie(
    @Args('movieId') movieId: string, //
  ) {
    return this.moviesService.findOne({ movieId });
  }

  @Mutation(() => Movie)
  createMovie(
    @Args({ name: 'createMovieInput', nullable: true })
    createMovieInput: CreateMovieInput,
  ) {
    return this.moviesService.create({ createMovieInput });
  }

  @Mutation(() => Movie)
  async updateProduct(
    @Args('movieId') movieId: string,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
  ) {
    return this.moviesService.update({ movieId, updateMovieInput });
  }
}
