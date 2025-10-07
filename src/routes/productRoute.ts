import { Router } from 'express';
import { getAllProducts, getProductById, getProductsByMarketplace } from '../controllers/productController';

const router = Router();

router.post('/all', getAllProducts);
router.post('/single', getProductById);
router.post('/marketplace', getProductsByMarketplace);

export default router;