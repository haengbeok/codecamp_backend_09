import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  async upload({ files }) {
    console.log(files);
    // 파일을 클라우드 스토리지에 저장하는 로직

    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [file, file]

    // 스토리지 셋팅하기
    const bucket = 'haengbeok-storage';
    const storage = new Storage({
      projectId: 'sunny-strategy-364005',
      keyFilename: 'gcp-storage.json',
    }).bucket(bucket);

    // 셋팅된 스토리지에 파일 올리기
    const result = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    // // 다운로드URL 브라우저에 돌려주기
    return result;
  }
}
