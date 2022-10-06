import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { title } from 'process';
import { writer } from 'repl';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.Input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {
    //
  }

  // @Query(() => String, { nullable: true })
  // getHello(): string {
  //   return this.boardService.qqq();
  // }

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput,
  ) {
    return this.boardService.create({ createBoardInput });
  }
}
