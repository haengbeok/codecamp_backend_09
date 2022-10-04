import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum MOVIE_USER_PAYMENT_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(MOVIE_USER_PAYMENT_STATUS_ENUM, {
  name: 'MOVIE_USER_PAYMENT_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class MovieUser {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'enum', enum: MOVIE_USER_PAYMENT_STATUS_ENUM })
  @Field(() => MOVIE_USER_PAYMENT_STATUS_ENUM)
  isPayment: string;

  @ManyToOne(() => Movie)
  @Field(() => Movie)
  movie: Movie;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;
}
