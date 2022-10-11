import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieImage } from './entities/movieImage.entity';

@Injectable()
export class MoviesImagesService {
  constructor(
    @InjectRepository(MovieImage)
    private readonly moviesImagesRepository: Repository<MovieImage>,
  ) {}

  create({ movieImageInput }) {
    const result = this.moviesImagesRepository.save({
      ...movieImageInput,
    });
    console.log(result);
    return result;
  }
}
