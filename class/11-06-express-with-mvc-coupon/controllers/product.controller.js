import { ProductService } from "./services/product.js";
import { CashService } from "./services/cash.js";

export class ProductController {
  buyProduct = (req, res) => {
    // 1. 가진 돈 검증하는 코드 (대략 10줄 => 2줄)
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();

    // 2. 판매여부 검증하는 코드 (대략 10줄 => 2줄)
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 3. 상품을 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매 완료!!");
    }
  };

  refundProduct = (req, res) => {
    // 1. 판매여부 검증하는 코드 (대략 10줄 => 2줄)
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send("상품 환불 완료");
    }
  };
}
