import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // @Column()
  // @Field(() => String)
  // socialId: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column()
  @Field(() => String)
  personal: string;

  @Column({ default: '일반' })
  @Field(() => String)
  grade: string;

  @DeleteDateColumn()
  deleteAt: Date;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;
}
