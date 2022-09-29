import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMovieInput } from './dto/createMovie.input';
import { UpdateMovieInput } from './dto/updateMovie.input';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movies.service';

@Resolver()
export class MovieResolver {
  constructor(
    private readonly movieService: MovieService, //
  ) {}
  @Query(() => [Movie])
  fetchMovies() {
    return this.movieService.findAll();
  }

  @Query(() => Movie)
  fetchMovie(
    @Args('movieId')
    movieId: string,
  ) {
    return this.movieService.findOne({ movieId });
  }

  @Mutation(() => Movie)
  createMovie(
    @Args({ name: 'createMovieInput', nullable: true }) //
    createMovieInput: CreateMovieInput,
  ) {
    return this.movieService.create({ createMovieInput });
  }

  @Mutation(() => Movie)
  async UpdateMovie(
    @Args('movieId') movieId: string,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
  ) {
    return await this.movieService.update({ movieId, updateMovieInput });
  }
}
