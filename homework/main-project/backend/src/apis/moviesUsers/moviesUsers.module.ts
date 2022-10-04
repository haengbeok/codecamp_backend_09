import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { MovieUser } from './entities/movieUser.entity';
import { MoviesUsersResolver } from './moviesUsers.resolver';
import { MoviesUsersService } from './moviesUsers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieUser,
      User, //
    ]),
  ],
  providers: [
    MoviesUsersResolver, //
    MoviesUsersService,
  ],
})
export class MoviesUsersModule {}
