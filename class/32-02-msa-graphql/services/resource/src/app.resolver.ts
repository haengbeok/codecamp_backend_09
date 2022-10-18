import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  fetchBoards() {
    return '데이터 보내기 성공!!';
  }
}
