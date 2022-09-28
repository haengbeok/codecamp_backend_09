import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class MovieGenre {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.movieGenres)
  @Field(() => [Movie])
  movie: Movie[];
}
