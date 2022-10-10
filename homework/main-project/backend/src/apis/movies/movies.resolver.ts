import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { FilesService } from '../files/files.service';
import { CreateMovieInput } from './dto/createMovie.input';
import { UpdateMovieInput } from './dto/updateMovie.input';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movies.service';

@Resolver()
export class MovieResolver {
  constructor(
    private readonly movieService: MovieService, //

    private readonly filesService: FilesService,
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
  async updateMovie(
    @Args('movieId') movieId: string,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
  ) {
    await this.movieService.deleteImg({ movieId });
    return await this.movieService.update({ movieId, updateMovieInput });
  }
}
