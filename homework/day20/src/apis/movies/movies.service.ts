import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  findAll() {
    return this.moviesRepository.find();
  }

  findOne({ movieId }) {
    return this.moviesRepository.findOne({ where: { id: movieId } });
  }

  create({ createMovieInput }) {
    const result = this.moviesRepository.save({
      ...createMovieInput,
    });
    return result;
  }

  async update({ movieId, updateMovieInput }) {
    const updateMovie = await this.moviesRepository.findOne({
      where: { id: movieId },
    });
    const result = this.moviesRepository.save({
      ...updateMovie,
      id: movieId,
      ...updateMovieInput,
    });
    return result;
  }
}
