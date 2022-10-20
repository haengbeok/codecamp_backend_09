import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.Input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // @Query(() => String, { nullable: true })
  // getHello(): string {
  //   return this.boardService.qqq();
  // }

  @Query(() => String)
  async fetchBoards() {
    const myCache = await this.cacheManager.get('aaa');

    console.log(myCache);

    return '캐시에서 조회 완료';
    /////////////////////////////////////////////////////////
    // redis 연습을 위해서 잠시 주석
    // return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput,
  ) {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 0,
    });

    return '캐시에 등록 완료!!';
    /////////////////////////////////////////////////////////
    // redis 연습을 위해서 잠시 주석
    // return this.boardService.create({ createBoardInput });
  }
}
