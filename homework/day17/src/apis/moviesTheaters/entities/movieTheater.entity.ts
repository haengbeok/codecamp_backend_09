import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieTheater {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  location: string;

  @ManyToMany(() => Movie, (movies) => movies.movieTheaters)
  movies: Movie[];
}
