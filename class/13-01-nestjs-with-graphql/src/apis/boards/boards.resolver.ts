import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {
    //
  }

  @Query(() => String, { nullable: true })
  getHello(): string {
    return this.boardService.qqq();
  }
}
