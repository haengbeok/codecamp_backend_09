import express from "express";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { ProductService } from "./mvc/controllers/services/product.sevice.js";

const app = express();

const productService = new ProductService();

//상품 API
const productController = new ProductController(productService);
app.post("/product/buy", productController.buyProduct); // 상품구매 API
app.post("/product/refund", productController.refundProduct); // 상품환불 API

//쿠폰 API
const couponController = new CouponController();
app.post("/coupon/buy", couponController.buyCoupon);

app.listen(3000);
