import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieGenre } from '../moviesGenres/entities/movieGenre.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>, //
    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,
  ) {}

  async create({ createMovieInput }) {
    const { movieGenres, ...movie } = createMovieInput;

    const temp = [];

    console.log(movieGenres, ':movieGenre');
    for (let i = 0; i < movieGenres.length; i++) {
      const genreName = movieGenres[i];

      const prevGenre = await this.movieGenreRepository.findOne({
        where: { name: genreName },
      });

      if (prevGenre) {
        temp.push(prevGenre);
      } else {
        const newGenre = await this.movieGenreRepository.save({
          name: genreName,
        });
        temp.push(newGenre);
      }
    }
    const result = await this.movieRepository.save({
      movieGenres: temp,
      ...movie,
    });
    return result;
  }

  findOne({ movieId }) {
    return this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['movieGenres', 'movieTheaters'],
    });
  }
  async findAll() {
    return this.movieRepository.find({
      relations: ['movieGenres', 'movieTheaters'],
    });
  }

  async update({ movieId, updateMovieInput }) {
    const updateMovie = await this.movieRepository.findOne({
      where: { id: movieId },
    });
    const result = this.movieRepository.save({
      ...updateMovie,
      id: movieId,
      ...updateMovieInput,
    });
    return result;
  }
}
