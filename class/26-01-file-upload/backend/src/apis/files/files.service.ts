import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  upload({ file }) {
    console.log(file);
    // 파일을 클라우드 스토리지에 저장하는 로직

    // 스토리지 셋팅하기
    const storage = new Storage({
      projectId: 'sunny-strategy-364005',
      keyFilename: 'gcp-storage.json',
    }).bucket('haengbeok-storage');

    // 셋팅된 스토리지에 파일 올리기
    file
      .createReadStream()
      .pipe(storage.file(file.filename).createWriteStream())
      .on('finish', () => console.log('성공'))
      .on('error', () => console.log('실패'));

    // 다운로드URL 브라우저에 돌려주기
    return file.filename;
  }
}
