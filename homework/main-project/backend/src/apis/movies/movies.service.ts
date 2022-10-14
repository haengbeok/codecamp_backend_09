import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieGenre } from '../moviesGenres/entities/movieGenre.entity';
import { MovieImage } from '../moviesImages/entities/movieImage.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>, //

    @InjectRepository(MovieGenre)
    private readonly movieGenreRepository: Repository<MovieGenre>,

    @InjectRepository(MovieImage)
    private readonly movieImageRepository: Repository<MovieImage>,
  ) {}

  async create({ createMovieInput }) {
    const { movieURL, movieGenres, ...movie } = createMovieInput;

    const temp = [];

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

    const imgTemp = [];

    for (let i = 0; i < movieURL.length; i++) {
      const url = movieURL[i];

      const prevURL = await this.movieImageRepository.findOne({
        where: { url: url },
      });

      if (prevURL) {
        // imgTemp.push(prevURL);
        throw new UnprocessableEntityException('이미 있는 이미지입니다.');
      } else {
        const newURL = await this.movieImageRepository.save({
          url: url,
          movie: {
            id: result.id,
          },
        });
        imgTemp.push(newURL);
      }
    }

    return result;
  }

  findOne({ movieId }) {
    return this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['movieGenres', 'movieTheaters'],
    });
  }
  async findAll({ search }) {
    return this.movieRepository.find({
      relations: ['movieGenres', 'movieTheaters'],
    });
  }

  async update({ movieId, updateMovieInput }) {
    const { movieURL } = updateMovieInput;
    const updateMovie = await this.movieRepository.findOne({
      where: { id: movieId },
    });

    console.log(movieURL);

    const imgTemp = [];

    for (let i = 0; i < movieURL.length; i++) {
      const url = movieURL[i];
      const prevURL = await this.movieImageRepository.findOne({
        where: { url: url },
      });

      if (prevURL) {
        imgTemp.push(prevURL);
      } else {
        const newURL = await this.movieImageRepository.save({
          url: url,
          movie: {
            id: movieId,
          },
        });
        imgTemp.push(newURL);
      }
    }

    const result = this.movieRepository.save({
      ...updateMovie,
      id: movieId,
      ...updateMovieInput,
      files: imgTemp,
    });

    return result;
  }

  async deleteImg({ movieId }) {
    const result = await this.movieImageRepository.delete({
      movie: {
        id: movieId,
      },
    });

    return result;
  }
}
