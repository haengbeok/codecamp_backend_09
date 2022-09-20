// import { ProductService } from "./services/product.sevice.js";
import { CashService } from "./services/cash.service.js";

export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }
  //상품 구매하기
  buyProduct = (req, res) => {
    // 1. 가진돈 검증하는 코드
    const moneyService = new CashService();
    const hasMoney = moneyService.checkValue();

    // 2. 판매여부 검증하는 코드
    // const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 3. 상품 구매하는 코드
    if (hasMoney && isSoldout) {
      res.send("상품을 구매합니다.");
    }
  };

  //상품 환불하기
  refundProduct = (req, res) => {
    // 1. 판매여부 검증하는 코드
    // const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send("상품을 환불합니다.");
    }
  };
}
