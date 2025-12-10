"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByMarketplace = exports.getProductById = exports.getAllProducts = void 0;
const productServices_1 = require("../services/productServices");
const getAllProducts = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        res.status(400).json({ error: 'Token is required' });
        return;
    }
    try {
        const productsData = await (0, productServices_1.fetchAllProducts)(token);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            totalCount: productsData['@odata.count'] || 0,
            data: productsData.value,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch products',
            details: error.response?.data || error.message
        });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    const { token, productId } = req.body;
    if (!token || !productId) {
        res.status(400).json({ error: 'Token and productId are required' });
        return;
    }
    try {
        const productData = await (0, productServices_1.fetchProductById)(token, productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            data: productData,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Error fetching product:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch product',
            details: error.response?.data || error.message
        });
    }
};
exports.getProductById = getProductById;
const getProductsByMarketplace = async (req, res) => {
    const { token, marketplaceType } = req.body;
    if (!token || !marketplaceType) {
        res.status(400).json({ error: 'Token and marketplaceType are required' });
        return;
    }
    try {
        const productsData = await (0, productServices_1.fetchProductsByMarketplace)(token, marketplaceType);
        res.status(200).json({
            success: true,
            message: `${marketplaceType} products fetched successfully`,
            totalCount: productsData['@odata.count'] || 0,
            data: productsData.value,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Error fetching marketplace products:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch marketplace products',
            details: error.response?.data || error.message
        });
    }
};
exports.getProductsByMarketplace = getProductsByMarketplace;
// export const getAccountById = async (req: Request<{}, {}, AccountRequestBody>, res: Response): Promise<void> => {
//   const { token, accountId } = req.body;
//   if (!token || !accountId) {
//     res.status(400).json({ error: 'Token and accountId are required' });
//     return;
//   }
//   try {
//     const accountData = await fetchAccountById(token, accountId);
//     res.status(200).json({
//       success: true,
//       message: 'Account fetched successfully',
//       data: accountData,
//       timestamp: new Date().toISOString()
//     });
//   } catch (error: any) {
//     console.error('Error fetching account:', error.response?.data || error.message);
//     res.status(error.response?.status || 500).json({
//       error: 'Failed to fetch account',
//       details: error.response?.data || error.message
//     });
//   }
// };
