/**
 * @swagger
 * /user:
 *   post:
 *     summary: 회원 가입하기
 *     tags: [User]
 *     requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             name:
 *                                 type: string
 *                                 required: true
 *                                 example: 대일
 *                             email:
 *                                 type: string
 *                                 required: true
 *                                 example: aaa@aaa.com
 *                             personal:
 *                                 type: string
 *                                 required: true
 *                                 example: 211111-1111111
 *                             prefer:
 *                                 type: string
 *                                 required: true
 *                                 example: https://www.naver.com
 *                             pwd:
 *                                 type: string
 *                                 required: true
 *                                 example: 1111
 *                             phone:
 *                                 type: string
 *                                 required: true
 *                                 example: '01095058024'
 *     responses:
 *         '200':
 *                  description: user의 _id 리턴
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 63205233188844c06a5143bd
 *
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원 목록 조회
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    og:
 *                      type: object
 *                      example: { title: 네이버, description: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요", image: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_21285241…}
 *                    _id:
 *                      type: string
 *                      example: 63205233188844c06a5143bd
 *                    name:
 *                      type: string
 *                      example: 철수
 *                    email:
 *                      type: string
 *                      example: aaa@aaa.com
 *                    personal:
 *                      type: string
 *                      example: 911111-1111111
 *                    prefer:
 *                      type: string
 *                      example: https://www.naver.com
 *                    pwd:
 *                      type: string
 *                      example: 1111
 *                    phone:
 *                      type: string
 *                      example: '01012345678'
 */

/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 인증 요청
 *     tags: [Token]
 *     requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             myPhone:
 *                                 type: string
 *                                 required: true
 *                                 example: '01095058024'
 *     responses:
 *         '200':
 *                  description: 인증 문자 전송 안내
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 핸드폰으로 인증 문자가 전송되었습니다!
 *
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 토큰 인증 완료
 *     tags: [Token]
 *     requestBody:
 *              required: true
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             myToken:
 *                                 type: string
 *                                 required: true
 *                                 example: '292208'
 *     responses:
 *         '200':
 *                  description: 인증 완료 안내
 *                  content:
 *                       application/json:
 *                          schema:
 *                            type: string
 *                            example: 인증 완료!
 *
 */

/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 커피 목록 조회
 *     tags: [Starbucks]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    _id:
 *                      type: string
 *                      example: 632052aec36f6d695bc36d54
 *                    name:
 *                      type: string
 *                      example: 그린 애플 캐모마일 티
 *                    img:
 *                      type: string
 *                      example: https://image.istarbucks.co.kr/upload/store/skuimg/2022/08/[9200000004134]_20220819133555297.jpg
 */
