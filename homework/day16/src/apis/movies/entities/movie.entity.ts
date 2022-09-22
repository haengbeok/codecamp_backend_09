import { MovieGenre } from 'src/apis/moviesGenres/entities/movieGenre.entity';
import { MovieTheater } from 'src/apis/moviesTheaters/entities/movieTheater.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  summary: string;

  @Column()
  is_ing: boolean;

  @Column()
  open: string;

  @JoinTable()
  @ManyToMany(() => MovieGenre, (movieGenres) => movieGenres.movies)
  movieGenres: MovieGenre[];

  @JoinTable()
  @ManyToMany(() => MovieTheater, (movieTheaters) => movieTheaters.movies)
  movieTheaters: MovieTheater[];
}
