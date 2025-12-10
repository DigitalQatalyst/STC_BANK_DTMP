"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router.post('/all', productController_1.getAllProducts);
router.post('/single', productController_1.getProductById);
router.post('/marketplace', productController_1.getProductsByMarketplace);
exports.default = router;
