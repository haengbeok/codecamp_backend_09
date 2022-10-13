const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.generateThumbnail = async (event, context) => {
  // 1. event와 context의 데이터를 로그로 확인
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("event: ", event);
  console.log("context: ", context);
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

  // 2. 이미 썸네일이 있는 경우 종료( 썸네일로 트리거 된 경우)
  if (event.name.includes("thumb/")) return;

  // 3. 썸네일 프로세스
  const storage = new Storage().bucket(event.bucket);

  await Promise.all(
    // map으로 코드 정리해서 병렬 저장
    [
      { size: 320, filename: "thumb/s" },
      { size: 640, filename: "thumb/m" },
      { size: 1280, filename: "thumb/l" },
    ].map((el) => {
      new Promise((resolve, rejects) => {
        storage
          .file(event.name)
          .createReadStream() // 4. 기존 파일 읽어오고
          .pipe(sharp().resize({ width: el.size })) // 5. event 안에 있는 file을 활용하여 썸네일 생성
          // resize(320, 240) 이렇게 하면 크기가 고정돼서 이상함. {width: 320}은 비율이 자동으로 맞춰짐
          .pipe(storage.file(`${el.filename}/${event.name}`).createWriteStream()) // 6. 생성된 파일 재업로드
          .on("finish", () => resolve())
          .on("error", () => rejects());
      });
    })
  );
};
