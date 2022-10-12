import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    console.log(event); // event.entity.price, event.entity.isSoldout, ...
    // << 로그를 저장하는 방법 3가지 >>
    // 1. 여기서 발생한 로그를 서버 컴퓨터에 저장하기 => 시간별, 일자별 로그 로테이션
    // 2. DB에 로그테이블 만들고 저장하기
    // 3. 외부빅데이터(BigQuery) 관련 DB에 로그테이블 만들고 저장하기
    const bigQuery = new BigQuery({
      keyFilename: 'gcp-bigquery.json',
      projectId: 'sunny-strategy-364005',
    });

    bigQuery
      .dataset('mybigquery09')
      .table('productlog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);

    // ====================================================
    // 1. 트리거는 언제 사용하면 안될까?
    // 트랜잭션 연결된 중요한 내용들 ...

    // 2. 어떤 것들을 사용하면 좋을까?
    // 메인 로직에 큰 피해를 안끼치는 로직들...(통계 계산하기, 로그 쌓아놓기)
  }
}
