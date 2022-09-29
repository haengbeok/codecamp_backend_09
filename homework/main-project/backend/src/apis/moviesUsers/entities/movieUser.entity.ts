import { Movie } from 'src/apis/movies/entities/movie.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  isPayment: string;

  @ManyToOne(() => Movie)
  movie: Movie;

  @ManyToOne(() => User)
  user: User;
}
