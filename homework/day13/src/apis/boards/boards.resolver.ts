import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateStarbucksInput } from './dto/createStarbucks.Input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board])
  fetchStarbucks() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createStarbucks(
    @Args({ name: 'createStarbucksInput', nullable: true })
    createStarbucksInput: CreateStarbucksInput,
  ) {
    return this.boardService.create({ createStarbucksInput });
  }
}
