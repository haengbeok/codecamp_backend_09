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

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  summary: string;

  @Column()
  @Field(() => String)
  open: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isIng: boolean;

  @JoinTable()
  @ManyToMany(() => MovieGenre, (movieGenres) => movieGenres.movie)
  @Field(() => [MovieGenre])
  movieGenres: MovieGenre[];

  @JoinTable()
  @ManyToMany(() => MovieTheater, (MovieTheater) => MovieTheater.movie)
  movieTheaters: MovieTheater[];
}
