import express from "express";
import { ProductController } from "./controllers/product.controller.js";

const app = express();

// 상품 API
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API
