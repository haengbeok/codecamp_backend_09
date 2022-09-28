import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movies/entities/movie.entity';
import { MovieImage } from './entities/movieImage.entity';

@Injectable()
export class MovieImageService {
  constructor(
    @InjectRepository(MovieImage)
    private readonly movieImageRepository: Repository<MovieImage>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create({ createMovieImageInput }) {
    const { movieId, ...movieImage } = createMovieImageInput;

    const result = await this.movieImageRepository.save({
      ...movieImage,
      movie: {
        id: movieId,
      },
    });

    return result;
  }
  findAll() {
    return this.movieImageRepository.find({
      relations: ['movie'],
    });
  }

  findDelete() {
    return this.movieImageRepository.find({
      relations: ['movie'],
      withDeleted: true,
    });
  }

  findOne({ movieImageId }) {
    return this.movieImageRepository.findOne({
      where: { id: movieImageId },
      relations: ['movie'],
    });
  }

  async delete({ movieImageId }) {
    const result = await this.movieImageRepository.softDelete({
      id: movieImageId,
    });
    return result.affected ? true : false;
  }

  async restore({ movieImageId }) {
    const result = await this.movieImageRepository.restore({
      id: movieImageId,
    });
    return result.affected ? true : false;
  }
}
