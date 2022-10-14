import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { CreateMovieInput } from './dto/createMovie.input';
import { UpdateMovieInput } from './dto/updateMovie.input';
import { Movie } from './entities/movie.entity';
import { MovieService } from './movies.service';

@Resolver()
export class MovieResolver {
  constructor(
    private readonly movieService: MovieService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Movie])
  async fetchMovies(
    @Args('search') search: string, //
  ) {
    // redis에서 찾아보기
    const searchCache = await this.cacheManager.get(search);

    // redis에 있으면 그 값 리턴
    if (searchCache) return searchCache;

    // redis에 없으면 elastic에서 찾아보기
    const elaSearch = await this.elasticsearchService.search({
      index: 'main-project-docker',
      query: {
        match: { title: search },
      },
    });

    // elastic에서 검색해서 가져오기
    console.log(elaSearch.hits.hits[0]._source);
    const elaResult = elaSearch.hits.hits[0]._source;

    // 가져온 값 redis에 저장
    await this.cacheManager.set(search, elaResult, {
      ttl: 60,
    });

    // 가져온 값 리턴
    return [elaResult];

    // console.log(JSON.stringify(elaSearch, null, '  '));
    // return this.movieService.findAll({ search });
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
