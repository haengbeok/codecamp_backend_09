import { Field, ObjectType } from '@nestjs/graphql';
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
@ObjectType()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  summary: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isIng: boolean;

  @Column()
  @Field(() => String)
  open: string;

  @JoinTable()
  @ManyToMany(() => MovieGenre, (movieGenres) => movieGenres.movies)
  movieGenres: MovieGenre[];

  @JoinTable()
  @ManyToMany(() => MovieTheater, (movieTheaters) => movieTheaters.movies)
  movieTheaters: MovieTheater[];
}
